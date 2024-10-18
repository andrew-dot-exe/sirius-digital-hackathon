import './App.css';
import {Routes, Route, Link} from "react-router-dom"
import Home from "./Pages/Home";
import ReportPage from "./Pages/ReportPage";


function App() {
  return (
    <div className="App">
		<Routes>
		<Route exact path="/" element={<Home />} />
		<Route exact path="home" element={<Home />} />
		<Route exact path="report" element={<ReportPage />} />
		</Routes>
	</div>
  )
}

export default App;