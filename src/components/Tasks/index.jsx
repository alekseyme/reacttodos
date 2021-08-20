import React from 'react';
import axios from 'axios';

import Task from './Task';
import AddTask from './AddTask';
import TaskTitle from './TaskTitle';
import TaskEditTitle from './TaskEditTitle';

import './Tasks.scss';

const Tasks = ({ list, onEditTitle, onAddTask, onRemoveTask, onCompleteTask, onEditTask }) => {
	const [isTitleEdit, setIsTitleEdit] = React.useState(false);

	const editTitle = (newName) => {
		setIsTitleEdit((prev) => !prev);
		if (newName && newName !== list.name) {
			axios
				.patch(`http://localhost:3005/lists/${list.id}`, {
					name: newName,
				})
				.then(onEditTitle(list.id, newName))
				.catch(() => alert('Ошибка изменения имени'));
		}
	};

	return (
		<div className="tasks">
			<h2 className="tasks__title" style={{ color: list.color.hex }}>
				{isTitleEdit ? (
					<TaskEditTitle list={list} editTitle={(newName) => editTitle(newName)} />
				) : (
					<TaskTitle list={list} editTitle={() => editTitle()} />
				)}
			</h2>
			<AddTask list={list} onAddTask={onAddTask} />
			<div className="tasks__items">
				{list.tasks.map((task) => (
					<Task
						key={task.id}
						{...task}
						onRemoveTask={onRemoveTask}
						onCompleteTask={onCompleteTask}
						onEditTask={onEditTask}
					/>
				))}
			</div>
		</div>
	);
};

export default Tasks;
