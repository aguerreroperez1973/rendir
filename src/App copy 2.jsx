//import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home'
import HomePage from './views/homepage/HomePage';
import Register from './views/register/Regiter';
import './App.css'
import NavBar from './components/navbar/NavBar';
import Rendiciones from './views/rendicion/rendiciones';
import Rendicion from './views/rendicion/rendicion';
import { UserContext } from './contexts/userContext';
import { useContext } from 'react';

function App() {

  const { user } = useContext(UserContext);
 
  return (
    <>
 
      <BrowserRouter>
        <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/home" element={<HomePage></HomePage>} />
            <Route path="/register" element={ <Register></Register>} />
            <Route path="/rendiciones" element={ <Rendiciones />} />
            <Route path="/rendicion/:id" element={ <Rendicion />} />
          </Routes>
        </BrowserRouter>
        
    </>
  )
}

export default App
