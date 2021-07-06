import React from 'react'

const TaskList = ({ tasks, deleteTask, toggleCompletion }) => {
    return (
        <ul className="task-list">
            { tasks.map((task)=> (
            <li className={task.completion ? "task-item completed" : "task-item"} key={task._id}>
                <h2>{task.title}</h2>
                <p className="text-muted">{new Date(task.date).toString().slice(0,25)}</p>
                <button className="mr-2 btn btn-outline-primary" onClick={()=> toggleCompletion(task._id)}>{ task.completion ? <span>&#9971; Completed</span> : <span>&#9757; Complete</span> }</button>
                <button className="btn btn-outline-warning" onClick={()=> deleteTask(task._id)}><span>&#10060;</span> Delete</button>
            </li>
            ))}
        </ul>
    )
}

export default TaskList
