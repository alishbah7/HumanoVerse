import os
import uuid
from pathlib import Path
import markdown
from tqdm import tqdm
from google import genai
from qdrant_client import QdrantClient
from qdrant_client.http import models

# ------------------------------
# Configuration (Use Environment Variables!)
# ------------------------------
# Set these in your terminal:
# $env:QDRANT_URL="your_url_here"
# $env:QDRANT_API_KEY="your_key_here"
# $env:GEMINI_API_KEY="your_key_here"

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

collection_name = "book_content"

# ------------------------------
# Qdrant Setup
# ------------------------------
client_qdrant = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY
)
client_qdrant.delete_collection(collection_name) # Add this
if not client_qdrant.collection_exists(collection_name):
    client_qdrant.create_collection(
        collection_name=collection_name,
        vectors_config=models.VectorParams(size=768, distance=models.Distance.COSINE)
    )
    # NOTE: Gemini embedding-001 is usually 768 dimensions. 
    # If using text-embedding-004 it might be different. 
    # Ensure this size matches the model output.

# ------------------------------
# Gemini Setup
# ------------------------------
client_gemini = genai.Client(api_key=GEMINI_API_KEY)

def get_embedding(text: str):
    """
    Generate embedding vector using Gemini.
    """
    response = client_gemini.models.embed_content(
        model="text-embedding-004", # Recommendation: use the newer text-embedding-004
        contents=text
    )
    # FIX 1: Use .values instead of .value
    return response.embeddings[0].values

# ------------------------------
# Load Book Content
# ------------------------------
def load_book_content(base_path='docs'):
    docs = []
    base_path = Path(base_path)
    # Ensure base_path exists
    if not base_path.exists():
        print(f"Directory '{base_path}' not found.")
        return []

    for subfolder in base_path.iterdir():
        if subfolder.is_dir():
            for file in subfolder.glob('*.md'):
                with open(file, 'r', encoding='utf-8') as f:
                    text = f.read()
                    # Convert Markdown to plain text
                    html_text = markdown.markdown(text)
                    # Simple stripping (BeautifulSoup is better, but this works for now)
                    plain_text = ''.join(html_text.splitlines())
                    docs.append({
                        "title": file.stem,
                        "content": plain_text
                    })
    return docs

book_docs = load_book_content()
print(f"Loaded {len(book_docs)} documents")

# ------------------------------
# Upload to Qdrant
# ------------------------------
for doc in tqdm(book_docs, desc="Uploading documents"):
    try:
        embedding = get_embedding(doc['content'])
        
        # FIX 2: Qdrant IDs must be Int or UUID. 
        # We generate a deterministic UUID based on the title.
        doc_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, doc['title']))

        client_qdrant.upsert(
            collection_name=collection_name,
            points=[
                models.PointStruct(
                    id=doc_id, 
                    vector=embedding,
                    payload={
                        "title": doc['title'], # Store title in payload so you can retrieve it
                        "text": doc['content']
                    }
                )
            ]
        )
    except Exception as e:
        print(f"Error processing {doc['title']}: {e}")

print("All documents successfully uploaded to Qdrant!")