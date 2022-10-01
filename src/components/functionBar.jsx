import "../styles/functionBar.css";

function FunctionBar(props) {
	const { completedTasks, totalTasks, onDelete, onFilterTasks, onSortTasks } =
		props;

	return (
		<div className="functionBar-container">
			<div className="left-section">
				{/* show delete btn only at least one task is selected */}
				{completedTasks >= 1 && (
					<button
						onClick={(e) => {
							onDelete(e);
						}}
						className="delete-btn"
					>
						Clear Selected <span>{` (${completedTasks})`}</span>
					</button>
				)}
				<div className="task-cnt">
					{totalTasks >= 1
						? totalTasks + " Total Task(s)"
						: "No tasks"}
				</div>
			</div>

			<div className="right-section">
				<div className="filter-container">
					<label htmlFor="dropdown1">Filter: </label>
					<select
						onChange={(e) => {
							onFilterTasks(e.target.value);
						}}
						name="filter"
						id="dropdown1"
					>
						<option value="All">All</option>
						<option value="Active">Active</option>
						<option value="Completed">Completed</option>
						<option value="With Reminders">With Reminders</option>
						<option value="With Due Date">
							With Due Date&nbsp;&nbsp;
						</option>
					</select>
				</div>

				<div className="sort-container">
					<label htmlFor="dropdown2">Sort By:</label>
					<select
						onChange={(e) => {
							onSortTasks(e.target.value);
						}}
						name="sort"
						id="dropdown2"
					>
						<option value="Default">Default</option>
						<option value="Alphabetical Order">Task Name</option>
						<option value="Due Date">Due Date</option>
						<option value="Added Date">Added Date</option>
					</select>
				</div>
			</div>
		</div>
	);
}

export default FunctionBar;
