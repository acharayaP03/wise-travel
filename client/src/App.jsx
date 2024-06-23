import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { RouterProvider } from 'react-router-dom';
// import router from './router';
import { Homepage, Login, Pricing, Product, AppLayout, PageNotFound } from './pages';
import { City, CityList } from './components/City';
import CountryList from './components/Country/CountryList';
import Form from './components/Form/Form';

const BASE_URL = 'http://localhost:8080';
function App() {
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
		// <>
		// 	<RouterProvider router={router}>{router.currentElement}</RouterProvider>
		// </>

		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/product' element={<Product />} />
				<Route path='/pricing' element={<Pricing />} />
				<Route path='/login' element={<Login />} />
				<Route path='app' element={<AppLayout />}>
					<Route index element={<Navigate replace to='cities' />} />
					<Route path='cities' element={<CityList cities={cities} isLoading={isLoading} />} />
					<Route path='cities/:id' element={<City />} />
					<Route path='countries' element={<CountryList cities={cities} isLoading={isLoading} />} />
					<Route path='form' element={<Form />} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
