import { Children, createContext, useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:8080';
const CitiesContext = createContext();

function CitiesProvider({ children }) {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchCities() {
			try {
				setIsLoading(true);
				const response = await fetch(`${BASE_URL}/cities`);
				const data = await response.json();
				setCities(data);
			} catch (error) {
				console.error('Error fetching cities', error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchCities();
	}, []);

	return (
		<CitiesContext.Provider value={{ cities, isLoading }}> {Children} </CitiesContext.Provider>
	);
}

export { CitiesProvider, CitiesContext };
