import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom"
// Import the pages
//import Home from "./components/Home";
import './components/LoginButton';
import LoginButton from './components/LoginButton';

/*
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
      <button style="position: fixed; top: 10px; right: 10px; Color:Black;" onClick={
        document.write(1)
      }>Вход</button>
      */

function App() {

  return (
    <div className='App'>
      <LoginButton />
    </div>
  )
}

export default App;
