import { Children, createContext, useContext, useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:8080';
const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(() => {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const response = await fetch(`${BASE_URL}/cities`);
				const data = await response.json();
				console.log(data);
				setCities(data.cities);
			} catch (error) {
				console.error('Error fetching cities', error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchCities();
	}, []);

	const getCurrentCity = async (id) => {
		try {
			setIsLoading(true);
			const response = await fetch(`${BASE_URL}/cities/${id}`);
			console.log(response);
			const data = await response.json();
			setCurrentCity(data);
		} catch (error) {
			console.error('Error fetching cities', error);
		} finally {
			setIsLoading(false);
		}
	};

	const createCity = async (city) => {
		try {
			setIsLoading(true);
			const response = await fetch(`${BASE_URL}/cities/newcity`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(city),
			});
			const data = await response.json();
			setCities((previousCities) => [...previousCities, data]);
		} catch (error) {
			console.error('Error creating city', error);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteCity = async (id) => {
		try {
			setIsLoading(true);
			const response = await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			});
			const data = await response.json();
			setCities((previousCities) => previousCities.filter((city) => city.id !== id));
		} catch (error) {
			console.error('Error deleting city', error);
		} finally {
			setIsLoading(false);
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
