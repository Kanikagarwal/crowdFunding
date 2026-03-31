import React from 'react'

const Campaigns = () => {
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

      <button className="hidden sm:inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-gray-100">
        View All
      </button>
    </div>

    {/* Grid */}
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

      {/* Card */}
      {[
        {
          title: "NexHub — Smart Home Controller",
          category: "Technology",
          img: "c1.jpg",
          desc: "A beautifully designed hub that unifies all your smart devices into one seamless experience.",
          raised: "$142,500",
          goal: "$200,000",
          percent: "71%",
          backers: "1843",
          days: "18 days left"
        },
        {
          title: "PureFlow Eco Bottle",
          category: "Sustainability",
          img: "c2.jpg",
          desc: "Self-filtering, biodegradable water bottle made from 100% plant-based materials.",
          raised: "$87,300",
          goal: "$50,000",
          percent: "100%",
          backers: "3210",
          days: "6 days left"
        },
        {
          title: "Echoes — An Indie Film",
          category: "Film",
          img: "c3.jpg",
          desc: "A gripping psychological thriller exploring memory and identity.",
          raised: "$34,000",
          goal: "$120,000",
          percent: "28%",
          backers: "612",
          days: "29 days left"
        }
      ].map((item, i) => (
        <div
          key={i}
          className="group overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
        >
          
          {/* Image */}
          <div className="aspect-video overflow-hidden">
            <img
              src={item.img}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                style={{ width: item.percent }}
              ></div>
            </div>

            {/* Stats */}
            <div className="flex justify-between text-sm">
              <div>
                <span className="font-bold text-[#1A9E83]">
                  {item.raised}
                </span>
                <span className="text-gray-400">
                  {" "} / {item.goal}
                </span>
              </div>
              <span className="text-gray-500">{item.percent}</span>
            </div>

            {/* Footer */}
            <div className="flex justify-between text-xs text-gray-400">
              <span>{item.backers} backers</span>
              <span>{item.days}</span>
            </div>

          </div>
        </div>
      ))}

    </div>
  </div>
</section>
  )
}

export default Campaigns
