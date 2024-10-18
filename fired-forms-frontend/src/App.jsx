import './App.css';
import { Routes, Route, Link } from "react-router-dom"
// Import the pages
import Home from "./Pages/Home";
import ReportPage from "./Pages/ReportPage";
import ProtectedRoute from './routes/ProtectedRoute';
import HrPage from './Pages/HrPage';
import DefaultPage from './Pages/DefaultPage';


function App() {


	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={
					<Home />}></Route>
				<Route exact
					path="/report"
					element={
						<ProtectedRoute requiredLevel="manager">
							<ReportPage />
						</ProtectedRoute>
					} />
				
				<Route exact
					path="/hr"
					element ={
						<ProtectedRoute requiredLevel="hr">
							<HrPage />
						</ProtectedRoute>
					} />
				
				<Route exact
					path="/default"
					element ={
						<ProtectedRoute requiredLevel="default">
							<DefaultPage />
						</ProtectedRoute>
					} />

			</Routes>

		</div>
	)
}

export default App;