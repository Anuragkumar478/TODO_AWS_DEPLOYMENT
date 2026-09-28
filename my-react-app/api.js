import axios from "axios";

const fetchTodos = async () => {
    const response = await axios.get('http://localhost:3000/api/todos');
    setTodos(response.data);
  };

  const addTodo = async (text) => {
    const response = await axios.post('http://localhost:3000/api/todos', { text });
    setTodos([...todos, response.data]);
  };

  const updateTodo = async (id, updatedTodo) => {
    const response = await axios.put(`http://localhost:3000/api/todos/${id}`, updatedTodo);
    setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };