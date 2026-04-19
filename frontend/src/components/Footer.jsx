import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#081d19] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-10">

        {/* Main Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A9E83]">
              FundFlow
            </h2>

            <p className="text-gray-300 mt-3 text-sm leading-6">
              Helping creators and communities raise funds for ideas that matter.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1A9E83] transition"
              >
                <FaInstagram size={14} />
              </a>

              <a
                href="#"
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1A9E83] transition"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href="#"
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1A9E83] transition"
              >
                <FaTwitter size={14} />
              </a>

              <a
                href="#"
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1A9E83] transition"
              >
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-3">Quick Links</h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-[#1A9E83]">Home</a></li>
              <li><a href="#" className="hover:text-[#1A9E83]">Campaigns</a></li>
              <li><a href="#" className="hover:text-[#1A9E83]">About</a></li>
              <li><a href="#" className="hover:text-[#1A9E83]">Support</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-base font-semibold mb-3">Customer Care</h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-[#1A9E83]">Help Center</a></li>
              <li><a href="#" className="hover:text-[#1A9E83]">Refund Policy</a></li>
              <li><a href="#" className="hover:text-[#1A9E83]">Privacy</a></li>
              <li><a href="#" className="hover:text-[#1A9E83]">Terms</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-base font-semibold mb-3">Contact Us</h3>

            <div className="space-y-3 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-[#1A9E83]" />
                +91 98765 43210
              </p>

              <p className="flex items-center gap-2">
                <FaEnvelope className="text-[#1A9E83]" />
                support@fundflow.com
              </p>

              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-[#1A9E83] mt-1" />
                New Delhi, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-4 text-center text-xs sm:text-sm text-gray-400">
          <p>© 2026 FundFlow. All rights reserved.</p>
          <p className="mt-1">Made with trust for creators & backers.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;