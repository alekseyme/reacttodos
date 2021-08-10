import React from 'react';
import classNames from 'classnames';

import listSvg from '../../assets/img/list.svg';
import removeSvg from '../../assets/img/remove.svg';
import './List.scss';

import Badge from '../Badge';

const List = ({ items, removable }) => {
	const removeList = (name) => {
		console.log('Удаляю лист! ' + name);
	};

	return (
		<ul className="list">
			<li className="list__item list__item--overall active">
				<i>
					<img src={listSvg} alt="List icon" />
				</i>
				<span>Все задачи</span>
			</li>
			{items.map((item) => (
				<li
					key={item.id}
					className={classNames('list__item', {
						active: item.active,
					})}>
					<Badge color={item.colorId} />
					<span>{item.name}</span>
					{removable && (
						<span className="list__item--remove" onClick={() => removeList(item.name)}>
							<img src={removeSvg} alt="close" />
						</span>
					)}
				</li>
			))}
		</ul>
	);
};

export default List;
