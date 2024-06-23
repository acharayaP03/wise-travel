import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { RouterProvider } from 'react-router-dom';
// import router from './router';
import { Homepage, Login, Pricing, Product, AppLayout, PageNotFound } from './pages';
function App() {
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
					<Route index element={<div>cities</div>} />
					<Route path='cities' element={<div>cities</div>} />
					<Route path='countries' element={<div>countries</div>} />
					<Route path='form' element={<div>Forms</div>} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
