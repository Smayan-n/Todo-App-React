import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef, useState } from "react";
import Header from "./components/header";
import Input from "./components/input";
import Tasks from "./components/tasks";
import "./index.css";
import { formatDateTime } from "./utility";

function App() {
	//stateful data
	//tasks array
	const [tasks, setTasks] = useState(
		JSON.parse(localStorage.getItem("stored-tasks")) //initializing arr to local storage data
	);
	//toggle state for create new task button
	const [createBtnClicked, setCreateBtnClicked] = useState(false);
	//bool val storing whether a task is being edited
	const [editingTask, setEditingTask] = useState(false);

	//DOM element references used in the Input component
	const taskRef = useRef(null);
	const dateTimeRef = useRef(null);
	const reminderRef = useRef(null);

	//this runs only when the tasks state data changes
	useEffect(() => {
		//save tasks in local storage
		localStorage.setItem("stored-tasks", JSON.stringify(tasks));
	}, [tasks]);

	//add new task to the list
	const handleNewTask = () => {
		setCreateBtnClicked(!createBtnClicked);
	};

	const handleDelete = (e, id = -1) => {
		//make a new tasks array without selected tasks
		let newTasks;
		if (id === -1) {
			//tasks that are not completed
			newTasks = tasks.filter((t) => !t.completed);
		} else {
			//remove one task
			newTasks = tasks.filter((t) => t.id !== id);
		}
		setTasks(newTasks);
	};

	const handleEdit = (id) => {
		setEditingTask(true);
		//open input fields if not open
		if (!createBtnClicked) {
			setCreateBtnClicked(true);
		}
		//get task with passed id
		const task = tasks.filter((t) => t.id === id)[0];

		if (taskRef && dateTimeRef && reminderRef) {
			//set all fields to task's existing values
			taskRef.current.value = task.task;
			dateTimeRef.current.value = task.unformattedDueDate;
			reminderRef.current.checked = task.reminder;
			//delete existing task
			handleDelete(0, id);
		}
	};

	const handleCheck = (checked, id) => {
		//get new tasks with only one of the task's checked value changed
		const newTasks = tasks.map((t) => ({
			...t,
			//if the task is one we want to change, assign it's checked value to checkbox val. Else keep it the same
			completed: t.id === id ? checked : t.completed,
		}));
		setTasks(newTasks);
	};

	const handleSaveTask = (event) => {
		//prevents form from reloading page
		if (event) {
			event.preventDefault();
		}

		//if a task was being edited, it is done editing
		if (editingTask) {
			setEditingTask(false);
		}

		const task = taskRef.current.value,
			dueDate = dateTimeRef.current.value,
			reminder = reminderRef.current.checked;

		//task cannot be blank
		if (task) {
			const split = String(Date()).split(" ");
			const currDate = `${split[2]} ${split[1]} ${split[3]}`;
			const newTask = {
				task: task,
				dueDate: dueDate ? formatDateTime(dueDate) : "No Due Date",
				reminder: reminder,
				completed: false,
				unformattedDueDate: dueDate, //needed to set it back to input
				createdDate: currDate,
				id: Math.floor(Math.random() * 10000), //temp random key generation
			};

			setTasks([...tasks, newTask]);

			//clear input fields
			taskRef.current.value = "";
			dateTimeRef.current.value = "";
			reminderRef.current.checked = false;
		} else {
			// taskRef.current.style.border = "2px solid red";
		}
	};

	//------------------------------------------------------------------
	return (
		<div className="main-container">
			<Header
				createBtnClicked={createBtnClicked}
				onNewTask={handleNewTask}
				totalTasks={tasks.length}
			/>
			<Input
				editingTask={editingTask}
				createBtnClicked={createBtnClicked}
				elementRefs={[taskRef, dateTimeRef, reminderRef]}
				onSaveTask={handleSaveTask}
			/>

			{tasks.filter((t) => t.completed).length >= 1 && (
				<button onClick={handleDelete} className="delete-btn">
					Clear selected
				</button>
			)}
			<Tasks
				tasks={tasks}
				onCheck={handleCheck}
				onDelete={handleDelete}
				onEdit={handleEdit}
			/>
		</div>
	);
}

export default App;
