import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef, useState } from "react";
import FunctionBar from "./components/functionBar";
import Header from "./components/header";
import Input from "./components/input";
import Tasks from "./components/tasks";
import "./index.css";
import { formatDate } from "./utility";

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
	//vals storing the type of filter and sort active
	const [filterValue, setFilterValue] = useState("All");
	const [sortValue, setSortValue] = useState("Default");

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
		// setAllTasks(newTasks);
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
		// setAllTasks(newTasks);
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
			const currDate = new Date().toISOString().slice(0, 10); //to convert curr date to yyyy-mm-dd format
			const newTask = {
				task: task,
				dueDate: dueDate ? formatDate(dueDate) : "No Due Date",
				createdDate: formatDate(currDate),
				reminder: reminder,
				completed: false,
				unformattedDueDate: dueDate, //needed to set it back to input when editing and for sorting
				unformattedCreatedDate: currDate,
				id: Math.floor(Math.random() * 10000), //temp random key generation
			};

			setTasks([...tasks, newTask]);

			//clear input fields
			taskRef.current.value = "";
			dateTimeRef.current.value = "";
			reminderRef.current.checked = false;
		}
	};

	//when the dropdown menu is changed
	const handleFilterTasks = (filter) => {
		setFilterValue(filter);
	};

	//to get filtered tasks at render time
	const getfilteredTasks = () => {
		let filtered = tasks;
		switch (filterValue) {
			case "Completed":
				filtered = tasks.filter((t) => t.completed);
				break;
			case "Active":
				filtered = tasks.filter((t) => !t.completed);
				break;
			case "With Reminders":
				filtered = tasks.filter((t) => t.reminder);
				break;
			case "With Due Date":
				filtered = tasks.filter((t) => t.unformattedDueDate);
				break;
			default:
				break;
		}
		return filtered;
	};

	const handleSortTasks = (sort) => {
		setSortValue(sort);
	};

	const getSortedTasks = (sorted) => {
		//making a copy of tasks array to sort
		sorted = [].concat(sorted);
		switch (sortValue) {
			case "Due Date":
				sorted.sort((t1, t2) => {
					return (
						new Date(t1.unformattedDueDate) -
						new Date(t2.unformattedDueDate)
					);
				});
				break;
			case "Added Date":
				sorted.sort((t1, t2) => {
					return (
						new Date(t1.unformattedCreatedDate) -
						new Date(t2.unformattedCreatedDate)
					);
				});
				break;
			case "Alphabetical Order":
				sorted.sort((t1, t2) => t1.task.localeCompare(t2.task));
				break;
			default:
				break;
		}
		return sorted;
	};
	//returns the tasks that should be rendered at any particular time (depending on sortValue and filterValue)
	const getCurrentTasks = () => {
		//first filter tasks and then sort them
		const filtered = getfilteredTasks();
		const filteredAndSorted = getSortedTasks(filtered);
		return filteredAndSorted;
	};

	//------------------------------------------------------------------
	return (
		<div className="main-container">
			<Header
				createBtnClicked={createBtnClicked}
				onNewTask={handleNewTask}
			/>
			<Input
				editingTask={editingTask}
				createBtnClicked={createBtnClicked}
				elementRefs={[taskRef, dateTimeRef, reminderRef]}
				onSaveTask={handleSaveTask}
			/>

			<FunctionBar
				completedTasks={
					getCurrentTasks().filter((t) => t.completed).length
				}
				onDelete={handleDelete}
				totalTasks={getCurrentTasks().length}
				onFilterTasks={handleFilterTasks}
				onSortTasks={handleSortTasks}
			/>
			<Tasks
				tasks={getCurrentTasks()}
				onCheck={handleCheck}
				onDelete={handleDelete}
				onEdit={handleEdit}
			/>
		</div>
	);
}

export default App;
