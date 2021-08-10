import React from 'react';
import Badge from '../Badge';

import closeSvg from '../../assets/img/close.svg';

import './AddList.scss';

const AddList = ({ colors }) => {
	const [visiblePopup, setVisiblePopup] = React.useState(false);
	const [selectedColor, setSelectedColor] = React.useState(colors[0].id);

	const togglePopup = () => {
		setVisiblePopup((prev) => !prev);
	};

	const setActiveBadge = (id) => {
		setSelectedColor(id);
	};

	return (
		<div className="add-list">
			<button className="add-list__button" onClick={togglePopup}>
				Добавить список
			</button>
			{visiblePopup && (
				<div className="add-list__popup">
					<img
						src={closeSvg}
						alt="closesvg"
						className="add-list__popup-close-btn"
						onClick={togglePopup}
					/>
					<input type="text" className="field" placeholder="Название списка" />
					<div className="add-list__popup-colors">
						{colors.map((color) => (
							<Badge
								onSetActive={() => setActiveBadge(color.id)}
								className={selectedColor === color.id && 'active'}
								key={color.id}
								color={color.name}
							/>
						))}
					</div>
					<button className="button">Добавить</button>
				</div>
			)}
		</div>
	);
};

export default AddList;
