//import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
//import { UserContext } from './contexts/userContext';
//import { useContext } from 'react';
import Home from './views/home/Home'
import HomePage from './views/homepage/HomePage';
import Register from './views/register/Regiter';
import NavBar from './components/navbar/NavBar';
import Rendiciones from './views/rendicion/rendiciones';
import Rendicion from './views/rendicion/rendicion';
import LogIn from './components/login/LogIn';
import AddAbono from './views/addAbono/AddAbono';
import './App.css';

function App() {

  //const { user } = useContext(UserContext);
 
  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/home" element={<HomePage></HomePage>} />
            {/*<Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />*/}
            <Route path="/login" element={ <LogIn /> } />
            <Route path="/abono" element={ <AddAbono /> } />
            <Route path="/register" element={ <Register />} />
            <Route path="/rendiciones" element={ <Rendiciones />} />
            <Route path="/rendicion/" element={ <Rendicion />} />
            <Route path="/rendicion/:id" element={ <Rendicion />} />
          </Routes>
      </BrowserRouter>
        
    </>
  )
}

export default App
