import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar.jsx";
import { AppContext } from "../context/AppContext.jsx";
const History = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { backendUrl } = useContext(AppContext);
  const totalAmount = donations.reduce(
    (acc, item) => acc + (item.amount || 0),
    0,
  );

  //  const fetchHistory = async () => {
  //   console.log("Fetching history...");
  //     try {
  //       const res = await axios.get(`${backendUrl}/api/user/history`, {
  //         headers: {
  //           token: localStorage.getItem("userToken")
  //         }
  //       });

  //       if (res.data.success) {
  //         console.log(res.data);

  //         setDonations(res.data.donations);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     finally {
  //     setLoading(false);
  //   }
  //   };
  const fetchHistory = async () => {
    console.log("STEP 1: function called");

    try {
      console.log("STEP 2: before API");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/history`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      console.log("STEP 3: API success", res.data);

      if (res.data.success) {
        setDonations(res.data.donations);
      }
    } catch (err) {
      console.log("STEP 4: ERROR", err.response || err.message);
    } finally {
      console.log("STEP 5: finished");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, []);
  return loading ? (
    <div className="min-h-screen bg-gray-50 dark:bg-[#16171d] px-4 sm:px-8 py-6">
      <Navbar />
      <p className="dark:text-gray-400">Loading...</p>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50 dark:bg-[#16171d] px-4 sm:px-8 py-6">
      <Navbar />
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6 mt-6 animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
          Donation History
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Track all your contributions 💙
        </p>
      </div>

      {/* Summary Card */}
      <div className="max-w-5xl mx-auto mb-6 animate-fade-in-up animate-delay-100">
        <div className="bg-white dark:bg-[#1f2028] rounded-xl shadow-sm dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700 p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Donated</p>
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
          <div className="text-center py-20 bg-white dark:bg-[#1f2028] rounded-xl shadow-sm border dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No donations yet</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {donations.map((item, index) => (
              <div
                key={item._id}
                className="bg-white dark:bg-[#1f2028] rounded-xl shadow-sm dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row gap-4 sm:items-center hover:shadow-md transition animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Image */}
                <img
                  src={item.campaignId?.img}
                  alt=""
                  loading="lazy"
                  className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                    {item.campaignId?.title}
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
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
