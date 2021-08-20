import React from 'react';

import addSvg from '../../assets/img/add.svg';

const AddTask = ({ list, onAddTask }) => {
	const [taskText, setTaskText] = React.useState('');

	const addNewTask = (e) => {
		if (e.code === 'Enter' && taskText && taskText !== '') {
			const newTaskObj = {
				listId: list.id,
				text: taskText,
				completed: false,
			};
			onAddTask(list.id, newTaskObj);
			setTaskText('');
		}
	};

	return (
		<div className="tasks__form">
			<img src={addSvg} alt="add-task" />
			<input
				className="tasks__form-input"
				type="text"
				placeholder="Добавить задачу"
				value={taskText}
				onChange={(e) => setTaskText(e.target.value)}
				onKeyPress={addNewTask}
			/>
		</div>
	);
};

export default AddTask;
