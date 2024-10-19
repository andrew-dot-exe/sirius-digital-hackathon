import React, { useState, useEffect } from "react";
import QuestionForm  from "../components/QuestionForm";
import UserGreeting from "../components/UserGreeting";
import Cookies from 'js-cookie';

function DefaultPage() {
    const [userFIO, setUserFIO] = useState(null);

    useEffect(() => {
        const token = Cookies.get('authToken');
        const FIO = Cookies.get('userFIO'); // Здесь Cookie используется правильно
        if (token){
            setUserFIO(FIO);
        }
    }, []);

    const handleLogout = () => {
        setUserFIO(null); // Очищаем FIO при выходе
        Cookies.remove('userFIO'); // Удаляем Cookie
    };

    return (
        <div className="default-page">
            <QuestionForm />
            <UserGreeting userFIO={userFIO} onLogout={handleLogout} /> {/* Передаём userFIO */}
        </div>
    );
}

export default DefaultPage;
