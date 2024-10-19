import React, { useState, useEffect } from "react";
import QuestionForm from "../components/QuestionForm";
import UserGreeting from "../components/UserGreeting";
import Cookies from 'js-cookie';

function DefaultPage() {
    const [userFIO, setUserFIO] = useState(null); // Состояние для хранения FIO пользователя

    useEffect(() => {
        const token = Cookies.get('authToken'); // Проверяем наличие токена
        const FIO = Cookies.get('userFIO'); // Получаем FIO из cookie
        if (token) {
            setUserFIO(FIO); // Устанавливаем FIO, если токен существует
        }
    }, []);

    const handleLogout = () => {
        setUserFIO(null); // Очищаем FIO при выходе
        Cookies.remove('userFIO'); // Удаляем Cookie
    };

    return (
        <div className="default-page">
            <QuestionForm />
            <UserGreeting userFIO={userFIO} onLogout={handleLogout} /> {/* Передаем userFIO в UserGreeting */}
        </div>
    );
}

export default DefaultPage;
