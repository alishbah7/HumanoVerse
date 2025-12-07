---
id: 1
title: Create Project Constitution
stage: constitution
date: 2025-12-07
surface: agent
model: gemini
feature: none
branch: main
user: unknown
command: /sp.constitution
labels: [constitution, project-setup]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/plan-template.md
tests:
 - none
---

## Prompt

/sp.constitution PROJECT NAME: Physical AI & Humanoid Robotics Textbook. A Docusaurus-based online textbook for teaching "Physical AI & Humanoid Robotics". The textbook should integrate AI-driven content generation using context7, include 4 main modules, and support user personalization and translation features. The course focuses on embodied intelligence, ROS 2, Gazebo, Unity, NVIDIA Isaac Sim, and Vision-Language-Action. Three objectives are necessary Generate a structured book with 4 modules, each containing 4-6 chapters. 2. Provide practical exercises, examples, and diagrams where applicable. 3. Include interactive features for users to personalize content based on their background and translate content to Urdu. The UI of the book should be like the images that have been give in UI folder, the hero section should look like this F:\physical-ai-humanoid-robotics\UI\hero.png, the modules of chapter section on home page should look like this UI\modules.png, the footer should look like this UI\footer.png, while the images used in those images of ui will be pasted in docusaurus static's folder's subfolder of img. There the button on hero section must contain text of start reading by which clicking user will be redirected to book's page where modules along with its chapters will be shown. The theme of whole book should be like those image, black & green Generate the constitution file. Include metadata: project name, course focus,

## Response snapshot

I have created the project constitution file at `.specify/memory/constitution.md` and updated the `.specify/templates/plan-template.md` to align with the new constitution.

## Outcome

- ✅ Impact: The project constitution was created, establishing the core principles for the project. The plan template was updated to reflect these principles.
- 🧪 Tests: none
- 📁 Files: 2 files modified
- 🔁 Next prompts: /sp.specify
- 🧠 Reflection: The constitution provides a solid foundation for the project's development.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
