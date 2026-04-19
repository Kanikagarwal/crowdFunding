import React from "react";
import Navbar from '../components/Navbar.jsx'
const History = () => {

  // Dummy data (replace with API later)
  const donations = [
    {
      _id: "1",
      campaign: {
        title: "Help Flood Victims",
        img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
      },
      amount: 500,
      status: "success",
      createdAt: "2026-04-18T10:30:00"
    },
    {
      _id: "2",
      campaign: {
        title: "Education for All",
        img: "https://images.unsplash.com/photo-1509062522246-3755977927d7"
      },
      amount: 1200,
      status: "pending",
      createdAt: "2026-04-15T14:20:00"
    },
    {
      _id: "3",
      campaign: {
        title: "Education for All",
        img: "https://images.unsplash.com/photo-1509062522246-3755977927d7"
      },
      amount: 1200,
      status: "pending",
      createdAt: "2026-04-15T14:20:00"
    }
  ];

  const totalAmount = donations.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-6">
        <Navbar/>
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6 mt-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Donation History
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Track all your contributions 💙
        </p>
      </div>

      {/* Summary Card */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Donated</p>
            <h2 className="text-2xl font-bold text-[#1A9E83]">
              ₹{totalAmount}
            </h2>
          </div>
          <div className="bg-[#1A9E83]/10 text-[#1A9E83] px-3 py-1 rounded-full text-sm">
            {donations.length} Donations
          </div>
        </div>
      </div>

      {/* Donations List */}
      <div className="max-w-5xl mx-auto">
        {donations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
            <p className="text-gray-500">No donations yet</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {donations.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 sm:items-center hover:shadow-md transition"
              >
                {/* Image */}
                <img
                  src={item.campaign.img}
                  alt=""
                  className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800 text-lg">
                    {item.campaign.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Amount + Status */}
                <div className="flex sm:flex-col justify-between sm:items-end items-center">
                  <p className="text-lg font-bold text-[#1A9E83]">
                    ₹{item.amount}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.status === "success"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default History;