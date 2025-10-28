import React, { useEffect, useState } from 'react';
import EditTodo from './EditTodo.jsx';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
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
            <td><EditTodo todo={todo} /></td>
            <td>
              <button onClick={() => deleteTodo(todo.todo_id)} className="delete-btn">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
