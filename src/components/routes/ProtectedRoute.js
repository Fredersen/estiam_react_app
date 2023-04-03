import { Outlet, Navigate } from 'react-router-dom';
import authApi from '../../services/authApi';

export default function ProtectedRoute({ children }) {
    const isAuthenticated = authApi.isAuthenticated();

    if (isAuthenticated) {
        return <>{children}</>;
    } else {
        return <Navigate to={'/'} replace />;
    }
}