import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { RouterProvider } from 'react-router-dom';
// import router from './router';
import { Homepage, Login, Pricing, Product, AppLayout, PageNotFound } from './pages';
import { City, CityList } from './components/City';
import CountryList from './components/Country/CountryList';
import Form from './components/Form/Form';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeUserContext';

function App() {
	return (
		// <>
		// 	<RouterProvider router={router}>{router.currentElement}</RouterProvider>
		// </>
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Homepage />} />
						<Route path='/product' element={<Product />} />
						<Route path='/pricing' element={<Pricing />} />
						<Route path='/login' element={<Login />} />
						<Route
							path='app'
							element={
								<ProtectedRoutes>
									<AppLayout />
								</ProtectedRoutes>
							}
						>
							<Route index element={<Navigate replace to='cities' />} />
							<Route path='cities' element={<CityList />} />
							<Route path='cities/:id' element={<City />} />
							<Route path='countries' element={<CountryList />} />
							<Route path='form' element={<Form />} />
						</Route>
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
