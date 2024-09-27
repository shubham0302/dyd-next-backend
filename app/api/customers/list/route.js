import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { CustomerModel } from "@/model/customer.model"; // Adjust path as needed

export async function POST(req) {
  await dbConnect(); // Connect to your database

  const { token } = await req.json();
  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token provided" },
      { status: 401 }
    );
  }

  const response = NextResponse; // Using NextResponse for consistency
  try {
    const customers = await CustomerModel.find({});
    return response.json({ success: true, data: customers }, { status: 200 });
  } catch (error) {
    console.log(error, "error in fetching customers");
    return response.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
