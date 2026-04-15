import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const OrganiserLogin = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { backendUrl, loginOrganiser } = useContext(AppContext)
  const navigate = useNavigate()

  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        const { data } = await axios.post(
          `${backendUrl}/api/organiser/login`,
          { email, password }
        )
        if (data.success) {
          loginOrganiser(data.token, data.name)
          toast.success(`Welcome back, ${data.name}!`)
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/organiser/register`,
          { name, email, password }
        )
        if (data.success) {
          loginOrganiser(data.token, data.name)
          toast.success('Registration successful!')
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error('Server error, dobara try karo')
      console.log(error.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-[#1A9E83]/5 via-[#1a9e83b4]/25 to-white">
      <div className="w-full max-w-md border border-gray-100 rounded shadow-lg p-6 flex flex-col bg-white">

        <h2 className="text-2xl font-bold text-center mb-1">
          {isLogin ? 'Organiser Login' : 'Organiser Register'}
        </h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          {isLogin ? 'Apne organiser account mein login karein' : 'Naya organiser account banayein'}
        </p>

        <form onSubmit={onSubmitHandler}>

          {!isLogin && (
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-2 focus:ring-2 focus:ring-[#1A9E83] focus:border-[#1A9E83]"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-2 focus:ring-2 focus:ring-[#1A9E83] focus:border-[#1A9E83]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-2 focus:ring-2 focus:ring-[#1A9E83] focus:border-[#1A9E83]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A9E83] text-white py-2 px-4 rounded-md hover:bg-[#1A9E83]/90 transition disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
          </button>

          <p className="text-center mt-3 text-sm">
            {isLogin ? "Account nahi hai? " : "Pehle se account hai? "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="cursor-pointer text-[#1A9E83] underline"
            >
              {isLogin ? 'Register' : 'Login'}
            </span>
          </p>

        </form>
      </div>
    </div>
  )
}

export default OrganiserLogin