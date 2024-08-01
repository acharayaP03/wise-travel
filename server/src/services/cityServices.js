import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { generateRandomId, retriveFilePath } from '../utils/utils.js';

const __filename = fileURLToPath(import.meta.url);

async function fetchCities() {
	const citiesPath = retriveFilePath(__filename, 'data', 'cities.json');
	const data = await fs.readFile(citiesPath, 'utf-8');
	return JSON.parse(data);
}

async function fetchCityById(id) {
	const cityId = parseInt(id, 10);
	const citiesPath = retriveFilePath(__filename, 'data', 'cities.json');

	const data = await fs.readFile(citiesPath, 'utf-8');
	const cities = JSON.parse(data).cities;
	const city = cities.find((city) => city.id === cityId);

	return city;
}

async function createNewCity(newCity) {
	try {
		const citiesPath = retriveFilePath(__filename, 'data', 'cities.json');
		const data = await fs.readFile(citiesPath, 'utf-8');
		const citiesData = JSON.parse(data);
		const cities = citiesData.cities;

		const newCityPayload = {
			id: generateRandomId(15),
			...newCity,
		};
		cities.push(newCityPayload);

		// Write the updated cities data back to the file
		await fs.writeFile(citiesPath, JSON.stringify(citiesData, null, 2), 'utf-8');

		return newCity;
	} catch (err) {
		console.error('Error in createNewCity service:', err);
		throw new Error('Failed to create new city');
	}
}

async function deleteCityById(id) {
	const citiesPath = retriveFilePath(__filename, 'data', 'cities.json');
	const data = await fs.readFile(citiesPath, 'utf-8');
	const citiesData = JSON.parse(data);
	const cities = citiesData.cities;

	const cityIndex = cities.findIndex((city) => city.id === id);

	if (cityIndex !== -1) {
		cities.splice(cityIndex, 1);

		// Write the updated cities data back to the file
		await fs.writeFile(citiesPath, JSON.stringify(citiesData, null, 2), 'utf-8');
		return { message: 'City deleted successfully' };
	} else {
		throw new Error('City not found');
	}
}

export { fetchCities, fetchCityById, createNewCity, deleteCityById };
