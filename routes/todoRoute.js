const express = require('express');
const Todo = require('../models/todoModel.js');

const router = express.Router();

// Route for creating a todo
router.post('/', async (req, res) => {
  try {
    // Check if empty fields
    if (!req.body.title || !req.body.description || !req.body.stat) {
      return res.status(400).send({
        message: 'Fields are required!',
      });
    }

    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      stat: req.body.stat
    };

    const todo = await Todo.create(newTodo);
    return res.status(201).json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route to get all todos from the database
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({});
    return res.status(200).json({
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route to get a todo by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    return res.status(200).json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route for updating a todo by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = {
      title: req.body.title,
      description: req.body.description,
    };
    const todo = await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    return res.status(200).json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a todo by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndRemove(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
