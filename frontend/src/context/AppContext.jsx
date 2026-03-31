import React from 'react'
import { createContext, useEffect, useState } from 'react'
export const AppContext = createContext();



const AppContextProvider = (props) => {
    const [user,setUser] = useState(false);
    const [showLogin, setShowLogin] = useState(() => {
  return !localStorage.getItem("token"); 
});
    const [token,setToken] = useState(localStorage.getItem("token") || null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    const values = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        token,
        setToken,
        backendUrl
    }
  return (
    <AppContext.Provider value={values}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
