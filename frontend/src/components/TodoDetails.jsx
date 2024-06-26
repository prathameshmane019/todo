import React, { useState } from 'react';

const TodoDetails = ({ todo, onDeleteTask, onEditTask, onEditTitle }) => {
    const [newTask, setNewTask] = useState('');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);

    const handleAddTask = () => {
        if (newTask.trim()) {
            onEditTask(todo.tasks.length, newTask);
            setNewTask('');
        }
    };

    const handleEditTitle = () => {
        onEditTitle(editedTitle);
        setIsEditingTitle(false);
    };

    return (
        <div>
            {isEditingTitle ? (
                <div className="mb-4">
                    <input 
                        type="text" 
                        value={editedTitle} 
                        onChange={(e) => setEditedTitle(e.target.value)} 
                        className="border p-2 w-full"
                    />
                    <button onClick={handleEditTitle} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Save</button>
                </div>
            ) : (
                <h2 className="text-2xl font-bold mb-4 cursor-pointer" onClick={() => setIsEditingTitle(true)}>{todo.title}</h2>
            )}
            <div className="mb-4">
                {todo.tasks.map((task, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                        <span>{task}</span>
                        <div>
                            <button 
                                onClick={() => onDeleteTask(index)} 
                                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                            >
                                Delete
                            </button>
                            <button 
                                onClick={() => onEditTask(index, prompt('Edit task:', task) || task)} 
                                className="bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-200">
                <input 
                    type="text" 
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)} 
                    className="border p-2 w-4/5"
                />
                <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">Add Task</button>
            </div>
        </div>
    );
};

export default TodoDetails;
