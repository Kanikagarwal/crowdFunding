import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Navbar from '../components/Navbar'

const AllCampaigns = () => {
  const { backendUrl } = useContext(AppContext)
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const query = searchParams.get("search") || ""
  
  const [filterCategory, setFilterCategory] = useState("All")
  
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`${backendUrl}/api/campaigns`)
        if (data.success) {
          setCampaigns(data.Object)
        }
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchCampaigns()
  }, [backendUrl])

  // Get unique categories
  const categories = ["All", ...new Set(campaigns.map(c => c.category))]

  // Apply filters
  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(query.toLowerCase()) || 
                          c.category.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = filterCategory === "All" || c.category === filterCategory;
    return matchesSearch && matchesCategory;
  })

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-[#1A9E83] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Discover Campaigns</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Explore {campaigns.length} innovative projects from creators around the world.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                filterCategory === cat 
                  ? 'bg-[#1A9E83] text-white shadow-md' 
                  : 'bg-white border text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Info */}
        {query && (
          <p className="mb-6 text-gray-500">
            Showing results for: <span className="font-semibold text-gray-900">"{query}"</span>
          </p>
        )}

        {loading ? (
          <div className="text-center py-20">Loading campaigns...</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCampaigns.map((item, i) => {
              const percentRaw = item.goal > 0 ? (item.raised / item.goal) * 100 : 0;
              const percent = Math.min(percentRaw, 100).toFixed(0) + "%";

              return (
                <div key={i} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={item.img} alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x225?text=No+Image' }}
                    />
                  </div>
                  <div className="p-5 space-y-3">
                    <span className="inline-block rounded-full bg-[#1A9E83]/10 px-3 py-1 text-xs font-medium text-[#1A9E83]">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {item.desc}
                    </p>
                    <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full bg-[#1A9E83]" style={{ width: percent }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="font-bold text-[#1A9E83]">₹{item.raised}</span>
                        <span className="text-gray-400"> / ₹{item.goal}</span>
                      </div>
                      <span className="text-gray-500">{percent}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{item.backers || 0} backers</span>
                      <span>{item.days} days left</span>
                    </div>
                  </div>
                </div>
              )
            })}
            {filteredCampaigns.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-500">
                No campaigns match your filters.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default AllCampaigns
