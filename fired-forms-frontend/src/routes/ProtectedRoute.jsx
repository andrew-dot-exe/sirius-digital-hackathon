// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import Unauthorized from '../Pages/Unauthorized'; // Импортируем компонент Unauthorized

function ProtectedRoute({ children, requiredLevels }) {
    const token = Cookies.get('authToken');
    if (!token) {
        return <Navigate to="/" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const userLevel = decodedToken.userLevel;

        if (!requiredLevels.includes(userLevel)) {
            return <Unauthorized />;
        }

        return children;
    } catch (error) {
        return <Navigate to="/" />;
    }
}

export default ProtectedRoute;
