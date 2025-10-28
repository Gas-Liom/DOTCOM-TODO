const express = require('express');
const cors = require('cors');
const pool = require('./db.js'); // we'll create this next

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES

// GET all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo ORDER BY todo_id ASC');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// GET a single todo
app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// CREATE a todo
app.post('/todos', async (req, res) => {
  const { description } = req.body;
  try {
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// UPDATE a todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]);
    res.json({ message: 'Todo updated successfully' });
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error(err.message);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
