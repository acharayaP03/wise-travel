import { createBrowserRouter } from 'react-router-dom';
import { Homepage, Product, Pricing, PageNotFound, AppLayout, Login } from './pages';
const router = createBrowserRouter([
	{
		path: '/',
		element: <Homepage />,
	},
	{
		path: '/product',
		element: <Product />,
	},
	{
		path: '/pricing',
		element: <Pricing />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/app',
		element: <AppLayout />,
	},
	{
		path: '*',
		element: <PageNotFound />,
	},
]);

export default router;
