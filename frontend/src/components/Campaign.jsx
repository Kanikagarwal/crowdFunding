import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Campaign = ({
  id,
  idx,
  img,
  category,
  percent,
  name,
  desc,
  goal,
  raised,
  backers,
  days,
  likes = [],
  comments = [],
}) => {
  const [likesCount, setLikesCount] = useState(likes.length);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (likes.includes(userId)) {
      setLiked(true);
    }
  }, []);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/campaigns/${id}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.success) {
        setLikesCount(data.likeCount);
        setLiked(data.liked);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleShare = async () => {
    const url = `${window.location.origin}/campaign/${id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: name,
          text: desc,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={idx}
      className="group overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:border-gray-700 dark:bg-[#1f2028] dark:shadow-gray-900/20"
    >
      <Link to={`/campaign/${id}`} className="block">
        {/* Image */}
        <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={img}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x225?text=No+Image";
            }}
          />
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Category */}
          <span className="inline-block rounded-full bg-[#1A9E83]/10 px-3 py-1 text-xs font-medium text-[#1A9E83]">
            {category}
          </span>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 leading-tight dark:text-gray-200">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2 dark:text-gray-400">{desc}</p>

          {/* Progress Bar */}
          <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden dark:bg-gray-700">
            <div
              className="h-full bg-[#1A9E83] transition-all"
              style={{ width: percent }}
            ></div>
          </div>

          {/* Stats */}
          <div className="flex justify-between text-sm">
            <div>
              <span className="font-bold text-[#1A9E83]">₹{raised}</span>
              <span className="text-gray-400 dark:text-gray-500"> / ₹{goal}</span>
            </div>

            <span className="text-gray-500 dark:text-gray-400">{percent}</span>
          </div>

          {/* Footer */}
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500">
            <span>{backers || 0} backers</span>
            <span>{days} days left</span>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="border-t px-5 py-4 flex justify-between items-center text-base text-gray-600 dark:text-gray-400 dark:border-gray-700">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 transition font-medium ${
            liked ? "text-red-500" : "text-gray-500 hover:text-red-500 dark:text-gray-400"
          }`}
        >
          <span className="text-xl">❤️</span>
          <span>{likesCount}</span>
        </button>

        {/* <Link
    to={`/campaign/${id}`}
    className="flex items-center gap-2 hover:text-blue-500 transition font-medium"
  >
    <span className="text-xl">💬</span>
    <span>{comments.length}</span>
  </Link> */}

        <button
          onClick={handleShare}
          className="flex items-center gap-2 hover:text-green-500 transition font-medium"
        >
          <span className="text-xl">↗</span>
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(Campaign);
