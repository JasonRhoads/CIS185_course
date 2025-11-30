// src/components/ListInput.jsx
function ListInput({ newListName, setNewListName, onAddList }) {
  function handleSubmit(e) {
    e.preventDefault();
    onAddList(newListName);
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
