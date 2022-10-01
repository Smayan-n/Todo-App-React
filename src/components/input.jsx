import React, { useRef } from "react";
import "../styles/input.css";

function Input(props) {
	const [taskRef, dateTimeRef, reminderRef] = props.elementRefs;
	const submitRef = useRef(null);

	//sets div display according to button click
	const getContainerDisplayValue = () => {
		return props.createBtnClicked ? "block" : "none";
	};

	//for the submit button (visual)
	const getSubmitValue = () => {
		return props.editingTask ? "Edit Task" : "Save Task";
	};

	const getSubmitColor = () => {
		return taskRef.current.value
			? props.editingTask
				? "green"
				: "rgb(8, 141, 141)"
			: "grey";
	};

	const handleTaskInputChange = () => {
		submitRef.current.style.backgroundColor = getSubmitColor();
		taskRef.current.style.border = taskRef.current.value
			? "1px solid black"
			: "2px solid red";
	};

	return (
		<div
			style={{ display: getContainerDisplayValue() }}
			className="input-container"
		>
			<form
				onSubmit={(e) => {
					props.onSaveTask(e);
				}}
			>
				<div className="task-input-container">
					<label htmlFor="taskInput">Task</label>
					<input
						onFocus={handleTaskInputChange}
						onChange={handleTaskInputChange}
						ref={taskRef}
						type="text"
						id="taskInput"
						placeholder="Enter task"
					/>
				</div>
				<div className="date-time-input-container">
					<label htmlFor="dateInput">Due Date</label>
					<input ref={dateTimeRef} type="date" id="dateInput" />
				</div>
				<div className="reminder-input-container">
					<label htmlFor="reminderInput">Set Reminder</label>
					<input
						ref={reminderRef}
						type="checkbox"
						id="reminderInput"
					/>
				</div>
				<div className="submit-btn-container">
					<input
						ref={submitRef}
						style={{
							backgroundColor: props.editingTask
								? "green"
								: "rgb(8, 141, 141)",
						}}
						className="submit-btn"
						type="submit"
						id="btn"
						value={getSubmitValue()}
					/>
				</div>
			</form>
		</div>
	);
}

export default Input;
