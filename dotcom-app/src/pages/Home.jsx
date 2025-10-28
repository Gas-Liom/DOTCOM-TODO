import React, { useState, useEffect } from "react";
import EditTodo from "../components/EditTodo.jsx";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState("");

  // Fetch all todos
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    // Optionally auto-load todos on page load
    // getTodos();
  }, []);

  // Add a new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setDescription("");
    } catch (err) {
      console.error(err.message);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={addTodo} className="input-form">
        <input
          type="text"
          value={description}
          placeholder="Add a todo..."
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="add-btn">Add</button>
      </form>

      {/* Load Todos Button */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <button
          onClick={getTodos}
          className="add-btn"
          style={{ backgroundColor: "#2196F3" }}
        >
          Load Todos
        </button>
      </div>

      <table className="todo-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} refreshTodos={getTodos} />
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
