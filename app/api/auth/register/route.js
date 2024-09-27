import { NextResponse } from "next/server"; // Import NextResponse
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/model/user.model";

const SECRET_KEY = process.env.SECRET_KEY; // Define your secret key in .env

export async function POST(req) {
  await dbConnect(); // Connect to your database

  const { email, password } = await req.json();

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Generate a token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

    // Return success response with token
    return NextResponse.json({ success: true, token }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "User creation failed", error: error.message },
      { status: 500 }
    );
  }
}
