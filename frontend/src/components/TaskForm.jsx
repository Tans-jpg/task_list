import React, { useState } from 'react';

const TaskForm = () => {
    const [taskData, setTaskData] = useState({
        title: '',
        dueDate: '',
        priority: 'Medium', // Default value
        status: 'To Do' // Default value
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Verify all required fields are not empty
        if (!taskData.title || !taskData.dueDate) {
            alert("Title and Due Date are required!");
            return;
        }

        // Send data to backend
        fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Optionally reset the form or update the UI
            setTaskData({
                title: '',
                dueDate: '',
                priority: 'Medium',
                status: 'To Do'
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={taskData.title}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                required
            />
            <select name="priority" value={taskData.priority} onChange={handleChange}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <select name="status" value={taskData.status} onChange={handleChange}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;