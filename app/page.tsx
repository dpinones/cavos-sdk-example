"use client";

import { useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import axios from "axios";
import LoginForm from "../components/LoginForm";
import { userAtom, isAuthenticatedAtom, signInAtom, signOutAtom } from "../lib/auth-atoms";
import type { ContractExecutionResult, SignInResponse } from "../lib/types";

export default function Home() {
  const user = useAtomValue(userAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const signIn = useSetAtom(signInAtom);
  const signOut = useSetAtom(signOutAtom);

  const [isExecuting, setIsExecuting] = useState(false);
  const [message, setMessage] = useState("");
  const [contractResult, setContractResult] =
    useState<ContractExecutionResult | null>(null);

  const handleExecuteContract = async () => {
    if (!user?.access_token) return;

    setIsExecuting(true);
    setMessage("");

    try {
      const response = await axios.post("/api/v1/execute", {
        walletAddress: user.wallet_address,
        network: user.network,
        accessToken: user.access_token,
        calls: [
          {
            contractAddress:
              "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
            entrypoint: "approve",
            calldata: [
              "0x1234567890123456789012345678901234567890",
              "500000000000000000",
              "0",
            ],
          },
        ],
      });

      setContractResult(response.data);
      setMessage("Contract executed successfully!");
    } catch (error) {
      let errorMessage = "Contract execution failed";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || "Contract execution failed";
      }
      setMessage(errorMessage);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSignIn = (signInResponse: SignInResponse) => {
    signIn(signInResponse);
  };

  const handleSignOut = () => {
    signOut();
    setContractResult(null);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isAuthenticated && user ? (
          // Dashboard/Contract Execution
          <div className="space-y-6">
            {/* User Info */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">Dashboard</h2>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Sign Out
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Network:</span> {user.network}
                </div>
                <div>
                  <span className="text-gray-600">Wallet:</span>{" "}
                  <span className="font-mono text-xs break-all">
                    {user.wallet_address}
                  </span>
                </div>
              </div>
            </div>

            {/* Contract Execution */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-lg font-semibold mb-4">Execute Contract</h3>
              
              {message && (
                <div className={`mb-4 p-3 rounded text-sm ${
                  message.includes("success") 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {message}
                </div>
              )}

              <button
                onClick={handleExecuteContract}
                disabled={isExecuting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExecuting ? "Executing..." : "Execute Contract"}
              </button>

              {contractResult && (
                <div className="mt-4 p-3 bg-gray-50 rounded border">
                  <h4 className="text-sm font-medium mb-2">Result:</h4>
                  <pre className="text-xs overflow-auto whitespace-pre-wrap">
                    {JSON.stringify(contractResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Login Form
          <LoginForm onSignIn={handleSignIn} />
        )}
      </div>
    </div>
  );
}
