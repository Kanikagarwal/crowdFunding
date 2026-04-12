// import React from 'react'
// import { createContext, useEffect, useState } from 'react'
// export const AppContext = createContext();



// const AppContextProvider = (props) => {
//     const [user,setUser] = useState(false);
//     const [showLogin, setShowLogin] = useState(() => {
//   return !localStorage.getItem("tokens"); 
// });
//     const [token,setToken] = useState(localStorage.getItem("tokens") || null);
//     const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
//     const values = {
//         user,
//         setUser,
//         showLogin,
//         setShowLogin,
//         token,
//         setToken,
//         backendUrl
//     }
//   return (
//     <AppContext.Provider value={values}>
//       {props.children}
//     </AppContext.Provider>
//   )
// }

// export default AppContextProvider


import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // --- existing user states ---
  const [token, setToken]           = useState(localStorage.getItem('tokens') || null)
  const [user, setUser]             = useState(null)
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
    localStorage.setItem('userName', name)
    setToken(token)
    setUser(name)
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