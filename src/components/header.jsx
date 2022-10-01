import "../styles/header.css";

function Header(props) {
	const { createBtnClicked, onNewTask } = props;

	const btnStyle = () => {
		return createBtnClicked
			? { backgroundColor: "red" }
			: { backgroundColor: "green" };
	};

	return (
		<div className="header">
			<div className="left-section">
				<div className="title">Task Tracker</div>
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
