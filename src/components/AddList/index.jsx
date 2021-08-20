import React from 'react';

import axios from 'axios';

import Badge from '../Badge';

import closeSvg from '../../assets/img/close.svg';

import './AddList.scss';

const AddList = ({ colors, onAddList }) => {
	const [visiblePopup, setVisiblePopup] = React.useState(false);
	const [selectedColor, setSelectedColor] = React.useState(1);
	const [newListText, setNewListText] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		if (Array.isArray(colors)) {
			setSelectedColor(colors[0].id);
		}
	}, [colors]);

	const togglePopup = () => {
		setVisiblePopup((prev) => !prev);
	};

	const addNewList = () => {
		if (!newListText) {
			alert('Введите название списка');
			return;
		}
		setIsLoading(true);

		const newList = {
			name: newListText,
			colorId: selectedColor,
		};

		axios
			.post('http://localhost:3005/lists', newList)
			.then(({ data }) => {
				const color = colors.filter((c) => c.id === selectedColor)[0];
				const listObj = { ...data, color, tasks: [] };
				onAddList(listObj);
				setNewListText('');
				setVisiblePopup(false);
				setSelectedColor(colors[0].id);
			})
			.catch(() => alert('Ошибка создания списка'))
			.finally(() => setIsLoading(false));
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
					<input
						type="text"
						className="field"
						placeholder="Название списка"
						value={newListText}
						onChange={(e) => {
							setNewListText(e.target.value);
						}}
					/>
					<div className="add-list__popup-colors">
						{colors.map((color) => (
							<Badge
								onSetActive={() => setSelectedColor(color.id)}
								className={selectedColor === color.id && 'active'}
								key={color.id}
								color={color.name}
							/>
						))}
					</div>
					<button className="button" onClick={addNewList}>
						{isLoading ? 'Добавляю...' : 'Добавить'}
					</button>
				</div>
			)}
		</div>
	);
};

export default AddList;
