"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(234, 229, 220, 0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Template Info Banner */}
      <div className="fixed top-0 left-0 right-0 bg-[#EAE5DC] text-black z-50 border-b border-black/20">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-center text-sm font-medium">
            <span className="mr-2">🚀</span>
            <span>
              This is an AEGIS CAVOS Template - Use this to integrate secure
              authentication into your app
            </span>
            <span className="ml-2">🚀</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-12 w-full bg-black/80 backdrop-blur-xl z-40 border-b border-[#EAE5DC]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Image
                src="/CavosLogo.png"
                alt="Cavos Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <h1 className="text-2xl font-heading font-bold text-[#EAE5DC]">
                AEGIS CAVOS
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-6">
                <a
                  href="#home"
                  className="text-[#EAE5DC] hover:text-[#EAE5DC]/80 transition-colors px-4 py-2 rounded-lg font-medium"
                >
                  Home
                </a>
                <a
                  href="#auth"
                  className="text-[#EAE5DC] hover:text-[#EAE5DC]/80 transition-colors px-4 py-2 rounded-lg font-medium"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-44 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#EAE5DC]/10 border border-[#EAE5DC]/20 text-[#EAE5DC] font-medium text-sm mb-6">
                <span className="w-2 h-2 bg-[#EAE5DC] rounded-full mr-2 animate-pulse"></span>
                AEGIS CAVOS Integration Template
              </div>
            </div>
            <h1 className="text-5xl sm:text-7xl font-heading font-bold text-white mb-8 leading-tight">
              <span className="text-[#EAE5DC]/20 block">INVISIBLE</span>
              <span className="text-[#EAE5DC] relative">
                CRYPTO INFRASTRUCTURE
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-[#EAE5DC]/80 mb-8 max-w-4xl mx-auto leading-relaxed">
              This template demonstrates how to integrate AEGIS CAVOS secure
              authentication and crypto infrastructure into your application.
              Use this as a starting point for your own implementation.
            </p>

            {/* Template Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-[#EAE5DC]/10 to-[#EAE5DC]/5 border border-[#EAE5DC]/20 rounded-xl p-6">
                <h3 className="text-lg font-heading font-bold text-[#EAE5DC] mb-2">
                  Ready to Use
                </h3>
                <p className="text-[#EAE5DC]/80 text-sm">
                  Pre-configured authentication forms and styling
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#EAE5DC]/10 to-[#EAE5DC]/5 border border-[#EAE5DC]/20 rounded-xl p-6">
                <h3 className="text-lg font-heading font-bold text-[#EAE5DC] mb-2">
                  Easy Integration
                </h3>
                <p className="text-[#EAE5DC]/80 text-sm">
                  Simple API calls to AEGIS CAVOS backend
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#EAE5DC]/10 to-[#EAE5DC]/5 border border-[#EAE5DC]/20 rounded-xl p-6">
                <h3 className="text-lg font-heading font-bold text-[#EAE5DC] mb-2">
                  Customizable
                </h3>
                <p className="text-[#EAE5DC]/80 text-sm">
                  Modify colors, fonts, and layout to match your brand
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-[#EAE5DC] text-black font-heading font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-[#EAE5DC]/90">
                Get Started
              </button>
              <button className="border-2 border-[#EAE5DC] text-[#EAE5DC] hover:bg-[#EAE5DC]/10 font-heading font-bold py-4 px-8 rounded-lg transition-all duration-300">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Guide Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#EAE5DC] mb-6">
              How to Use This Template
            </h2>
            <p className="text-lg text-[#EAE5DC]/80 max-w-2xl mx-auto">
              Follow these steps to integrate AEGIS CAVOS into your application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#EAE5DC]/10 to-[#EAE5DC]/5 border border-[#EAE5DC]/20 rounded-2xl p-8">
              <h3 className="text-xl font-heading font-bold text-[#EAE5DC] mb-4">
                1. Setup Backend
              </h3>
              <div className="space-y-3 text-[#EAE5DC]/80 text-sm">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-[#EAE5DC] rounded-full mr-3"></span>
                  Configure AEGIS CAVOS API endpoints
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-[#EAE5DC] rounded-full mr-3"></span>
                  Set up authentication routes
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-[#EAE5DC] rounded-full mr-3"></span>
                  Configure environment variables
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#EAE5DC]/10 to-[#EAE5DC]/5 border border-[#EAE5DC]/20 rounded-2xl p-8">
              <h3 className="text-xl font-heading font-bold text-[#EAE5DC] mb-4">
                2. Customize Frontend
              </h3>
              <div className="space-y-3 text-[#EAE5DC]/80 text-sm">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-[#EAE5DC] rounded-full mr-3"></span>
                  Update branding and colors
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-[#EAE5DC] rounded-full mr-3"></span>
                  Modify form fields as needed
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-[#EAE5DC] rounded-full mr-3"></span>
                  Connect to your API endpoints
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section id="auth" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-[#EAE5DC]/10 to-[#EAE5DC]/5 backdrop-blur-xl rounded-2xl p-8 border border-[#EAE5DC]/20 shadow-2xl">
            <div className="text-center mb-8">
              <Image
                src="/CavosLogo.png"
                alt="Cavos Logo"
                width={60}
                height={60}
                className="w-15 h-15 mx-auto mb-4"
              />
              <h2 className="text-2xl font-heading font-bold text-[#EAE5DC]">
                Template Authentication
              </h2>
              <p className="text-[#EAE5DC]/60 mt-2">
                Demo login/register functionality
              </p>
            </div>

            <div className="flex mb-8 rounded-xl overflow-hidden bg-black/20">
              <button
                onClick={() => setIsLoginForm(true)}
                className={`flex-1 py-3 px-6 font-heading font-medium transition-all duration-300 ${
                  isLoginForm
                    ? "bg-[#EAE5DC] text-black"
                    : "text-[#EAE5DC]/60 hover:text-[#EAE5DC] hover:bg-[#EAE5DC]/10"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLoginForm(false)}
                className={`flex-1 py-3 px-6 font-heading font-medium transition-all duration-300 ${
                  !isLoginForm
                    ? "bg-[#EAE5DC] text-black"
                    : "text-[#EAE5DC]/60 hover:text-[#EAE5DC] hover:bg-[#EAE5DC]/10"
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLoginForm && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-heading font-medium text-[#EAE5DC] mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-[#EAE5DC]/30 rounded-xl text-[#EAE5DC] placeholder-[#EAE5DC]/40 focus:outline-none focus:ring-2 focus:ring-[#EAE5DC] focus:border-transparent transition-all duration-300 font-sans"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-heading font-medium text-[#EAE5DC] mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/50 border border-[#EAE5DC]/30 rounded-xl text-[#EAE5DC] placeholder-[#EAE5DC]/40 focus:outline-none focus:ring-2 focus:ring-[#EAE5DC] focus:border-transparent transition-all duration-300 font-sans"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-heading font-medium text-[#EAE5DC] mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/50 border border-[#EAE5DC]/30 rounded-xl text-[#EAE5DC] placeholder-[#EAE5DC]/40 focus:outline-none focus:ring-2 focus:ring-[#EAE5DC] focus:border-transparent transition-all duration-300 font-sans"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {!isLoginForm && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-heading font-medium text-[#EAE5DC] mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-[#EAE5DC]/30 rounded-xl text-[#EAE5DC] placeholder-[#EAE5DC]/40 focus:outline-none focus:ring-2 focus:ring-[#EAE5DC] focus:border-transparent transition-all duration-300 font-sans"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#EAE5DC] text-black font-heading font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:bg-[#EAE5DC]/90"
              >
                {isLoginForm ? "Sign In" : "Create Account"}
              </button>
            </form>

            {isLoginForm && (
              <p className="text-center text-[#EAE5DC]/60 text-sm mt-6 font-sans">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setIsLoginForm(false)}
                  className="text-[#EAE5DC] hover:text-[#EAE5DC]/80 underline font-medium transition-colors"
                >
                  Sign up
                </button>
              </p>
            )}

            <div className="mt-6 p-4 bg-black/30 rounded-lg border border-[#EAE5DC]/20">
              <p className="text-[#EAE5DC]/60 text-xs text-center">
                <strong>Template Note:</strong> This form demonstrates the UI.
                Connect it to your AEGIS CAVOS backend API endpoints for full
                functionality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-[#EAE5DC]/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image
                src="/CavosLogo.png"
                alt="Cavos Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-[#EAE5DC] font-heading font-bold">
                AEGIS CAVOS Template
              </span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[#EAE5DC]/60 text-sm">
                &copy; 2024 AEGIS CAVOS. Template for secure app integration.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
