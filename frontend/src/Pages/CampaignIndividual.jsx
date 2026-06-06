import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const CampaignIndividual = () => {
  const { backendUrl, token, organiserToken, setShowLogin } =
    useContext(AppContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");

  // fetch campaign
  const fetchCampaign = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/campaigns/get-campaign/${id}`,
      );

      if (data.success) {
        setCampaign(data.campaign);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [id]);

  if (!campaign) {
    return <p className="text-center mt-10 dark:text-gray-400">Loading...</p>;
  }

  const completed = campaign.raised >= campaign.goal || campaign.daysLeft <= 0;

  const percent = Math.min(
    100,
    Math.round((campaign.raised / campaign.goal) * 100),
  );

  // Donation Payment

  const handlePayment = async (amt) => {
    if (!token && !organiserToken) {
      setShowLogin(true);
      toast.warning("Please login to donate");
      return;
    }

    if (completed) {
      toast.info("This campaign is already completed 🎉");
      return;
    }

    if (!amt || amt <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/create-order`, {
        amount: amt,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "FundFlow",
        description: "Donation for campaign",
        order_id: data.order.id,

        handler: async function (response) {
          const verifyRes = await axios.post(
            `${backendUrl}/api/user/verify-payment`,
            {
              ...response,
              campaignId: campaign._id,
              amount: amt,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (verifyRes.data.success) {
            toast.success("Donation successful 🎉");
            fetchCampaign();
          } else {
            toast.error("Payment verification failed");
          }
        },

        theme: {
          color: "#1A9E83",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    }
  };

  // Delete Campaign

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/campaigns/delete-campaign/${campaign._id}`,
        {
          headers: {
            Authorization: `Bearer ${organiserToken}`,
          },
        },
      );

      if (data.success) {
        toast.success("Deleted");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#16171d]">
      <Navbar />

      {/* Header */}
      <div className="min-h-32 sm:min-h-40 bg-[#1A9E83] flex items-center justify-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-white text-center px-4">
          {campaign.title}
        </h1>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 py-6 sm:py-8">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow bg-white dark:bg-[#1f2028] animate-fade-in-up">
            <img
              src={campaign.img}
              alt={campaign.title}
              className="w-full h-56 sm:h-80 md:h-[400px] object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x500?text=Campaign+Image";
              }}
            />
          </div>

          {/* Category + Title */}
          <div className="animate-fade-in-up animate-delay-100">
            <span className="inline-block bg-[#1A9E83]/10 text-[#1A9E83] px-3 py-1 rounded-full text-sm">
              {campaign.category}
            </span>

            <h1 className="text-xl sm:text-3xl font-bold mt-3 text-gray-800 dark:text-gray-200 leading-tight">
              {campaign.title}
            </h1>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-[#1f2028] p-4 sm:p-5 rounded-xl shadow-sm dark:shadow-gray-900/20 animate-fade-in-up animate-delay-200">
            <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">About Campaign</h2>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
              {campaign.desc}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1f2028] p-4 sm:p-6 rounded-2xl shadow-md dark:shadow-gray-900/20 space-y-4 lg:sticky lg:top-20 animate-fade-in-up animate-delay-100">
            {/* Raised */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A9E83]">
                ₹{campaign.raised}
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm">
                raised out of ₹{campaign.goal}
              </p>
            </div>

            {/* Progress */}
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1A9E83]"
                style={{ width: `${percent}%` }}
              ></div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">{percent}% funded</p>

            {/* Stats */}
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <span>{campaign.backers || 0} backers</span>
              <span>{campaign.daysLeft} days left</span>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Enter Amount (₹)
              </label>

              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full border border-gray-300 dark:border-gray-600 dark:bg-[#1a1b22] dark:text-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1A9E83] outline-none"
              />
            </div>

            {/* Donate Button */}
            <button
              disabled={completed}
              onClick={() => handlePayment(amount)}
              className={`w-full text-white py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-medium transition ${
                completed
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#1A9E83] hover:bg-[#157a65]"
              }`}
            >
              {completed ? "Campaign Completed" : "Donate Now"}
            </button>

            {/* Delete Button */}
            {organiserToken && (
              <button
                onClick={handleDelete}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg text-sm sm:text-base font-medium transition"
              >
                Delete Campaign
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignIndividual;
