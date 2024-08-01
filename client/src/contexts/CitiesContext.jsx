import { curry } from 'lodash';
import { Children, createContext, useContext, useEffect, useReducer, useState } from 'react';

const BASE_URL = 'http://localhost:8080';
const CitiesContext = createContext();
const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_CITIES = 'SET_CITIES';
const SET_CURRENT_CITY = 'SET_CURRENT_CITY';
const SET_NEW_CITY = 'SET_NEW_CITY';
const REMOVE_CITY = 'REMOVE_CITY';
const SET_ERROR = 'SET_ERROR';

const initialState = {
	cities: [],
	isLoading: true,
	currentCity: {},
	error: '',
};

function reducer(state, action) {
	switch (action.type) {
		case SET_IS_LOADING:
			return { ...state, isLoading: true };
		case SET_CITIES:
			console.log(action.payload);
			return { ...state, isLoading: false, cities: action.payload.cities };
		case SET_CURRENT_CITY:
			return { ...state, isLoading: false, currentCity: action.payload };
		case SET_NEW_CITY:
			return { ...state, isLoading: false, cities: [...state.cities, action.payload] };
		case REMOVE_CITY:
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter((city) => city.id !== action.payload),
				currentCity: {},
			};
		case SET_ERROR:
			return { ...state, isLoading: false, error: action.payload };
		default:
			throw new Error('Unknown action type');
	}
}
function CitiesProvider({ children }) {
	const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		async function fetchCities() {
			dispatch({ type: SET_IS_LOADING });
			try {
				const response = await fetch(`${BASE_URL}/cities`);
				const data = await response.json();

				dispatch({ type: SET_CITIES, payload: data });
			} catch (error) {
				console.error('Error fetching cities', error);
				dispatch({ type: SET_ERROR, payload: error.message });
			}
		}

		fetchCities();
	}, []);

	const getCurrentCity = async (id) => {
		if (id === currentCity.id) return;
		dispatch({ type: SET_IS_LOADING });
		try {
			const response = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await response.json();
			dispatch({ type: SET_CURRENT_CITY, payload: data });
		} catch (error) {
			console.error('Error fetching cities', error);
			dispatch({ type: SET_ERROR, payload: error.message });
		}
	};

	const createCity = async (city) => {
		dispatch({ type: SET_IS_LOADING });
		try {
			const response = await fetch(`${BASE_URL}/cities/newcity`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(city),
			});
			const data = await response.json();
			dispatch({ type: SET_NEW_CITY, payload: data });
		} catch (error) {
			console.error('Error creating city', error);
			dispatch({ type: SET_ERROR, payload: error.message });
		}
	};

	const deleteCity = async (id) => {
		dispatch({ type: SET_IS_LOADING });
		try {
			const response = await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			});
			const data = await response.json();
			dispatch({ type: REMOVE_CITY, payload: id });
		} catch (error) {
			console.error('Error deleting city', error);
			dispatch({ type: SET_ERROR, payload: error.message });
		}
	};

	return (
		<CitiesContext.Provider
			value={{ cities, isLoading, currentCity, getCurrentCity, createCity, deleteCity }}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);

	if (!context) {
		throw new Error('useCities must be used within a CitiesProvider');
	}

	return context;
}
export { CitiesProvider, useCities };
