import { readTodos, createTodo } from '../api/api';

export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const setTodos = (todos) => ({
	type: SET_TODOS,
	payload: todos,
});

export const addTodo = (todo) => ({
	type: ADD_TODO,
	payload: todo,
});

export const updateTodo = (todo) => ({
	type: UPDATE_TODO,
	payload: todo,
});

export const deleteTodo = (todoId) => ({
	type: DELETE_TODO,
	payload: todoId,
});

export const fetchTodos = (searchPhrase, isAlphabetSorting) => {
	return async (dispatch) => {
		const todos = await readTodos(searchPhrase, isAlphabetSorting);
		dispatch(setTodos(todos));
	};
};

export const saveTodo = (todo) => {
	return async (dispatch) => {
		const createdTodo = await createTodo(todo);
		dispatch(addTodo(createdTodo));
	};
};
