import React from 'react';

import acceptSvg from '../../assets/img/check.svg';

const TaskEditTitle = ({ list, editTitle }) => {
	const [newTitleName, setNewTitleName] = React.useState(list.name);

	return (
		<>
			<input
				type="text"
				className="tasks__title-edit"
				value={newTitleName}
				onChange={(e) => setNewTitleName(e.target.value)}
			/>
			<span className="tasks__title-save" onClick={() => editTitle(newTitleName)}>
				<img src={acceptSvg} alt="save-title" />
			</span>
		</>
	);
};

export default TaskEditTitle;
