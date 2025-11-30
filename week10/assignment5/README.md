# Project Name: Task Manager App
## CIS 185 — Assignment 5
## Author: Jason Rhoads
## Date: 11/30/2025

---

## 1. Project Description
The Task Manager App is a React-based productivity tool that lets users create, organize, and manage tasks across multiple customizable lists.  
Users can:

- Add tasks  
- Mark tasks complete  
- Delete tasks  
- Reorder tasks using drag-and-drop  
- Filter tasks by status  
- Create and rename lists  
- Switch between light and dark mode  

All tasks and lists are automatically saved using `localStorage`, making the app fully persistent across refreshes.

This project demonstrates component architecture, hooks, state management, custom hooks, drag-and-drop logic, and persistent data storage.

---

## 2. Target Audience
This app is ideal for anyone who needs a lightweight, customizable organizational tool:

- Students  
- Professionals  
- Anyone managing daily to-dos  
- Users who prefer multiple lists (e.g., General, Work, School, etc.)  

The interface works well on different screen sizes and supports theme switching for accessibility and comfort.

---

## 3. Main Features

### ✅ Task Management
- Add new tasks  
- Toggle completed/uncompleted  
- Delete tasks  
- Drag-and-drop reordering within a list  
- Tasks show created-at timestamps  

### ✅ List Management
- Default “General” list (cannot be deleted)  
- Additional lists can be created  
- Lists can be renamed  
- Deleting a list also removes its tasks  

### ✅ Filtering & Counts
- Filters: **All**, **Active**, **Completed**  
- Dynamic counters adjust based on filter  

### ✅ Persistent Storage
- Tasks saved to `localStorage`  
- Lists saved to `localStorage`  
- Created dates restored as real `Date` objects  

### ✅ UI / UX Features
- Light/Dark mode toggle  
- Responsive layout  
- Clean panel-based design  
- Drag handle for intuitive reordering  

---

## 4. Technologies Used
- **React (Vite)** — component architecture & state management  
- **JavaScript (ES6+)** — functional logic  
- **CSS3** — layout, responsiveness, theming  
- **localStorage API** — data persistence  
- **React Hooks**  
  - `useState`, `useEffect`  
  - Custom hooks (`useTaskStorage`, `useListStorage`)  

---

## 5. File Structure

    src/
    │ App.jsx                # Main application container
    │ App.css                # Main styling and theme system
    │ main.jsx               # React entry point
    │ index.css              # Global CSS/reset + theme variables
    │
    ├── components/
    │   │ Header.jsx         # App title + theme toggle
    │   │ Footer.jsx         # Footer text
    │   │ TaskInput.jsx      # Add-task form
    │   │ TaskList.jsx       # List of TaskItem components
    │   │ TaskItem.jsx       # Individual task row w/ drag-and-drop
    │   │ FilterButtons.jsx  # All / Active / Completed buttons
    │   │ TaskCount.jsx      # Dynamic task counts
    │   │ ListInput.jsx      # Create new lists
    │   │ ListContainer.jsx  # Renders all lists + tasks in each list
    │
    └── hooks/
        │ useTaskStorage.js  # LocalStorage persistence for tasks
        │ useListStorage.js  # LocalStorage persistence for lists

Other important files:

- `vite.config.js` — Vite configuration  
- `package.json` — project metadata and dependencies  

---

## 6. Challenges Faced
- **Vite and Node Compatibility:**  
  Early issues were caused by using an outdated Node version; upgrading resolved the errors.

- **State Management Across Multiple Components:**  
  Managing tasks, lists, and filters required lifting state up and passing callbacks between components.

- **Drag-and-Drop Logic:**  
  Implementing intuitive drag-to-reorder required handling multiple drag states, hover states, and edge cases.

- **Styling & Theming:**  
  CSS provided by AI needed refinement to match the intended layout and appearance, especially when adding dark mode.

- **LocalStorage Parsing:**  
  Since JSON cannot store Date objects, created-at timestamps had to be reconstructed when loading tasks.

Overall, the project strengthened understanding of hooks, custom hooks, state lifting, and how React rerenders component trees.

---

## 7. AI Tools Used
ChatGPT assisted with:

- Building component architecture  
- Designing drag-and-drop logic  
- Creating custom hooks for localStorage  
- Debugging Vite/Node setup issues  
- Suggesting styling and layout improvements  
- Helping structure theme switching  
- Improving readability, organization, and documentation  
- Writing this README  

---

## 8. Future Improvements
- Drag tasks *between* lists (Kanban-style)  
- Inline renaming of tasks  
- Editable descriptions or notes on tasks  
- Sorting options (alphabetical, oldest/newest)  
- A “Clear Completed Tasks” button  
- Search bar for filtering by keyword  
- Custom list colors or icons  
- Better mobile drag-and-drop support  

---

## 9. Credits
- **[React Documentation](https://react.dev/)**  
- **[MDN Web Docs](https://developer.mozilla.org/)** (JavaScript, localStorage, drag events)  
- **[Vite Documentation](https://vitejs.dev/)**  
- **ChatGPT** — debugging, component planning, code refactoring, and UI guidance  