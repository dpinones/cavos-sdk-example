import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { email, password, network } = await req.json();

    if (!email || !password || !network) {
      return NextResponse.json(
        { message: "Email, password, and network are required" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/v1/auth/signUp`,
      {
        email: email,
        password: password,
        network: network,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Sign up error:", error);

    return NextResponse.json(
      { message: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
