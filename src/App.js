import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

function App() {
  const [ showForm, setShowForm ] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Toggle Add Task Form function
  const toggleForm = () => {
    setShowForm(!showForm)
  }

  // useEffect fetching when the page loads 
  useEffect(()=> {
    const getTasks =  async () => {
      const tasksFetched = await fetchTasks()
      setTasks(tasksFetched) 
    }
    getTasks();
  }, [])

  // Fetch All Tasks
  const fetchTasks = async () => {
    const res = await fetch('https://test-node-mongodb-express.herokuapp.com/tasks')
    const data = await res.json()
    return data;
  }

  // Fetch a single task
  const fetchTaskById = async (id) => {
    const res = await fetch(`https://test-node-mongodb-express.herokuapp.com/tasks/${id}`)
    const data = await res.json()
    return data;
  }

  // Add a new task
  const addTask = async (newTask) => {
    const res = await fetch(`https://test-node-mongodb-express.herokuapp.com/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newTask)
    })
    const addedTask = await res.json()
    setTasks([...tasks, addedTask]);
  }

  // Delete a task
  const deleteTask = async (id) => {
    await fetch(`https://test-node-mongodb-express.herokuapp.com/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task)=> task._id !== id))
  }

  // Toggle Completion
  const toggleCompletion = async(id) => {
    const taskFetched = await fetchTaskById(id);
    const updatedCompletion = { completion: !taskFetched.completion }
    const res = await fetch(`https://test-node-mongodb-express.herokuapp.com/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(updatedCompletion)
    })
    const data = await res.json()
    // Resetting state
    setTasks(tasks.map((task)=> task._id === id ? { ...task, completion: data.completion} : task ))
  }


  return (
    <div className="container">
      <Header toggleForm={toggleForm} showForm={showForm}/>
      { showForm && <AddTask addTask={addTask}/> }
      { tasks.length > 0 ? <TaskList tasks={tasks} deleteTask={deleteTask} toggleCompletion={toggleCompletion} /> : <i>No Tasks Yet</i>}
    </div>
  );
}

export default App;
