import './App.css';
import {Routes, Route, Link} from "react-router-dom"
// Import the pages
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
		<ul>
			<li><Link to="/"></Link></li>
			<li><Link to="home"></Link></li>
			<li><Link to="report"></Link></li>
		</ul>
	</div>
  )
}

export default App;