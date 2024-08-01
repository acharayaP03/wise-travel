import { useAuth } from '../contexts/FakeUserContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children }) {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}

	return children;
}
