import QuestionForm  from "../components/QuestionForm";
import UserGreeting from "../components/UserGreeting";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

function DefaultPage()
{
    const [userFIO, setUserFIO] = useState(null); // State to store user's FIO

    useEffect(() => {
        // Check if authToken exists in cookies
        //const token = Cookies.get('authToken');
        const fio = Cookies.get('userFIO'); // Assuming you're storing FIO in cookies
        if (fio) {
            setUserFIO(fio); // Set userFIO if already authenticated
            //setLoginButtonVisible(false); // Hide login button
        }
    }, []);

    const handleLogout = () => {
        setUserFIO(null); // Clear the user's FIO
        //Cookies.remove('authToken'); // Clear the authToken cookie
        Cookies.remove('userFIO'); // Clear the userFIO cookie
        //setLoginButtonVisible(true); // Show the login button again
    };

    return (
        <div className="default-page">
            <QuestionForm />
            <UserGreeting userFIO={userFIO} onLogout={handleLogout} />
        </div>
        
    );
};

export default DefaultPage;