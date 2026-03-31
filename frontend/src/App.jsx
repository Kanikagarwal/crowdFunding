import { use, useState } from 'react'
import Landing from './Pages/Landing'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import './App.css'
import Home from './Pages/Home'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
const {showLogin} = useContext(AppContext);
  return (
    <>
    <ToastContainer position='bottom-right'/>
    <Routes>
      <Route path="/" element={(showLogin==true ? <Landing/> :<Home/>)} />
      <Route path="/login" element={<Login />} />
      <Route path="/campaigns" element={<h1>Campaigns</h1>} />
    </Routes>
      </>
  )
}

export default App
