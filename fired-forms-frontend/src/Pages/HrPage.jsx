import React, { useState, useEffect } from "react";
import QuestionForm from "../components/QuestionForm";
import UserGreeting from "../components/UserGreeting";
import Cookies from 'js-cookie';

function HrPage() {
    const [userFIO, setUserFIO] = useState(null);

    useEffect(() => {
        const token = Cookies.get('authToken');
        const FIO = Cookies.get('userFIO'); 
        if (token) {
            setUserFIO(FIO); // Устанавливаем FIO, если токен существует
        }
    }, []);

    const handleLogout = () => {
        setUserFIO(null); // Очищаем FIO при выходе
        Cookies.remove('userFIO'); // Удаляем Cookie
    };

    return (
        <div className="hr-page">
            <QuestionForm />
            <UserGreeting userFIO={userFIO} onLogout={handleLogout} /> {/* Изменено на userFIO */}
        </div>
    );
}

export default HrPage;
