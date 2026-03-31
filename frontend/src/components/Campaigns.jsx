import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Campaigns = () => {
  const { backendUrl } = useContext(AppContext)
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/campaigns`)
        if (data.success) {
          setCampaigns(data.Object)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchCampaigns()
  }, [backendUrl])

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-20">
  <div className="container mx-auto px-4">

    {/* Header */}
    <div className="mb-12 flex items-end justify-between">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Trending Campaigns
        </h2>
        <p className="mt-2 text-gray-500">
          Projects gaining momentum right now
        </p>
      </div>

      <Link to="/all-campaigns" className="hidden sm:inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-gray-100">
        View All
      </Link>
    </div>

    {/* Grid */}
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

      {campaigns.map((item, i) => {
        const percentRaw = item.goal > 0 ? (item.raised / item.goal) * 100 : 0;
        const percent = Math.min(percentRaw, 100).toFixed(0) + "%";

        return (
          <div
            key={i}
            className="group overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            
            {/* Image */}
            <div className="aspect-video overflow-hidden bg-gray-100">
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x225?text=No+Image' }}
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">

              {/* Category */}
              <span className="inline-block rounded-full bg-[#1A9E83]/10 px-3 py-1 text-xs font-medium text-[#1A9E83]">
                {item.category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 line-clamp-2">
                {item.desc}
              </p>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-[#1A9E83] transition-all"
                  style={{ width: percent }}
                ></div>
              </div>

              {/* Stats */}
              <div className="flex justify-between text-sm">
                <div>
                  <span className="font-bold text-[#1A9E83]">
                    ₹{item.raised}
                  </span>
                  <span className="text-gray-400">
                    {" "} / ₹{item.goal}
                  </span>
                </div>
                <span className="text-gray-500">{percent}</span>
              </div>

              {/* Footer */}
              <div className="flex justify-between text-xs text-gray-400">
                <span>{item.backers || 0} backers</span>
                <span>{item.days} days left</span>
              </div>

            </div>
          </div>
        )
      })}

      {campaigns.length === 0 && (
        <div className="col-span-full text-center py-10 text-gray-500">
          No campaigns found. Check back later!
        </div>
      )}

    </div>
  </div>
</section>
  )
}

export default Campaigns
