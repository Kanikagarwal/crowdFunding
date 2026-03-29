import React from "react";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1A9E83]/5 via-[#1a9e84b4]/25 to-white py-16 md:py-32">
      {/* <h1 className="top-heading text-center text-6xl md:text-3xl">Welcome to FundFlow</h1> */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          {/* LEFT CONTENT */}
          <div className="flex-1 space-y-8 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Bring Your <span className="text-[#1A9E83]">Ideas</span> to Life
            </h1>

            <p className="text-xl md:text-xl text-gray-500 max-w-lg mx-auto md:mx-0">
              Join a community of dreamers and backers. Fund projects that
              matter, or launch your own campaign in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {/* USER DASHBOARD BUTTON */}
              <button className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#1A9E83] text-[#FFFFFF] hover:bg-[#1A9E83]/90 h-11 text-base gap-2 px-8 py-6 rounded-xl shadow-lg shadow-[#1A9E83]/25 hover:shadow-xl hover:shadow-[#1A9E83]/30 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                User Dashboard
              </button>

              {/* ADD CAMPAIGN BUTTON */}
              <button className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#F68C25] text-[#FFFFFF] hover:bg-[#F68C25]/90 h-11 text-base gap-2 px-8 py-6 rounded-xl shadow-lg shadow-[#F68C25]/25 hover:shadow-xl hover:shadow-[#F68C25]/30 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 12h8"></path>
                  <path d="M12 8v8"></path>
                </svg>
                Add New Campaign
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex justify-center">
            <img
              src="landing.jpg"
              alt="Community collaborating on crowdfunding ideas"
              width="1024"
              height="768"
              className="w-full max-w-md md:max-w-lg rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* BACKGROUND BLOBS */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#1A9E83]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      <section className="py-16 bg-[#1A9E83] text-white">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <p className="text-3xl md:text-4xl font-bold">12,400+</p>
            <p className="text-sm md:text-base opacity-80">Campaigns Funded</p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-3xl md:text-4xl font-bold">$85M+</p>
            <p className="text-sm md:text-base opacity-80">Total Raised</p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-3xl md:text-4xl font-bold">320K+</p>
            <p className="text-sm md:text-base opacity-80">Happy Backers</p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-3xl md:text-4xl font-bold">98%</p>
            <p className="text-sm md:text-base opacity-80">Success Rate</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose Us
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Everything you need to bring your project from idea to reality.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg border bg-white text-gray-900 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-gray-100">
              <div className="flex flex-col p-6 items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-xl bg-[#1A9E83]/10 flex items-center justify-center group-hover:bg-[#1A9E83] group-hover:text-[#ffffff] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-shield w-7 h-7 text-[#13725F] group-hover:text-[#ffffff] transition-colors"
                  >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold tracking-tight text-lg">
                  Launch Fast
                </h3>
                <p className="text-sm text-gray-500">
                  Set up your campaign in minutes with our intuitive tools.
                </p>
              </div>
            </div>
            <div className="rounded-lg border bg-white text-gray-900 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-gray-100">
              <div className="flex flex-col p-6 items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-xl bg-[#1A9E83]/10 flex items-center justify-center group-hover:bg-[#1A9E83] group-hover:text-[#ffffff] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-shield w-7 h-7 text-[#13725F] group-hover:text-[#ffffff] transition-colors"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold tracking-tight text-lg">
                  Secure &amp; Trusted
                </h3>
                <p className="text-sm text-gray-500">
                  Bank-level security protects every transaction.
                </p>
              </div>
            </div>
            <div className="rounded-lg border bg-white text-gray-900 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-gray-100">
              <div className="flex flex-col p-6 items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-xl bg-[#1A9E83]/10 flex items-center justify-center group-hover:bg-[#1A9E83] group-hover:text-[#ffffff] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-shield w-7 h-7 text-[#13725F] group-hover:text-[#ffffff] transition-colors"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold tracking-tight text-lg">
                  Community Driven
                </h3>
                <p className="text-sm text-muted-foreground">
                  Connect with backers who believe in your vision.
                </p>
              </div>
            </div>
            <div className="rounded-lg border bg-white text-gray-900 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-gray-100">
              <div className="flex flex-col p-6 items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-xl bg-[#1A9E83]/10 flex items-center justify-center group-hover:bg-[#1A9E83] group-hover:text-[#ffffff] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-shield w-7 h-7 text-[#13725F] group-hover:text-[#ffffff] transition-colors"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                </div>
                <h3 className="font-semibold tracking-tight text-lg">
                  Track Progress
                </h3>
                <p className="text-sm text-muted-foreground">
                  Real-time analytics to monitor your campaign growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="py-10 bg-[#081d19] text-[#ffffff]">
      <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p class="font-semibold text-background">FundFlow</p>
        <p>© 2026 FundFlow. All rights reserved.</p>
        </div>
        </footer>
    </div>
  );
};

export default Landing;
