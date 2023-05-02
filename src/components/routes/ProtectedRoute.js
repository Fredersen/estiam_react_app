import { Navigate, Outlet } from 'react-router-dom';
import authApi from 'services/authApi';

export default function ProtectedRoute({ allowedRole }) {
    const isAuthenticated = authApi.isAuthenticated();
    if (!isAuthenticated)
        return <Navigate to={'/'} replace />

    const role = authApi.retrieveRole();
    console.log(allowedRole,role);
    if (allowedRole && role !== allowedRole)
        return (<>pas admin</>);

    return <Outlet />;

}