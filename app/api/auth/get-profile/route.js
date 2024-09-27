import { NextResponse } from "next/server"; // Import NextResponse
import dbConnect from "@/lib/dbConnect";
import User from "@/model/user.model";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY; // Define your secret key in .env

export async function POST(req) {
  await dbConnect(); // Connect to your database

  const { token } = await req.json();

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid token", error: error.message },
      { status: 401 }
    );
  }
}
