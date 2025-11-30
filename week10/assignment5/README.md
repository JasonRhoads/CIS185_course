# Project Name: Task Manager App
## CIS 185 - Assignment 5
## Author: Jason Rhoads
## Date: 11/30/2025

---

## 1. Project Description
The Task Manager App is a simple React application that allows users to create and organize their tasks.
Users can add new tasks, mark tasks as completed, delete tasks, and filter their task list by status.
All tasks are saved automatically using localStorage so progress stays intact across page reloads.

This project demonstrates component-based design, React hooks, state management, and data persistence.

---

## 2. Target Audience
This app is intended for anyone who needs a lightweight task tracker — students, professionals, or anyone working through a checklist.
The UI is clean and responsive, making it easy to use on desktops or smaller screens.

---

## 3. Main Features
- **Add Tasks:** Input field allows users to create new tasks.
- **Toggle Completion:** Checkbox toggles the completed state of any task.
- **Delete Tasks:** Remove individual tasks using a delete button.
- **Filtering:** Switch between All, Active, and Completed task views.
- **Task Count:** Displays total active and completed tasks depending on filter.
- **Persistent Storage:** Tasks automatically save to `localStorage` and reload on startup.
- **Component Architecture:** Organized into TaskInput, TaskList, TaskItem, FilterButtons, TaskCount, Header, Footer, and App.

---

## 4. Technologies Used
- **React (Vite)** – Component architecture, state management, hooks
- **JavaScript (ES6+)** – Logic and interaction
- **CSS3** – Layout, styling, responsiveness
- **localStorage API** – Data persistence

---

## 5. File Structure
- `src/` – React source files
  - `App.jsx` – Main application container
  - `main.jsx` – React entry point
  - `App.css` – Main stylesheet
  - `components/` – All app components
    - `Header.jsx` – Application header
    - `Footer.jsx` – Application footer
    - `TaskInput.jsx` – Input field for adding tasks
    - `TaskList.jsx` – Renders list of tasks
    - `TaskItem.jsx` – Individual task component
    - `FilterButtons.jsx` – Buttons for task filtering
    - `TaskCount.jsx` – Shows counts of tasks
  - `hooks/` – Custom hooks
    - `useTaskStorage.js` – Handles loading/saving tasks to localStorage
- `index.css` – Global reset and base styling
- `vite.config.js` – Vite configuration
- `package.json` – Project metadata and dependencies

---

## 6. Challenges Faced
This assignment required using multiple React components and managing shared state between them.
At first, keeping track of task updates across components felt tricky, but breaking the app into smaller, focused components made the flow much clearer.

Another challenge was configuring Vite and Node correctly — early errors came from outdated Node versions.
I also created a custom React hook (`useTaskStorage`) to clean up the App component and centralize all localStorage logic.
As with previous projects, some styling provided by AI needed adjustment to fit my intended design, so I refined the CSS to create a clean, consistent layout.

---

## 7. AI Tools Used
ChatGPT:
- Helped structure and build React components
- Created the custom hook for localStorage persistence
- Debugged issues with Vite and Node compatibility
- Assisted with filtering logic and state updates
- Provided ideas and guidance for CSS layout and styling
- Helped refactor code for better organization and readability
- Assisted in writing this README

---

## 8. Future Improvements
- Add drag-and-drop functionality for task ordering
- Add multiple task lists (Kanban boards)
- Add task editing (rename tasks inline)
- Add “Clear Completed” button
- Add sort options (newest, oldest, alphabetical)
- Add timestamps (“created X minutes ago”)

---

## 9. Credits
- React documentation
- MDN Web Docs for JavaScript and localStorage
- ChatGPT for debugging, coding assistance, and UI suggestions
