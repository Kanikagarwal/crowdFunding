import React from 'react'
import { Link } from 'react-router-dom';

const Campaign = ({ id,idx,img, category,percent, name, desc, goal, raised, backers, days }) => {
    const campaign = { id, img, category, percent, name, desc, goal, raised, backers, days };
  return (
    
          <div
            key={idx}
            className="group overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <Link to={`/campaign/${id}`} className="block">
            {/* Image */}
            <div className="aspect-video overflow-hidden bg-gray-100">
              <img
                src={img}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x225?text=No+Image' }}
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">

              {/* Category */}
              <span className="inline-block rounded-full bg-[#1A9E83]/10 px-3 py-1 text-xs font-medium text-[#1A9E83]">
                {category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                {name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 line-clamp-2">
                {desc}
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
                    ₹{raised}
                  </span>
                  <span className="text-gray-400">
                    {" "} / ₹{goal}
                  </span>
                </div>
                <span className="text-gray-500">{percent}</span>
              </div>

              {/* Footer */}
              <div className="flex justify-between text-xs text-gray-400">
                <span>{backers || 0} backers</span>
                <span>{days} days left</span>
              </div>

            </div>
            </Link>
          </div>
        )
}

export default Campaign
