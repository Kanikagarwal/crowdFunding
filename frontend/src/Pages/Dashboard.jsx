import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { backendUrl, organiserToken, organiserName } = useContext(AppContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("new");
  const [myCampaigns, setMyCampaigns] = useState([]);

  // ❌ removed img from form
  const [form, setForm] = useState({
    title: "",
    category: "",
    desc: "",
    goal: "",
    days: "",
  });

  // ✅ file state
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchMyCampaigns = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/organiser/my-campaigns`,
        {
          headers: { Authorization: `Bearer ${organiserToken}` },
        },
      );
      if (data.success) {
        setMyCampaigns(data.Object);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (activeTab === "my") {
      fetchMyCampaigns();
    }
  }, [activeTab, backendUrl, organiserToken]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload an image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("desc", form.desc);
      formData.append("goal", Number(form.goal));
      formData.append("days", Number(form.days));
      formData.append("image", file); // 🔥 important

      const { data } = await axios.post(
        `${backendUrl}/api/organiser/campaigns`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${organiserToken}`,
          },
        },
      );

      if (data.success) {
        toast.success("Campaign Added Successfully");
        setForm({ title: "", category: "", desc: "", goal: "", days: "" });
        setFile(null);
        setActiveTab("my");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("This is the error" + error.message);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const handleDelete = async (camp) => {
    const id = camp._id;
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/campaigns/delete-campaign/${id}`,
        {
          headers: {
            Authorization: `Bearer ${organiserToken}`,
          },
        },
      );
      if (data.success) {
        toast.success("Campaign deleted");

        // 🔥 THIS LINE FIXES YOUR ISSUE
        setMyCampaigns((prev) => prev.filter((c) => c._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }

    console.log(camp);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col dark:bg-[#16171d]">
      <Navbar />
      <div className="container mx-auto max-w-4xl py-12 px-4 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
              Welcome back, {organiserName}!
            </p>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === "new"
                ? "bg-[#1A9E83] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Add New Campaign
          </button>

          <button
            onClick={() => setActiveTab("my")}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === "my"
                ? "bg-[#1A9E83] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            My Campaigns
          </button>
        </div>

        {/* NEW CAMPAIGN */}
        {activeTab === "new" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 dark:bg-[#1f2028] dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 dark:text-gray-200">
              Launch a Campaign
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* existing fields */}
                {[
                  {
                    name: "title",
                    label: "Campaign Title",
                    type: "text",
                    placeholder: "e.g. NexHub Smart Controller",
                  },
                  {
                    name: "category",
                    label: "Category",
                    type: "text",
                    placeholder: "e.g. Technology, Film",
                  },
                  {
                    name: "goal",
                    label: "Funding Goal (₹)",
                    type: "number",
                    placeholder: "e.g. 200000",
                  },
                  {
                    name: "days",
                    label: "Days Target",
                    type: "number",
                    placeholder: "e.g. 30",
                  },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      name={f.name}
                      required
                      value={form[f.name]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 text-sm focus:ring-2 focus:ring-[#1A9E83] dark:border-gray-600 dark:bg-[#1a1b22] dark:text-gray-200"
                    />
                  </div>
                ))}

                {/* 🔥 IMAGE INPUT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                    Campaign Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 text-sm focus:ring-2 focus:ring-[#1A9E83] dark:border-gray-600 dark:bg-[#1a1b22] dark:text-gray-200"
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
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  name="desc"
                  required
                  rows={3}
                  value={form.desc}
                  onChange={handleChange}
                  placeholder="Tell your story..."
                  className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm focus:ring-2 focus:ring-[#1A9E83] resize-none dark:border-gray-600 dark:bg-[#1a1b22] dark:text-gray-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-8 bg-[#1A9E83] text-white py-2.5 rounded-md font-semibold hover:bg-[#157a65] transition disabled:opacity-50"
              >
                {loading ? "Adding..." : "Launch Campaign"}
              </button>
            </form>
          </div>
        )}

        {/* MY CAMPAIGNS (unchanged) */}
        {activeTab === "my" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 dark:bg-[#1f2028] dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 dark:text-gray-200">
              Your Performance
            </h2>

            {myCampaigns.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                You haven't launched any campaigns yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                  <thead className="lowercase tracking-wider border-b-2 border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 dark:text-gray-300">Campaign</th>
                      <th className="px-6 py-4 dark:text-gray-300">Goal</th>
                      <th className="px-6 py-4 dark:text-gray-300">Raised</th>
                      <th className="px-6 py-4 dark:text-gray-300">Progress</th>
                      <th className="px-6 py-4 dark:text-gray-300">Days Left</th>
                    </tr>
                  </thead>

                  <tbody>
                    {myCampaigns.map((camp, idx) => {
                      const perc =
                        camp.goal > 0
                          ? Math.min(
                              (camp.raised / camp.goal) * 100,
                              100,
                            ).toFixed(0)
                          : 0;

                      return (
                        <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                            {camp.title}
                          </td>
                          <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                            ₹{camp.goal}
                          </td>
                          <td className="px-6 py-4 text-[#1A9E83] font-semibold">
                            ₹{camp.raised}
                          </td>
                          <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{perc}%</td>
                          <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                            {camp.daysLeft}
                          </td>
                          <td
                            className="px-6 py-4 text-red-300 cursor-pointer"
                            onClick={() => handleDelete(camp)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 6h18M8 6V4h8v2m-9 0l1 14h8l1-14M10 11v6M14 11v6"
                              />
                            </svg>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
