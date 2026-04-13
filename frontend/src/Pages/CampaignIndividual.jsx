import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CampaignIndividual = () => {
  const {backendUrl} = useContext(AppContext);
  const { state } = useLocation();
  const campaign = state?.campaign;

  if (!campaign) {
    return <p className="text-center mt-10">Campaign not found</p>;
  }

  const percent = Math.min(
    100,
    Math.round((campaign.raised / campaign.goal) * 100)
  );

  const handlePayment = async(amt,campaignId)=>{
const {data} = await axios.post(`${backendUrl}/api/user/create-order`,{amount:amt});
const order = data.order; 
const options = {
  key:import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount:order.amount,
  currency:order.currency,
  name:"FundFLow",
  description:"Donation for campaign",
  order_id:order.id,
  handler:async function(response){
    const verifyRes = await axios.post(`${backendUrl}/api/user/verify-payment`,{
      ...response,
      campaignId,
      amount:amt
    })
    if(verifyRes.data.success){
      alert("Donation successful! Thank you for your support.");
    } else {
      alert("Payment verification failed. Please contact support.");
    }
  },
  theme:{
    color:"#1A9E83"
  }
}
const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <div className="min-h-40 bg-[#1A9E83] flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">{campaign.name}</h1>
        </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow">
            <img
              src={campaign.img}
              alt={campaign.name}
              className="w-full h-[250px] sm:h-[400px] object-cover"
            />
          </div>

          {/* Title */}
          <div>
            <span className="inline-block bg-[#1A9E83]/10 text-[#1A9E83] px-3 py-1 rounded-full text-sm">
              {campaign.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold mt-3 text-gray-800">
              {campaign.name}
            </h1>
          </div>

          {/* Description */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-2">About Campaign</h2>
            <p className="text-gray-600 leading-relaxed">
              {campaign.desc}
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">

          <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 sticky top-20">

            {/* Amount */}
            <div>
              <h2 className="text-2xl font-bold text-[#1A9E83]">
                ₹{campaign.raised}
              </h2>
              <p className="text-gray-500 text-sm">
                raised out of ₹{campaign.goal}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1A9E83]"
                style={{ width: `${percent}%` }}
              ></div>
            </div>

            <p className="text-sm text-gray-500">{percent}% funded</p>

            {/* Stats */}
            <div className="flex justify-between text-sm text-gray-600">
              <span>{campaign.backers || 0} backers</span>
              <span>{campaign.days} days left</span>
            </div>

            {/* Donate Button */}
            <button onClick={()=>handlePayment(10,campaign._id)} className="w-full bg-[#1A9E83] hover:bg-[#157a65] text-white py-3 rounded-lg font-medium transition">
              Donate Now
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CampaignIndividual;