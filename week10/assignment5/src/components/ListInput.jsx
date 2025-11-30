// src/components/ListInput.jsx

/**
 * ListInput Component
 *
 * Renders a small form used to create a new task list.
 *
 * Props:
 * - newListName (string): the controlled input value for the list name
 * - setNewListName (function): updates the input field as the user types
 * - onAddList (function): called when the form is submitted to create a new list
 */
function ListInput({ newListName, setNewListName, onAddList }) {
  // Handle the form submission for adding a list
  function handleSubmit(e) {
    e.preventDefault();

    // Don't allow empty list names
    if (!newListName.trim()) return;

    onAddList(newListName.trim());
    setNewListName("");
  }

  return (
    <form className="list-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New list name..."
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
      />

      <button type="submit">Add List</button>
    </form>
  );
}

export default ListInput;
