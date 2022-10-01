import "../styles/task.css";

function Task(props) {
	const { task, onCheck, onDelete, onEdit } = props;

	//adds a green line on the edge of task if reminder is checked
	const reminderStyle = () => {
		let style = {};
		if (task.reminder) {
			style = { borderLeft: "8px solid green" };
		}
		return style;
	};

	return (
		<div style={reminderStyle()} className="task-container">
			<div className="left-section">
				<input
					className="completed-checkbox"
					type="checkbox"
					checked={task.completed}
					onChange={(e) => {
						onCheck(e.target.checked, task.id);
					}}
				/>
				<div className="task-name">{task.task}</div>
			</div>

			<div className="middle-section">
				<div className="dueDate-box">
					<div className="tooltip-effect">
						<i className="fa fa-hourglass-half me-1 text-warning"></i>
						<div className="tooltip-box">Due Date</div>
					</div>
					<div>{task.dueDate}</div>
				</div>
			</div>

			<div className="right-section">
				<div className="top-part">
					<div
						onClick={(e) => {
							onEdit(task.id);
						}}
						className="edit-div"
					>
						<i
							className="fa fa-edit"
							style={{ color: "green", fontSize: "30px" }}
						></i>
					</div>
					<div
						onClick={(e) => {
							onDelete(e, task.id);
						}}
						className="delete-div"
					>
						<i
							className="fa fa-trash-o"
							style={{ color: "red", fontSize: "30px" }}
						></i>
					</div>
				</div>
				<div className="bottom-part">
					<div className="createdDate-box">
						<div className="tooltip-effect">
							<i className="fa fa-info-circle me-1"></i>
							<div className="tooltip-box">Added Date</div>
						</div>
						<div className="date-created">{task.createdDate}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Task;
