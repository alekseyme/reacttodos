import React from 'react';

import editSvg from '../../assets/img/edit.svg';

const TaskTitle = ({ list, editTitle }) => {
	return (
		<>
			{list.name}
			<span onClick={editTitle}>
				<img src={editSvg} alt="edit" />
			</span>
		</>
	);
};

export default TaskTitle;
