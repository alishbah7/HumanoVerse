import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from groq import Groq
from google import genai
from qdrant_client import QdrantClient
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

# --- Configuration ---
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") # Required for embedding the query

COLLECTION_NAME = "book_content"

app = FastAPI(title="Book RAG Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows your Chatbot.tsx to talk to this API
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Clients ---
client_qdrant = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
client_groq = Groq(api_key=GROQ_API_KEY)
client_gemini = genai.Client(api_key=GEMINI_API_KEY)

class QueryRequest(BaseModel):
    question: str

def get_embedding(text: str):
    """Must match the logic used during ingestion!"""
    response = client_gemini.models.embed_content(
        model="text-embedding-004",
        contents=text
    )
    return response.embeddings[0].values

def retrieve_context(query: str, top_k: int = 3):
    query_vector = get_embedding(query)
    
    # Using the standard search method
    search_result = client_qdrant.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=top_k
    )
    
    # If .search still fails, it means your client_qdrant 
    # isn't the object you think it is. 
    return "\n\n".join([hit.payload["text"] for hit in search_result if hit.payload])
    
    # Extract text from the payloads
    # context_chunks = [hit.payload["text"] for hit in search_result]
    # return "\n\n".join(context_chunks)

@app.post("/chat")
async def chat(request: QueryRequest):
    # 1. Get context from Qdrant
    context = retrieve_context(request.question)
    
    if not context:
        return {"answer": "I'm sorry, I couldn't find any information about that in the book."}

    # 2. Build the system prompt (The "Agent" logic)
    system_prompt = f"""
    You are a helpful AI assistant specialized in answering questions about a specific book.
    Use the provided CONTEXT to answer the USER QUESTION. 
    If the answer is not in the context, politely state that you only have information regarding the book content.
    
    CONTEXT:
    {context}
    """

    # 3. Generate answer using Groq
    try:
        chat_completion = client_groq.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.question},
            ],
            model="llama-3.3-70b-versatile", # Or your preferred Groq model
        )
        return {"answer": chat_completion.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    import os
    # Get the port from the environment variable Railway provides
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=8000)