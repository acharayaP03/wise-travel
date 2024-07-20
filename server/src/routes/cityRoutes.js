import { Router } from 'express';
import { getAllCities, getCityById, createCity, deleteCity } from '../controlers/cityController.js';

const cityRouter = Router();

cityRouter.get('/', getAllCities);
cityRouter.get('/:id', getCityById);
cityRouter.post('/newCity', createCity);
cityRouter.delete('/:id', deleteCity);

export default cityRouter;
