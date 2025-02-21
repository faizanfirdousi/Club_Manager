import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navbar />

      <div className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {" "}
                Touch{" "}
              </span>
            </h1>
            <p className="text-gray-300 text-lg">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl animate-fadeIn">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg 
                             text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                             focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg 
                             text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                             focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/30 rounded-lg 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 text-base font-semibold rounded-full bg-gradient-to-r 
                           from-purple-500 to-indigo-600 text-white hover:shadow-lg 
                           hover:shadow-purple-500/50 transform hover:scale-105 
                           transition-all duration-300 focus:ring-2 focus:ring-purple-500/50"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center animate-fadeIn">
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm">
              <div className="text-purple-400 mb-4">
                <svg
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Email</h3>
              <p className="text-gray-300 mt-2">support@kaizen.com</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm">
              <div className="text-purple-400 mb-4">
                <svg
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Location</h3>
              <p className="text-gray-300 mt-2">Mumbai, India</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm">
              <div className="text-purple-400 mb-4">
                <svg
                  className="w-8 h-8 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Phone</h3>
              <p className="text-gray-300 mt-2">+91 123-456-7890</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </div>
  );
}

export default Contact;
