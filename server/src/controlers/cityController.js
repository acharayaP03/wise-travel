import {
	fetchCities,
	fetchCityById,
	createNewCity,
	deleteCityById,
} from '../services/cityServices.js';
import { generateRandomId } from '../utils/utils.js';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const getAllCities = async (req, res) => {
	try {
		const cities = await fetchCities();
		res.json(cities);
	} catch (error) {
		console.error('Error fetching cities', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to read cities data' });
	}
};

export const getCityById = async (req, res) => {
	try {
		const cityId = req.params.id;
		const city = await fetchCityById(cityId);

		res.json(city);
	} catch (error) {
		console.error('Error fetching city', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to read city data' });
	}
};

export const createCity = async (req, res) => {
	try {
		const newCity = req.body;
		if (!newCity.cityName || !newCity.date) {
			return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data' });
		}

		const createdCity = await createNewCity(newCity);
		res.status(StatusCodes.CREATED).json(createdCity);
	} catch (error) {
		console.error('Error creating city', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create city' });
	}
};

export const deleteCity = async (req, res) => {
	try {
		const cityId = req.params.id;
		const deleteCity = await deleteCityById(cityId);

		if (deleteCity.message === 'City deleted successfully') {
			res.status(StatusCodes.OK).json(deleteCity);
		} else {
			res.status(StatusCodes.NOT_FOUND).json({ error: 'City not found' });
		}
	} catch (error) {
		console.error('Error deleting city', error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete city' });
	}
};
