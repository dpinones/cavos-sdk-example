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

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-xl z-40 border-b border-[#EAE5DC]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/CavosLogo.png"
                alt="Cavos Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <h1 className="text-xl font-heading font-bold text-[#EAE5DC]">
                AEGIS CAVOS
              </h1>
            </div>
            <div className="flex items-center">
              <a
                href="https://docs.cavos.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-[#EAE5DC]/10 border border-[#EAE5DC]/20 rounded-lg text-[#EAE5DC] hover:bg-[#EAE5DC]/20 transition-all duration-300 font-medium text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span>Documentation</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Authentication Section */}
      <section id="auth" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-[#EAE5DC]/10 to-[#EAE5DC]/5 backdrop-blur-xl rounded-2xl p-8 border border-[#EAE5DC]/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#EAE5DC]/20 to-[#EAE5DC]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image
                  src="/CavosLogo.png"
                  alt="Cavos Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <h2 className="text-2xl font-heading font-bold text-[#EAE5DC] mb-2">
                Welcome Back
              </h2>
              <p className="text-[#EAE5DC]/60 text-sm">
                Sign in to access your account
              </p>
            </div>

            <div className="flex mb-8 rounded-xl overflow-hidden bg-black/20 border border-[#EAE5DC]/10">
              <button
                onClick={() => setIsLoginForm(true)}
                className={`flex-1 py-3 px-4 font-heading font-medium transition-all duration-300 text-sm ${
                  isLoginForm
                    ? "bg-[#EAE5DC] text-black shadow-lg"
                    : "text-[#EAE5DC]/60 hover:text-[#EAE5DC] hover:bg-[#EAE5DC]/10"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLoginForm(false)}
                className={`flex-1 py-3 px-4 font-heading font-medium transition-all duration-300 text-sm ${
                  !isLoginForm
                    ? "bg-[#EAE5DC] text-black shadow-lg"
                    : "text-[#EAE5DC]/60 hover:text-[#EAE5DC] hover:bg-[#EAE5DC]/10"
                }`}
              >
                Sign Up
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
                    className="w-full px-4 py-3 bg-black/50 border border-[#EAE5DC]/30 rounded-xl text-[#EAE5DC] placeholder-[#EAE5DC]/40 focus:outline-none focus:ring-2 focus:ring-[#EAE5DC] focus:border-transparent transition-all duration-300 font-sans text-sm"
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
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/50 border border-[#EAE5DC]/30 rounded-xl text-[#EAE5DC] placeholder-[#EAE5DC]/40 focus:outline-none focus:ring-2 focus:ring-[#EAE5DC] focus:border-transparent transition-all duration-300 font-sans text-sm"
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
                  className="w-full px-4 py-3 bg-black/50 border border-[#EAE5DC]/30 rounded-xl text-[#EAE5DC] placeholder-[#EAE5DC]/40 focus:outline-none focus:ring-2 focus:ring-[#EAE5DC] focus:border-transparent transition-all duration-300 font-sans text-sm"
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
                    className="w-full px-4 py-3 bg-black/50 border border-[#EAE5DC]/30 rounded-xl text-[#EAE5DC] placeholder-[#EAE5DC]/40 focus:outline-none focus:ring-2 focus:ring-[#EAE5DC] focus:border-transparent transition-all duration-300 font-sans text-sm"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#EAE5DC] to-[#EAE5DC]/90 text-black font-heading font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:from-[#EAE5DC]/90 hover:to-[#EAE5DC] shadow-lg hover:shadow-xl text-sm"
              >
                {isLoginForm ? "Sign In" : "Create Account"}
              </button>
            </form>

            {isLoginForm && (
              <p className="text-center text-[#EAE5DC]/60 text-xs mt-6 font-sans">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setIsLoginForm(false)}
                  className="text-[#EAE5DC] hover:text-[#EAE5DC]/80 underline font-medium transition-colors"
                >
                  Sign up
                </button>
              </p>
            )}

            <div className="mt-6 p-4 bg-black/30 rounded-xl border border-[#EAE5DC]/20">
              <p className="text-[#EAE5DC]/60 text-xs text-center">
                <strong>Secure:</strong> Your data is protected with
                enterprise-grade encryption.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black/40 border-t border-[#EAE5DC]/20 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-3 md:mb-0">
              <Image
                src="/CavosLogo.png"
                alt="Cavos Logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-[#EAE5DC] font-heading font-bold text-sm">
                AEGIS CAVOS Template
              </span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[#EAE5DC]/60 text-xs">
                &copy; 2024 AEGIS CAVOS. SDK integration template.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
