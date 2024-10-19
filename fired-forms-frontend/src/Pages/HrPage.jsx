import React, { useState, useEffect } from "react";
import QuestionForm  from "../components/QuestionForm";
import UserGreeting from "../components/UserGreeting";
import Cookies from 'js-cookie';


function HrPage()
{
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
        <div className="hr-page">
            <QuestionForm />
            <UserGreeting userFio={userFIO} onLogout={handleLogout} />
        </div>
        
    );
};

export default HrPage;