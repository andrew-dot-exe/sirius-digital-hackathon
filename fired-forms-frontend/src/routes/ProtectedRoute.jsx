// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Unauthorized from '../Pages/Unauthorized'; // Import the Unauthorized component

function ProtectedRoute({ children, requiredLevel }) {
    const token = Cookies.get('authToken');
    if (!token) {
        return <Navigate to="/" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const userLevel = decodedToken.userLevel;

        if (userLevel !== requiredLevel) {
            return <Unauthorized />; 
        }

        return children;
    } catch (error) {
        return <Navigate to="/" />;
    }
}

export default ProtectedRoute;
