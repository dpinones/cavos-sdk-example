"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";

interface RegistrationData {
  email: string;
  wallet_address: string;
  created_at: string;
}

interface SignInResponse {
  success: boolean;
  message: string;
  access_token: string;
  wallet_address: string;
  email?: string; // Added email to the interface
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: RegistrationData;
}

export default function Home() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoginSuccessModal, setShowLoginSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);
  const [signInData, setSignInData] = useState<SignInResponse | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error/success messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  // Generate random 15-character alphanumeric password
  const generateRandomPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 15; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({
      ...formData,
      password: password,
    });
  };

  // Generate random email address
  const generateRandomEmail = () => {
    const domains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "example.com",
    ];
    const randomString = Math.random().toString(36).substring(2, 10);
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const email = `${randomString}@${randomDomain}`;
    setFormData({
      ...formData,
      email: email,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isLoginForm) {
        // Handle sign in logic using axios
        const response = await axios.post<SignInResponse>(
          "/api/v1/auth/signIn",
          {
            email: formData.email,
            password: formData.password,
            network: "sepolia", // Default network, you can make this configurable
          }
        );

        if (response.data.success) {
          setSignInData(response.data);
          setShowLoginSuccessModal(true);
          // Clear form after successful login
          setFormData({ email: "", password: "" });
        }
      } else {
        // Handle register logic using axios
        const response = await axios.post<ApiResponse>("/api/v1/auth/signUp", {
          email: formData.email,
          password: formData.password,
          network: "sepolia", // Default network, you can make this configurable
        });

        if (response.data.success) {
          setRegistrationData(response.data.data);
          setShowSuccessModal(true);
          // Clear form after successful registration
          setFormData({ email: "", password: "" });
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      let errorMessage = "An error occurred";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message ||
          (isLoginForm ? "Login failed" : "Registration failed");
      }

      setErrorDetails(errorMessage);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setRegistrationData(null);
    // Optionally switch to login form
    setIsLoginForm(true);
  };

  const closeLoginSuccessModal = () => {
    setShowLoginSuccessModal(false);
    setSignInData(null);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorDetails("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
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
      <section id="auth" className="py-32 px-4 sm:px-6 lg:px-8">
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
                    : "text-[#EAE5DC]/60 hover:text-[#EAE5DC] hover:bg-[#EAE5DC]/20"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-heading font-medium text-[#EAE5DC]"
                  >
                    Email Address
                  </label>
                  {!isLoginForm && (
                    <button
                      type="button"
                      onClick={generateRandomEmail}
                      className="text-xs text-[#EAE5DC]/60 hover:text-[#EAE5DC] underline transition-colors"
                    >
                      Generate Random
                    </button>
                  )}
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/50 border border-[#EAE5DC]/30 rounded-xl text-[#EAE5DC] placeholder-[#EAE5DC]/40 focus:outline-none focus:ring-2 focus:ring-[#EAE5DC] focus:border-transparent transition-all duration-300 font-sans text-sm"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-heading font-medium text-[#EAE5DC]"
                  >
                    Password
                  </label>
                  {!isLoginForm && (
                    <button
                      type="button"
                      onClick={generateRandomPassword}
                      className="text-xs text-[#EAE5DC]/60 hover:text-[#EAE5DC] underline transition-colors"
                    >
                      Generate Random
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 bg-black/50 border border-[#EAE5DC]/30 rounded-xl text-[#EAE5DC] placeholder-[#EAE5DC]/40 focus:outline-none focus:ring-2 focus:ring-[#EAE5DC] focus:border-transparent transition-all duration-300 font-sans text-sm"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#EAE5DC]/60 hover:text-[#EAE5DC] transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#EAE5DC] to-[#EAE5DC]/90 text-black font-heading font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:from-[#EAE5DC]/90 hover:to-[#EAE5DC] shadow-lg hover:shadow-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isLoginForm ? "Signing In..." : "Creating Account..."}
                  </div>
                ) : (
                  <>{isLoginForm ? "Sign In" : "Create Account"}</>
                )}
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

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 shadow-2xl max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-[#EAE5DC] mb-2">
                {isLoginForm ? "Login Failed" : "Registration Failed"}
              </h3>
              <p className="text-[#EAE5DC]/60 text-sm">
                {isLoginForm
                  ? "Unable to sign in with the provided credentials."
                  : "Unable to create your account at this time."}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                <h4 className="text-sm font-heading font-medium text-[#EAE5DC] mb-3">
                  Error Details:
                </h4>
                <div className="bg-black/50 rounded-lg p-3 border border-red-500/20">
                  <p className="text-red-400 font-mono text-sm break-all">
                    {errorDetails}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={closeErrorModal}
                className="flex-1 bg-gradient-to-r from-[#EAE5DC] to-[#EAE5DC]/90 text-black font-heading font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:from-[#EAE5DC]/90 hover:to-[#EAE5DC] shadow-lg hover:shadow-xl text-sm"
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  closeErrorModal();
                  setIsLoginForm(!isLoginForm);
                }}
                className="flex-1 bg-transparent border border-[#EAE5DC]/30 text-[#EAE5DC] font-heading font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-[#EAE5DC]/10 text-sm"
              >
                Switch to {isLoginForm ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Success Modal */}
      {showLoginSuccessModal && signInData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#EAE5DC]/10 to-[#EAE5DC]/5 backdrop-blur-xl rounded-2xl p-8 border border-[#EAE5DC]/20 shadow-2xl max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-[#EAE5DC] mb-2">
                Login Successful!
              </h3>
              <p className="text-[#EAE5DC]/60 text-sm">
                Welcome back! You have successfully signed in.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-black/30 rounded-lg p-4 border border-[#EAE5DC]/20">
                <h4 className="text-sm font-heading font-medium text-[#EAE5DC] mb-3">
                  Login Details:
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[#EAE5DC]/60">Email:</span>
                    <span className="text-[#EAE5DC] font-medium">
                      {signInData.email || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#EAE5DC]/60">Network:</span>
                    <span className="text-[#EAE5DC] font-medium">Sepolia</span>
                  </div>
                  <div className="border-t border-[#EAE5DC]/20 pt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#EAE5DC]/60">Wallet Address:</span>
                      <button
                        onClick={() =>
                          copyToClipboard(signInData.wallet_address)
                        }
                        className="text-xs text-[#EAE5DC]/60 hover:text-[#EAE5DC] underline transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 border border-[#EAE5DC]/20">
                      <p className="text-[#EAE5DC] font-mono text-xs break-all">
                        {signInData.wallet_address}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-[#EAE5DC]/20 pt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#EAE5DC]/60">Access Token:</span>
                      <button
                        onClick={() => copyToClipboard(signInData.access_token)}
                        className="text-xs text-[#EAE5DC]/60 hover:text-[#EAE5DC] underline transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 border border-[#EAE5DC]/20">
                      <p className="text-[#EAE5DC] font-mono text-xs break-all">
                        {signInData.access_token.substring(0, 50)}...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={closeLoginSuccessModal}
              className="w-full bg-gradient-to-r from-[#EAE5DC] to-[#EAE5DC]/90 text-black font-heading font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:from-[#EAE5DC]/90 hover:to-[#EAE5DC] shadow-lg hover:shadow-xl text-sm"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && registrationData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#EAE5DC]/10 to-[#EAE5DC]/5 backdrop-blur-xl rounded-2xl p-8 border border-[#EAE5DC]/20 shadow-2xl max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-[#EAE5DC] mb-2">
                User Registered Successfully!
              </h3>
              <p className="text-[#EAE5DC]/60 text-sm">
                Your account has been created successfully.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-black/30 rounded-lg p-4 border border-[#EAE5DC]/20">
                <h4 className="text-sm font-heading font-medium text-[#EAE5DC] mb-3">
                  Registration Details:
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[#EAE5DC]/60">Email:</span>
                    <span className="text-[#EAE5DC] font-medium">
                      {registrationData.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#EAE5DC]/60">Created At:</span>
                    <span className="text-[#EAE5DC] font-medium">
                      {new Date(registrationData.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-[#EAE5DC]/20 pt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#EAE5DC]/60">Wallet Address:</span>
                      <button
                        onClick={() =>
                          copyToClipboard(registrationData.wallet_address)
                        }
                        className="text-xs text-[#EAE5DC]/60 hover:text-[#EAE5DC] underline transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 border border-[#EAE5DC]/20">
                      <p className="text-[#EAE5DC] font-mono text-xs break-all">
                        {registrationData.wallet_address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={closeSuccessModal}
              className="w-full bg-gradient-to-r from-[#EAE5DC] to-[#EAE5DC]/90 text-black font-heading font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:from-[#EAE5DC]/90 hover:to-[#EAE5DC] shadow-lg hover:shadow-xl text-sm"
            >
              Continue to Sign In
            </button>
          </div>
        </div>
      )}

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
