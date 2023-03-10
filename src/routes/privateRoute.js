import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AUTH_CONTEXT } from '../context/AuthProvider';

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AUTH_CONTEXT);
    const location = useLocation()


    if (loading) {
        return 'Loading...'
    }

    if (user) {
        return children;
    }

    return <Navigate to="/signin" state={{from: location}} replace/>

};

export default PrivateRoute;