
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate()

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // --- existing user states ---
  const [token, setToken]           = useState(localStorage.getItem('userToken') || null)
  const [user, setUser]             = useState(localStorage.getItem('userName') || '')
  const [showLogin, setShowLogin]   = useState(false)

  // --- NEW: organiser states ---
  const [organiserToken, setOrganiserToken] = useState(
    localStorage.getItem('organiserToken') || null
  )
  const [organiserName, setOrganiserName] = useState(
    localStorage.getItem('organiserName') || ''
  )

  const loginOrganiser = (token, name) => {
    localStorage.setItem('organiserToken', token)
    localStorage.setItem('organiserName', name)
    setOrganiserToken(token)
    setOrganiserName(name)
  }

  const loginUser = (token, name) => {
    localStorage.setItem('userToken', token)
    console.log(name);
    
    localStorage.setItem('userName', name.name)
    setToken(token)
    setUser(name.name)
  }

  const logoutOrganiser = () => {
    localStorage.removeItem('organiserToken')
    localStorage.removeItem('organiserName')
    setOrganiserToken(null)
    setOrganiserName('')
  }

  const value = {
    backendUrl,
    // existing
    token, setToken,
    user, setUser,
    showLogin, setShowLogin,
    loginUser,
    // new organiser
    organiserToken, organiserName,
    loginOrganiser, logoutOrganiser
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider