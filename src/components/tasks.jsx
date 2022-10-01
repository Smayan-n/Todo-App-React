import "../styles/task.css";
import Task from "./task";

function Tasks(props) {
	const { tasks, onCheck, onDelete, onEdit } = props;

	return (
		<div className="tasks-container">
			{tasks.map((task) => (
				<Task
					key={task.id}
					task={task}
					onCheck={onCheck}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			))}
		</div>
	);
}

export default Tasks;
