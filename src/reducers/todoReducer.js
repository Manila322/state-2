import { ADD_TODO, SET_TODOS, UPDATE_TODO, DELETE_TODO } from '../actions/todoActions';

const initialState = {
	todos: [],
};

const todoReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_TODOS:
			return { ...state, todos: action.payload };

		case ADD_TODO:
			return { ...state, todos: [action.payload, ...state.todos] };

		case UPDATE_TODO:
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
				),
			};

		case DELETE_TODO:
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			};

		default:
			return state;
	}
};

export default todoReducer;
