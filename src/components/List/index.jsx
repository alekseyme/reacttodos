import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

import listSvg from '../../assets/img/list.svg';
import removeSvg from '../../assets/img/remove.svg';
import './List.scss';

import Badge from '../Badge';

const List = ({ items, removable, onRemoveList, onShowTasks, activeList, showAll }) => {
	let history = useHistory();

	return (
		<ul className="list">
			<li
				className={`list__item list__item--overall ${showAll ? 'active' : ''}`}
				onClick={() => {
					history.push('/');
				}}>
				<i>
					<img src={listSvg} alt="List icon" />
				</i>
				<span>Все задачи</span>
			</li>
			{items.map((item) => (
				<li
					key={item.id}
					className={classNames('list__item', {
						active: activeList && item.id === activeList.id,
					})}
					onClick={() => onShowTasks(item)}>
					<Badge color={item.color.name} />
					<span className="list__item-name">{item.name}</span>
					<span className="list__item-count">
						{item.tasks && item.tasks.length > 0 && item.tasks.length}
					</span>
					{removable && (
						<img
							src={removeSvg}
							className="list__item--remove"
							onClick={() => onRemoveList(item.id)}
							alt="close"
						/>
					)}
				</li>
			))}
		</ul>
	);
};

export default List;
