

import { useState } from 'react'
import Landing from './Pages/Landing'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import './App.css'
import Home from './Pages/Home'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import OrganiserLogin from './Pages/OrganiserLogin'  // ← add
import Dashboard from './Pages/Dashboard'                 // ← add
import Campaigns from './components/Campaigns'            // ← add
import AllCampaigns from './Pages/AllCampaigns'           // ← add
import CampaignIndividual from './Pages/CampaignIndividual'
import History from './Pages/History'

function App() {
  const { showLogin } = useContext(AppContext);

  return (
    <>
      <ToastContainer position='bottom-right' />
      <Routes>
        <Route path="/"                 element={<Home />} />
        <Route path="/login"            element={<Login />} />
        <Route path="/campaigns"        element={<Campaigns />} />
        <Route path="/all-campaigns"    element={<AllCampaigns />} />
        <Route path="/campaign/:id"    element={<CampaignIndividual />} />
        <Route path="/organiser/login"  element={<OrganiserLogin />} />
        <Route path="/dashboard"        element={<Dashboard />} />
        <Route path="/history"        element={<History />} />
      </Routes>
    </>
  )
}

export default App
