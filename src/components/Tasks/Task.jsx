import React from 'react';

import editSvg from '../../assets/img/edit.svg';
import removeSvg from '../../assets/img/remove.svg';

const Task = ({ id, text, listId, completed, onRemoveTask, onCompleteTask, onEditTask }) => {
	const onHandleChangeCheckbox = (e) => {
		onCompleteTask(id, listId, e.target.checked);
	};

	return (
		<div className="tasks__items-row">
			<div className="checkbox">
				<input
					id={`task-${id}`}
					type="checkbox"
					checked={completed}
					onChange={onHandleChangeCheckbox}
				/>
				<label htmlFor={`task-${id}`}>
					<svg
						width="11"
						height="8"
						viewBox="0 0 11 8"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
							stroke="white"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</label>
			</div>
			<p className={completed ? 'completed' : ''}>{text}</p>
			<div className="tasks__items-row-actions">
				<span onClick={() => onEditTask(listId, id, text)}>
					<img src={editSvg} alt="edit-task" />
				</span>
				<span onClick={() => onRemoveTask(listId, id)}>
					<img src={removeSvg} alt="remove-task" />
				</span>
			</div>
		</div>
	);
};

export default Task;
