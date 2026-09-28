const express = require('express');
const router = express.Router();
const todoController = require('./controller');


// Routes
router.post('/', todoController.createTodo);
router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.patch('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;