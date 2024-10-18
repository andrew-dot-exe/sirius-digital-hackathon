import React from "react";
import QuestionForm  from "../components/QuestionForm";
import UserGreeting from "../components/UserGreeting";

function HrPage()
{
    return (
        <div className="hr-page">
            <QuestionForm />
            <UserGreeting />
        </div>
        
    );
};

export default HrPage;