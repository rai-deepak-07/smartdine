import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/Context';

const UserProtected = () => {
    const { isLoggedIn } = useContext(UserContext);

    if (!isLoggedIn) {
        return <Navigate to="/user-login" replace />;
    }
    return <Outlet />;
}

export default UserProtected;