import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Cors from "cors";

export async function POST(req) {
  await dbConnect();

  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return NextResponse.json({ success: true, token }, { status: 200 });
  } catch (error) {
    console.log(error, "Error in login");
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
