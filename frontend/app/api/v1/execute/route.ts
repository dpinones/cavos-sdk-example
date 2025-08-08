import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { walletAddress, network, accessToken, calls } = await req.json();

    if (!walletAddress || !network || !accessToken || !calls) {
      return NextResponse.json(
        {
          message:
            "Wallet address, network, access token, and calls are required",
        },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/v1/execute`,
      {
        walletAddress,
        network,
        accessToken,
        calls,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Execute error:", error);

    // Handle axios errors properly
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Backend service error",
          status: error.response?.status || 500,
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
