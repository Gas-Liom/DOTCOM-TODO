import React, { useState } from "react";

const EditTodo = ({ todo, refreshTodos }) => {
  const [description, setDescription] = useState(todo?.description || "");
  const [isOpen, setIsOpen] = useState(false);

  const updateDescription = async () => {
    try {
      const body = { description };
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setIsOpen(false);
      refreshTodos(); // refresh parent list
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <button className="edit-btn" onClick={() => setIsOpen(true)}>Edit</button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Todo</h3>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
            />
            <div className="modal-actions">
              <button className="save-btn" onClick={updateDescription}>Save</button>
              <button className="cancel-btn" onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;
