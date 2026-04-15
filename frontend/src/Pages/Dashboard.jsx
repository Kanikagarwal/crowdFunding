import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  const { backendUrl, organiserToken, organiserName } = useContext(AppContext)
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('new')
  const [myCampaigns, setMyCampaigns] = useState([])

  // ❌ removed img from form
  const [form, setForm] = useState({
    title: '', category: '',
    desc: '', goal: '', days: ''
  })

  // ✅ file state
  const [file, setFile] = useState(null)

  const [loading, setLoading] = useState(false)

  const fetchMyCampaigns = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/organiser/my-campaigns`, {
        headers: { Authorization: `Bearer ${organiserToken}` }
      })
      if (data.success) {
        setMyCampaigns(data.Object)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (activeTab === 'my') {
      fetchMyCampaigns()
    }
  }, [activeTab, backendUrl, organiserToken])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) {
      toast.error("Please upload an image")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()

      formData.append("title", form.title)
      formData.append("category", form.category)
      formData.append("desc", form.desc)
      formData.append("goal", Number(form.goal))
      formData.append("days", Number(form.days))
      formData.append("image", file) // 🔥 important

      const { data } = await axios.post(
        `${backendUrl}/api/organiser/campaigns`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${organiserToken}`,
          },
        }
      )

      if (data.success) {
        toast.success('Campaign add ho gayi!')
        setForm({ title: '', category: '', desc: '', goal: '', days: '' })
        setFile(null)
        setActiveTab('my')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log("This is the error" + error.message);
      toast.error('Kuch galat hua')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto max-w-4xl py-12 px-4 flex-1">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, {organiserName}!</p>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'new'
                ? 'bg-[#1A9E83] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Add New Campaign
          </button>

          <button 
            onClick={() => setActiveTab('my')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'my'
                ? 'bg-[#1A9E83] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            My Campaigns
          </button>
        </div>

        {/* NEW CAMPAIGN */}
        {activeTab === 'new' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Launch a Campaign</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* existing fields */}
                {[
                  { name: 'title', label: 'Campaign Title', type: 'text', placeholder: 'e.g. NexHub Smart Controller' },
                  { name: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Technology, Film' },
                  { name: 'goal', label: 'Funding Goal (₹)', type: 'number', placeholder: 'e.g. 200000' },
                  { name: 'days', label: 'Days Target', type: 'number', placeholder: 'e.g. 30' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    <input
                      type={f.type}
                      name={f.name}
                      required
                      value={form[f.name]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 text-sm focus:ring-2 focus:ring-[#1A9E83]"
                    />
                  </div>
                ))}

                {/* 🔥 IMAGE INPUT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 text-sm focus:ring-2 focus:ring-[#1A9E83]"
                  />
                </div>

              </div>

              {/* 🔥 preview */}
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  className="w-32 h-32 object-cover rounded"
                />
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="desc"
                  required
                  rows={3}
                  value={form.desc}
                  onChange={handleChange}
                  placeholder="Tell your story..."
                  className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-2 focus:ring-[#1A9E83] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-8 bg-[#1A9E83] text-white py-2.5 rounded-md font-semibold hover:bg-[#157a65] transition disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Launch Campaign'}
              </button>

            </form>
          </div>
        )}

        {/* MY CAMPAIGNS (unchanged) */}
        {activeTab === 'my' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Performance</h2>

            {myCampaigns.length === 0 ? (
              <p className="text-gray-500">You haven't launched any campaigns yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                  <thead className="lowercase tracking-wider border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Campaign</th>
                      <th className="px-6 py-4">Goal</th>
                      <th className="px-6 py-4">Raised</th>
                      <th className="px-6 py-4">Progress</th>
                      <th className="px-6 py-4">Days Left</th>
                    </tr>
                  </thead>

                  <tbody>
                    {myCampaigns.map((camp, idx) => {
                      const perc = camp.goal > 0
                        ? Math.min((camp.raised / camp.goal) * 100, 100).toFixed(0)
                        : 0

                      return (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="px-6 py-4 font-medium text-gray-900">{camp.title}</td>
                          <td className="px-6 py-4 text-gray-500">₹{camp.goal}</td>
                          <td className="px-6 py-4 text-[#1A9E83] font-semibold">₹{camp.raised}</td>
                          <td className="px-6 py-4 text-gray-500">{perc}%</td>
                          <td className="px-6 py-4 text-gray-500">{camp.daysLeft}</td>
                        </tr>
                      )
                    })}
                  </tbody>

                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard