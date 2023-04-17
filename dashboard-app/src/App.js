import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';


//pages
import Home from "./pages/home"
import Create from "./pages/create"
import Update from "./pages/update"
import Chart from "./pages/charts"
import Login from "./pages/Login"
import Homepage from "./pages/secureHome"
import Register from "./pages/register"



function App() {
  const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
    
  }, [])
  return (
    <BrowserRouter>
    <nav>
      <h1>Dashboard App</h1>
    </nav>
    <h2 className='justify-center space-x-4 '>
        <Link to="/">Home </Link>
     
        <Link to="/create">Create New Entry </Link>
    
        <Link to="/charts">View Charts</Link>        
    </h2>
    <Routes>
      <Route path="/" element={<Login setToken={setToken}/> } />
      {token?<Route path={"/create"} element={<Create token={token}/>} />:""}
      <Route path="/:id" element={<Update />} />
      {token?<Route path={"/charts"} element={<Chart token={token}/>} />:""}
      {token?<Route path={'/home'} element={ <Home token={token} />} />:""}
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
