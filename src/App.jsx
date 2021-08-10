import React from 'react';
import List from './components/List';
import AddList from './components/AddList';

import DB from './assets/db.json';

const App = () => {
	return (
		<div className="todo">
			<div className="todo__sidebar">
				<List
					items={DB.lists.map((item) => {
						item.color = DB.colors.filter((color) => color.id === item.colorId);
						return item;
					})}
					removable
				/>
				<AddList colors={DB.colors} />
			</div>
			<div className="todo__tasks">tasks</div>
		</div>
	);
};

export default App;
