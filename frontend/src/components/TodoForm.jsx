import React, { useState } from 'react';

const TodoForm = ({ onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState(['']);

    const handleSave = () => {
        if (title.trim()) {
            onSave({ title, tasks });
        }
    };

    const handleTaskChange = (index, value) => {
        const updatedTasks = tasks.map((task, i) => i === index ? value : task);
        setTasks(updatedTasks);
    };

    const handleAddTaskField = () => {
        setTasks([...tasks, '']);
    };

    return (
        <div>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="border p-2 w-full mb-4" 
                placeholder="Todo title"
            />
            {tasks.map((task, index) => (
                <input 
                    key={index} 
                    type="text" 
                    value={task} 
                    onChange={(e) => handleTaskChange(index, e.target.value)} 
                    className="border p-2 w-full mb-2" 
                    placeholder="Task"
                />
            ))}
            <button onClick={handleAddTaskField} className="bg-gray-300 px-4 py-2 rounded mb-4">Add Task Field</button>
            <div>
                <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
                <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            </div>
        </div>
    );
};

export default TodoForm;
