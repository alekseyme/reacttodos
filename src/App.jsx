import React from 'react';
import axios from 'axios';
import { Route, useHistory } from 'react-router-dom';

import { List, AddList, Tasks } from './components';

const App = () => {
	const [lists, setLists] = React.useState(null);
	const [colors, setColors] = React.useState(null);
	const [activeList, setActiveList] = React.useState(null);
	let history = useHistory();

	React.useEffect(() => {
		axios
			.get('http://localhost:3005/lists?_expand=color&_embed=tasks')
			.then(({ data }) => setLists(data))
			.catch((error) => console.log(error));
		axios
			.get('http://localhost:3005/colors')
			.then(({ data }) => setColors(data))
			.catch((error) => console.log(error));
	}, []);

	const addList = (obj) => {
		setLists([...lists, obj]);
	};

	const removeList = (id) => {
		axios.delete(`http://localhost:3005/lists/${id}`).then(() => {
			const newListItems = lists.filter((list) => list.id !== id);
			setLists(newListItems);
		});
	};

	const onEditTitle = (id, name) => {
		const newName = lists.map((list) => {
			if (list.id === id) {
				list.name = name;
			}
			return list;
		});
		setLists(newName);
	};

	const onShowTask = (list) => {
		history.push(`/lists/${list.id}`);
		setActiveList(list);
	};

	const onAddTask = (listId, taskObj) => {
		axios
			.post('http://localhost:3005/tasks', taskObj)
			.then(({ data }) => {
				const newTask = lists.map((list) => {
					if (list.id === listId) {
						list.tasks = [...list.tasks, data];
					}
					return list;
				});
				setLists(newTask);
			})
			.catch(() => alert('Задача не добавлена'));
	};

	const onRemoveTask = (listId, id) => {
		console.log(listId, id);
		axios.delete(`http://localhost:3005/tasks/${id}`).then(() => {
			const newListItems = lists.map((list) => {
				if (list.id === listId) {
					console.log('opa');
					list.tasks = list.tasks.filter((task) => task.id !== id);
				}
				return list;
			});
			console.log(newListItems);
			setLists(newListItems);
		});
	};

	const onCompleteTask = (id, listId, isChecked) => {
		axios.patch(`http://localhost:3005/tasks/${id}`, { completed: isChecked }).then(() => {
			const newListItems = lists.map((list) => {
				if (list.id === listId) {
					list.tasks.map((task) => {
						if (task.id === id) {
							task.completed = isChecked;
						}
						return task;
					});
				}
				return list;
			});
			setLists(newListItems);
		});
	};

	const onEditTask = (listId, id, text) => {
		console.log(listId, id, text);
		const newTaskText = window.prompt('Текст задачи', text);

		if (newTaskText && newTaskText !== text) {
			axios.patch(`http://localhost:3005/tasks/${id}`, { text: newTaskText }).then(() => {
				const newListItems = lists.map((list) => {
					if (list.id === listId) {
						list.tasks.map((task) => {
							if (task.id === id) {
								task.text = newTaskText;
							}
							return task;
						});
					}
					return list;
				});
				setLists(newListItems);
			});
		}
	};

	return (
		<div className="todo">
			<div className="todo__sidebar">
				{lists ? (
					<List
						items={lists}
						onShowTasks={onShowTask}
						onRemoveList={removeList}
						activeList={activeList}
						removable
					/>
				) : (
					'Загрузка...'
				)}

				<AddList colors={colors} onAddList={addList} />
			</div>
			<div className="todo__tasks">
				<Route exact path="/">
					{lists &&
						lists.map((list) => (
							<Tasks
								key={list.id}
								list={list}
								onEditTitle={onEditTitle}
								onAddTask={onAddTask}
								onRemoveTask={onRemoveTask}
								onCompleteTask={onCompleteTask}
								onEditTask={onEditTask}
							/>
						))}
				</Route>
				{lists && activeList && (
					<Tasks
						list={activeList}
						onEditTitle={onEditTitle}
						onAddTask={onAddTask}
						onRemoveTask={onRemoveTask}
						onCompleteTask={onCompleteTask}
						onEditTask={onEditTask}
					/>
				)}
			</div>
		</div>
	);
};

export default App;
