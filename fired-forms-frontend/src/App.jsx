import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom"
// Import the pages
import Home from "./components/Home"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>     

      <div className="App">
        <Routes>
        <Route exact path="/" element={<h>Home Page</h>} />
        <Route exact path="home" element={<Home />} />
        </Routes>
        <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="home">Home </Link></li>
        </ul>
        </div>
      </div>
    </>
  )
}

export default App
