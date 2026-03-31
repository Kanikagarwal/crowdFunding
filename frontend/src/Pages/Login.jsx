import React, { use, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [login, setLogin] = useState(true);
const {backendUrl,setUser,setToken,setShowLogin} = useContext(AppContext);
const [name,setUsername] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const navigate = useNavigate();
const onSubmitHandler = async(e)=>{
  e.preventDefault();
  try {
    console.log(name);
    console.log(password);
    console.log(email);
    
    
    
    if(login){
      const {data} = await axios.post(`${backendUrl}/api/user/login`,{
        email,password
      })
      if(data.success){
        setToken(data.token);
        setUsername(data.user);
        setShowLogin(false);
        localStorage.setItem("tokens",data.token);
        navigate("/");
      }
      else{
        toast.error(data.message);
      }
    }
    else{
      const {data} = await axios.post(`${backendUrl}/api/user/register`,{
        name,email,password
      })
      console.log(data);
      
      if(data.success){
        setToken(data.token);
        setUsername(data.user);
        setShowLogin(false);
        localStorage.setItem("tokens",data.token);
        navigate("/");
      }
      else{
        toast.error(data.message);
      }
    }
  } catch (error) {
    console.log(error.message);
    
  }
}





  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-[#1A9E83]/5 via-[#1a9e83b4]/25 to-white">
      
      {/* LOGIN */}
      {login ? (
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md border border-gray-100 rounded shadow-lg p-6 flex flex-col bg-white transition-all duration-300">
          
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <form>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-2 focus:ring-2 focus:ring-[#1A9E83] focus:border-[#1A9E83]"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-2 focus:ring-2 focus:ring-[#1A9E83] focus:border-[#1A9E83]"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              onClick={onSubmitHandler}
              className="w-full bg-[#1A9E83] text-white py-2 px-4 rounded-md hover:bg-[#1A9E83]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A9E83]"
            >
              Login
            </button>

            {/* Toggle */}
            <p className="text-center mt-3 text-sm">
              Don't have an account?{" "}
              <span
                onClick={() => setLogin(false)}
                className="cursor-pointer text-[#1A9E83] underline"
              >
                Signup
              </span>
            </p>
          </form>
        </div>
      ) : (
        
        /* SIGNUP */
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md border border-gray-100 rounded shadow-lg p-6 flex flex-col bg-white transition-all duration-300">
          
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          <form>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                onChange={(e)=>setUsername(e.target.value)}
                placeholder="Enter username"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-2 focus:ring-2 focus:ring-[#1A9E83] focus:border-[#1A9E83]"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-2 focus:ring-2 focus:ring-[#1A9E83] focus:border-[#1A9E83]"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-2 focus:ring-2 focus:ring-[#1A9E83] focus:border-[#1A9E83]"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              onClick={onSubmitHandler}
              className="w-full bg-[#1A9E83] text-white py-2 px-4 rounded-md hover:bg-[#1A9E83]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A9E83]"
            >
              Sign Up
            </button>

            {/* Toggle */}
            <p className="text-center mt-3 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => setLogin(true)}
                className="cursor-pointer text-[#1A9E83] underline"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;