import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import axios from "axios";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => task.current,
  Completed: (task) => !task.current,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8082/activities').then((tasksData) => setTasks(tasksData.data));
  }, []);
  const [filter, setFilter] = useState("All");
  
  function addTask(newDescription) {
	const newTask = { description: newDescription, current: true };
	axios.post('http://localhost:8082/activities',newTask);
	setTasks([...tasks, newTask]);
  }
  
  function editTask(id, newDescription, newCurrent) {
	const editedTaskList = tasks.map((task) => {
		if (id === task.id) {
			axios.put('http://localhost:8082/activities/' + id,{description: newDescription, current: newCurrent});
			return { ...task, description: newDescription, current: newCurrent };
		}
		return task;
	});
	setTasks(editedTaskList);
  }

  function deleteTask(id) {
	const remainingTasks = tasks.filter((task) => id !== task.id);
	axios.delete('http://localhost:8082/activities/' + id);
	setTasks(remainingTasks);
  }

  function toggleTaskCompleted(id) {
	const updatedTasks = tasks.map((task) => {
		if (id === task.id) {
		return { ...task, completed: !task.completed };
		}
		return task;
	});
	setTasks(updatedTasks);
  }
  
  const taskList = tasks
	.filter(FILTER_MAP[filter])
	.map((task) => (
		<Todo id={task.id} description={task.description} current={task.current} key={task.id} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} editTask={editTask} />
  ));
  const filterList = FILTER_NAMES.map((description) => (
	<FilterButton
	  key={description}
      description={description}
      isPressed={description === filter}
      setFilter={setFilter}
    />
  ));
  const tasksNoun = taskList.length !== 1 ? "actividades" : "actividad";
  const remainingNoun = taskList.length !== 1 ? "pendientes" : "pendiente";
  const headingText = `${taskList.length} ${tasksNoun} ${remainingNoun}`;
  return (
    <div className="todoapp stack-large">
      <h1>TODO de actividades</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
