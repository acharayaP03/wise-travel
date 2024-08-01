import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const initialState = {
	user: null,
	isAuthenticated: false,
};

const FAKE_USER = {
	name: 'Jack',
	email: 'jack@example.com',
	password: 'qwerty',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

function reducer(state, action) {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		default:
			throw new Error(`Unsupported action type: ${action.type}`);
	}
}

function AuthProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: 'LOGIN', payload: FAKE_USER });
		}
	}

	function logout() {
		dispatch({ type: 'LOGOUT' });
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}

export { AuthProvider, useAuth };
