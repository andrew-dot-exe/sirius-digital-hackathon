import React, { useState, useEffect } from "react";
import QuestionForm  from "../components/QuestionForm";
import UserGreeting from "../components/UserGreeting";
import Cookies from 'js-cookie';

function DefaultPage()
{
    const [userFio, setUserFio] = useState(null);
    useEffect(() => {
        const fio = Cookies.get('userFIO');
        if (fio)
        {
            setUserFio(fio);
        }
    }, []);

	const handleLogout = () => {
        setUserFio(null);
        Cookies.remove('userFIO');
    };
    return (
        <div className="default-page">
            <QuestionForm />
            <UserGreeting userFio={userFio} onLogout={handleLogout} />
        </div>
        
    );
};

export default DefaultPage;