import { Navigate } from 'react-router-dom';
import authApi from '../../services/authApi';

export default function AdminRoute({ children }) {
    const isAuthenticated = authApi.isAuthenticated();
    const role = authApi.retrieveRole();

    if (isAuthenticated && role === 'admin') {
        return <>{children}</>;
    } else {
        return <Navigate to={'/'} replace />;
    }
}