import React from "react";
import QuestionForm  from "../components/QuestionForm";
import UserGreeting from "../components/UserGreeting";

function DefaultPage()  
{
    return (
        <div className="default-page">
            <QuestionForm />
            <UserGreeting userFIO={userFIO} onLogout={handleLogout} />
        </div>
        
    );
};

export default DefaultPage;