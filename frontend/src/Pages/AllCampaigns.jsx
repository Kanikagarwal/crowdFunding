import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Navbar from '../components/Navbar'

import Campaign from '../components/Campaign'

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
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 mt-2">
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-4">
            {filteredCampaigns.map((item, i) => {
              const percentRaw = item.goal > 0 ? (item.raised / item.goal) * 100 : 0;
              const percent = Math.min(percentRaw, 100).toFixed(0) + "%";
              return(

                <Campaign
                id={item._id}
                  idx={i}
                  img={item.img}
                  category={item.category}
                  percent={percent}
                  name={item.title}
                  desc={item.desc}
                  goal={item.goal}
                  raised={item.raised}
                  backers={item.backers}
                  days={item.daysLeft}
                />
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
