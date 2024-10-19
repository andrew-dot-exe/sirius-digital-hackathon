// App.js
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Unauthorized from './Pages/Unauthorized';
import Home from './Pages/Home';
import ReportPage from './Pages/ReportPage'
import HrPage from './Pages/HrPage'
import DefaultPage from './Pages/DefaultPage'
function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} /> {/* Ваш компонент домашней страницы */}
            
            <Route 
                path="/report" 
                element={
                    <ProtectedRoute requiredLevels={[ "manager"]}>
                        <ReportPage/>
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/hr" 
                element={
                    <ProtectedRoute requiredLevels={["hr"]}>
                        <HrPage/>
                    </ProtectedRoute>
                } 
            />
			<Route 
                path="/default" 
                element={
                    <ProtectedRoute requiredLevels={["default"]}>
                         <DefaultPage/>
                    </ProtectedRoute>
                } 
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
    );
}

export default App;
