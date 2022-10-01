import "../index.css";

function Header(props) {
	const { createBtnClicked, totalTasks, onNewTask } = props;

	const btnStyle = () => {
		return createBtnClicked
			? { backgroundColor: "red" }
			: { backgroundColor: "green" };
	};

	return (
		<div className="header">
			<div className="left-section">
				<div className="title">Task Tracker</div>
				<div className="task-cnt">
					{totalTasks >= 1 ? totalTasks + " task(s)" : "No tasks"}
				</div>
			</div>
			<button
				onClick={(e) => {
					onNewTask();
				}}
				style={btnStyle()}
				className="new-task-btn"
			>
				{createBtnClicked ? "Cancel" : "New Task"}
			</button>
		</div>
	);
}

export default Header;
