import React, { useState } from 'react';

const InputTodo = () => {
  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setDescription('');
      window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={onSubmitForm} className="input-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="add-btn">Add</button>
    </form>
  );
};

export default InputTodo;
