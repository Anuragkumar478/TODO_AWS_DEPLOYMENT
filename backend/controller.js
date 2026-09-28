const Todo = require("./model");

exports.createTodo = async (req, res) => {
  const todo = req.body;

  try {
    const newTodo = new Todo(todo);

    await newTodo.save();

    res.status(201).json({
      message: "Todo created successfully",
      todo: newTodo
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).send("Todo not found");
    }

    res.status(200).json({
      message: "Todo deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};