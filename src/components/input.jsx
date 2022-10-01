import React from "react";

function Input(props) {
	const [taskRef, dateTimeRef, reminderRef] = props.elementRefs;

	//sets div display according to button click
	const getByDisplayValue = () => {
		return props.createBtnClicked ? "block" : "none";
	};

	return (
		<div
			style={{ display: getByDisplayValue() }}
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
						ref={taskRef}
						type="text"
						id="taskInput"
						placeholder="Enter task"
					/>
				</div>
				<div className="date-time-input-container">
					<label htmlFor="dateTimeInput">Date {"&"} Time</label>
					<input
						ref={dateTimeRef}
						type="datetime-local"
						id="dateTimeInput"
						placeholder="Enter Date and Time"
					/>
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
						className="submit-btn"
						type="submit"
						id="btn"
						value="Save Task"
					/>
				</div>
			</form>
		</div>
	);
}

export default Input;
