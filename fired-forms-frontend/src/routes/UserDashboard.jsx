// components/UserDashboard.js
import React from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode"; 
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
    const navigate = useNavigate(); // Получаем функцию навигации
    const token = Cookies.get('authToken');

    if (!token) {
        return (
            <div>
                <p>Вы не авторизованы. Пожалуйста, войдите в систему.</p>
                <button onClick={() => navigate('/')}>На главную</button>
            </div>
        );
    }

    try {
        const decodedToken = jwtDecode(token);
        const userLevel = decodedToken.userLevel;

        const handleNavigation = () => {
            switch (userLevel) {
                case "manager":
                    navigate("/report");
                    break;
                case "hr":
                    navigate("/hr");
                    break;
                case "default":
                    navigate("/default");
                    break;
                default:
                    alert("У вас нет прав доступа к этой странице."); // Можно перенаправить на страницу Unauthorized
            }
        };

        return (
            <div>
                <h1>Добро пожаловать!</h1>
                <p>Вы находитесь в личном кабинете.</p>
                <button onClick={handleNavigation}>Перейти на свою страницу</button>
            </div>
        );
    } catch (error) {
        console.error('Token decode error:', error); // Логируем ошибку декодирования токена
        return (
            <div>
                <p>Произошла ошибка. Пожалуйста, войдите в систему снова.</p>
                <button onClick={() => navigate('/')}>На главную</button>
            </div>
        );
    }
}

export default UserDashboard;
