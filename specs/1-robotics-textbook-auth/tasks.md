# Tasks: Physical AI & Humanoid Robotics Textbook

**Input**: Design documents from `/specs/1-robotics-textbook-auth/`
**Prerequisites**: plan.md, spec.md

## Phase 1: Core Setup & Content Structure

**Purpose**: Initialize the project and create the basic structure for the textbook.

- [x] T001 Initialize a new Docusaurus project with the TypeScript template in the `frontend/` directory.
- [x] T002 [P] Create the directory structure for 4 modules under `frontend/docs/`.
- [x] T003 [P] Create placeholder Markdown files for 4-6 chapters in each module directory.
- [x] T004 Configure `frontend/sidebars.js` to create a navigation menu for all modules and chapters.
- [x] T005 [P] Implement the hero section UI from `UI/hero.png` as a React component in `frontend/src/components/`.
- [x] T006 [P] Implement the modules section UI from `UI/modules.png` on the homepage.
- [x] T007 [P] Implement the footer UI from `UI/footer.png` in the Docusaurus theme.
- [x] T008 [P] Copy all image assets from the `UI/` folder to `frontend/static/img/`.
- [x] T009 Initialize a new Node.js project with Express in the `backend/` directory.


---

## Phase 2: Content - Module 1 (ROS 2 Basics)

**Purpose**: Generate the content for the first module.

- [x] T011 [US1] Write the chapter content for "ROS 2 Basics" in `frontend/docs/module-1/ros-basics.md`.
- [x] T012 [P] [US1] Create diagrams for ROS 2 concepts (nodes, topics, services) and add them to the chapter.
- [x] T013 [P] [US1] Add URDF examples with code snippets to the relevant chapters.

---

## Phase 3: Content - Module 2 (Simulation)

**Purpose**: Generate the content for the second module.

- [x] T014 [US1] Write the chapter content for "Gazebo Physics" and "Unity Environment" in `frontend/docs/module-2/`.
- [x] T015 [P] [US1] Create practical exercises for simulating sensors in Gazebo and Unity.

---

## Phase 4: Content - Module 3 (NVIDIA Isaac)

**Purpose**: Generate the content for the third module.

- [x] T016 [US1] Write the chapter content for "NVIDIA Isaac Sim" and "Nav2 Path Planning" in `frontend/docs/module-3/`.
- [x] T017 [P] [US1] Add examples of autonomous navigation using Isaac ROS.

---

## Phase 5: Content - Module 4 (Advanced Topics)

**Purpose**: Generate the content for the fourth module.

- [x] T018 [US1] Write the chapter content for "Voice-to-Action" and "Cognitive Planning" in `frontend/docs/module-4/`.
- [x] T019 [P] [US1] Design and write the capstone project description, integrating concepts from all modules.

---

## Phase 6: Interactive Features

**Purpose**: Implement the interactive features for the textbook.

- [x] T020 [US2] Integrate "Better Auth" for user signup, login, and logout in the backend.
- [x] T021 [P] [US2] Create API endpoints in the backend for user registration and login.
- [x] T022 [P] [US2] Implement frontend components for signup and login forms.
- [x] T023 [US3] Implement backend logic to retrieve and serve personalized explanations based on a user's background.
- [x] T024 [P] [US3] Create the "Personalize Explanation" React component in `frontend/src/components/`.
- [x] T025 [US4] Integrate with a translation API (e.g., Google Translate) in the backend.
- [x] T026 [P] [US4] Create the "Translate to Urdu" React component in `frontend/src/components/`.
- [x] T027 [P] [US4] Implement the frontend logic to fetch and display translated content.

---

## Phase 7: Quality Assurance

**Purpose**: Ensure the quality and functionality of the textbook.

- [x] T028 [P] Review all chapters for broken links and missing images.
- [x] T029 [P] Verify that all code snippets are correctly formatted and have syntax highlighting.
- [x] T030 Test the user authentication flow (signup, login, logout).
- [x] T031 Test the content personalization feature for different user backgrounds.
- [x] T032 Test the content translation feature.
- [x] T033 [P] Review the entire site to ensure the UI matches the mockups in the `UI/` folder.
