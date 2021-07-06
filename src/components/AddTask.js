import React, { useState } from 'react'

const AddTask = ({ addTask }) => {
    const [ task, setTask ] = useState('');
    const [ date, setDate ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task) {
            alert('Please give a task title')
            return
        }
        addTask({ title: task, date: new Date(date).toISOString() })
        setTask('')
    }
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <div className="">
                <label>Task</label>
                <input type="text" placeholder="Add Task" value={task} onChange={(e)=>setTask(e.target.value)}/>
            </div>
            <div className="">
                <label>Date</label>
                <input type="datetime-local" value={date} onChange={(e)=>setDate(e.target.value)}/>
            </div>
            <div className="">
                <button type="submit" className="btn btn-dark my-2 btn-block">Add Task</button>
            </div>
        </form>
    )
}

export default AddTask
