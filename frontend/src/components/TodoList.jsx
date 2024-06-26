import React from 'react';

const TodoList = ({ todos, onSelectTodo, onDeleteTodo }) => {
    return (
        <div>
            {todos.map((todo) => (
                <div key={todo.id} className="flex justify-between items-center mb-2">
                    <div className="cursor-pointer" onClick={() => onSelectTodo(todo)}>
                        {todo.title}
                    </div>
                    <button 
                        onClick={() => onDeleteTodo(todo.id)} 
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
