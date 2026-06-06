import React from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

const StaticStuff = () => {
  const heroRef = useScrollReveal();
  const cardsRef = useScrollReveal();

  return (
    <>
      <section className="relative overflow-hidden h-[560px] flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="home.jpg"
            alt="People collaborating"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#343434]/60"></div>
        </div>

        {/* Content */}
        <div ref={heroRef} className="container relative z-10 flex flex-col items-center text-center px-4">
          <h1 className="reveal max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Fund the Future You Believe In
          </h1>

          <p className="reveal reveal-delay-1 mt-5 max-w-xl text-lg text-white/80">
            Discover campaigns that change the world — from groundbreaking tech
            to community projects. Your investment starts here.
          </p>

          <div className="reveal reveal-delay-2 mt-8">
            <Link
              to="/all-campaigns"
              className="p-4 bg-[#1A9E83] text-white hover:bg-[#1A9E83]/90 h-11 rounded-full px-8 text-base font-semibold transition"
            >
              Explore Campaigns
            </Link>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white dark:bg-[#16171d]">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
              Why Invest in a Campaign?
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Crowdfunding isn't just about money — it's about believing in
              people, ideas, and the power of community.
            </p>
          </div>

          <div ref={cardsRef} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="reveal reveal-delay-1 group rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:border-gray-700 dark:bg-[#1f2028]">
              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1A9E83]/10 transition group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-[#1A9E83]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                High Growth Potential
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-gray-500 leading-relaxed dark:text-gray-400">
                Back ideas early and be part of the next big thing before anyone
                else.
              </p>
            </div>

            {/* Card 1 */}
            <div className="reveal reveal-delay-2 group rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:border-gray-700 dark:bg-[#1f2028]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1A9E83]/10 transition group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-[#1A9E83]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Trusted & Transparent
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed dark:text-gray-400">
                Every campaign is vetted. Track exactly where your money goes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="reveal reveal-delay-3 group rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:border-gray-700 dark:bg-[#1f2028]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1A9E83]/10 transition group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-[#1A9E83]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Community Driven
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed dark:text-gray-400">
                Join thousands of backers who've helped bring 10,000+ projects
                to life.
              </p>
            </div>

            {/* Card 3 */}
            <div className="reveal reveal-delay-4 group rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:border-gray-700 dark:bg-[#1f2028]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1A9E83]/10 transition group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-[#1A9E83]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Exclusive Rewards
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed dark:text-gray-400">
                Get early-bird pricing, limited editions, and backer-only perks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StaticStuff;
