import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editTaskName, setEditTaskName] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:8080/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    const response = await axios.post('http://localhost:8080/todos', { title: newTodoTitle, tasks: [] });
    setTodos([...todos, response.data]);
    setNewTodoTitle('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8080/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodoTitle = async (id, title) => {
    const response = await axios.put(`http://localhost:8080/todos/${id}`, { title });
    setTodos(todos.map(todo => todo.id === id ? response.data : todo));
  };

  const addTask = async () => {
    const todo = todos.find(todo => todo.id === currentTodoId);
    const updatedTasks = [...todo.tasks, newTaskName];
    const response = await axios.put(`http://localhost:8080/todos/${currentTodoId}`, { ...todo, tasks: updatedTasks });
    setTodos(todos.map(t => t.id === currentTodoId ? response.data : t));
    setNewTaskName('');
  };

  const deleteTask = async (todoId, taskName) => {
    const todo = todos.find(todo => todo.id === todoId);
    const updatedTasks = todo.tasks.filter(task => task !== taskName);
    const response = await axios.put(`http://localhost:8080/todos/${todoId}`, { ...todo, tasks: updatedTasks });
    setTodos(todos.map(t => t.id === todoId ? response.data : t));
  };

  const editTask = async (todoId, taskName, newTaskName) => {
    const todo = todos.find(todo => todo.id === todoId);
    const updatedTasks = todo.tasks.map(task => task === taskName ? newTaskName : task);
    const response = await axios.put(`http://localhost:8080/todos/${todoId}`, { ...todo, tasks: updatedTasks });
    setTodos(todos.map(t => t.id === todoId ? response.data : t));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-1/4 bg-white p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">Todo List</h2>
        <ul>
          {todos.map(todo => (
            <li key={todo.id} className="mb-2 flex justify-between items-center">
              <div>
                {currentTodoId === todo.id ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={() => {
                      updateTodoTitle(todo.id, editTitle);
                      setCurrentTodoId(null);
                    }}
                    className="border rounded p-1"
                  />
                ) : (
                  <span onClick={() => { setCurrentTodoId(todo.id); setEditTitle(todo.title); }}>
                    {todo.title}
                  </span>
                )}
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="text-red-500 ml-2">Delete</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="New Todo"
          className="border rounded p-2 w-full mt-4"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white rounded p-2 mt-2 w-full">Add Todo</button>
      </div>
      <div className="w-3/4 bg-white p-4 shadow-md flex flex-col">
        <h2 className="text-xl font-bold mb-4">{todos.find(todo => todo.id === currentTodoId)?.title || 'Select a Todo'}</h2>
        <ul>
          {todos.find(todo => todo.id === currentTodoId)?.tasks.map(task => (
            <li key={task} className="mb-2 flex justify-between items-center">
              <div>
                {editTaskName === task ? (
                  <input
                    type="text"
                    value={editTaskName}
                    onChange={(e) => setEditTaskName(e.target.value)}
                    onBlur={() => {
                      editTask(currentTodoId, task, editTaskName);
                      setEditTaskName('');
                    }}
                    className="border rounded p-1"
                  />
                ) : (
                  <span onClick={() => setEditTaskName(task)}>
                    {task}
                  </span>
                )}
              </div>
              <button onClick={() => deleteTask(currentTodoId, task)} className="text-red-500 ml-2">Delete</button>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="New Task"
            className="border rounded p-2 w-full"
          />
          <button onClick={addTask} className="bg-blue-500 text-white rounded p-2 mt-2 w-full">Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default App;
