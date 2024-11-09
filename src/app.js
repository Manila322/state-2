import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ControlPanel, Todo } from './components';
import { fetchTodos, saveTodo, updateTodo, deleteTodo } from './actions/todoActions';
import styles from './app.module.css';

export const App = () => {
	const dispatch = useDispatch();
	const { todos } = useSelector((state) => state.todos);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);

	useEffect(() => {
		dispatch(fetchTodos(searchPhrase, isAlphabetSorting));
	}, [searchPhrase, isAlphabetSorting, dispatch]);

	const onTodoAdd = () => {
		const newTodo = { title: '', completed: false, isEditing: true };
		dispatch(saveTodo(newTodo));
	};

	const onTodoEdit = (id) => {
		dispatch(
			updateTodo({
				...todos.find((todo) => todo.id === id),
				isEditing: true,
			}),
		);
	};

	const onTodoSave = (id) => {
		const { title } = todos.find((todo) => todo.id === id);
		dispatch(
			updateTodo({
				id,
				title,
				isEditing: false,
			}),
		);
	};

	const onTodoTitleChange = (id, newTitle) => {
		dispatch(
			updateTodo({
				id,
				title: newTitle,
			}),
		);
	};

	const onTodoCompletedChange = (id, newCompleted) => {
		dispatch(
			updateTodo({
				id,
				completed: newCompleted,
			}),
		);
	};

	const onTodoRemove = (id) => {
		dispatch(deleteTodo(id));
	};

	return (
		<div className={styles.app}>
			<ControlPanel
				onTodoAdd={onTodoAdd}
				onSearch={setSearchPhrase}
				onSorting={setIsAlphabetSorting}
			/>
			<div>
				{todos.map(({ id, title, completed, isEditing = false }) => (
					<Todo
						key={id}
						id={id}
						title={title}
						completed={completed}
						isEditing={isEditing}
						onEdit={() => onTodoEdit(id)}
						onTitleChange={(newTitle) => onTodoTitleChange(id, newTitle)}
						onCompletedChange={(newCompleted) =>
							onTodoCompletedChange(id, newCompleted)
						}
						onSave={() => onTodoSave(id)}
						onRemove={() => onTodoRemove(id)}
					/>
				))}
			</div>
		</div>
	);
};
