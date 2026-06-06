import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Campaign from "./Campaign";
import useScrollReveal from "../hooks/useScrollReveal";

const Campaigns = () => {
  const { backendUrl } = useContext(AppContext);
  const [campaigns, setCampaigns] = useState([]);
  const sectionRef = useScrollReveal();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/campaigns`);

        if (data.success) {
          setCampaigns(data.Object);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCampaigns();
  }, [backendUrl]);

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-20 dark:border-gray-700 dark:bg-[#16171d]">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="reveal text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-100">
              Trending Campaigns
            </h2>

            <p className="reveal reveal-delay-1 mt-2 text-gray-500 dark:text-gray-400">
              Projects gaining momentum right now
            </p>
          </div>

          <Link
            to="/all-campaigns"
            className="hidden sm:inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.slice(0, 6).map((item, i) => {
            const percentRaw =
              item.goal > 0 ? (item.raised / item.goal) * 100 : 0;

            const percent = Math.min(percentRaw, 100).toFixed(0) + "%";

            return (
              <div key={item._id} className={`reveal reveal-delay-${(i % 3) + 1}`}>
                <Campaign
                  id={item._id}
                  idx={i}
                  img={item.img}
                  category={item.category}
                  name={item.title}
                  desc={item.desc}
                  percent={percent}
                  goal={item.goal}
                  raised={item.raised}
                  backers={item.backers}
                  days={item.daysLeft}
                  likes={item.likes || []}
                  comments={item.comments || []}
                />
              </div>
            );
          })}

          {campaigns.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
              No campaigns found. Check back later!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Campaigns;
