import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { InvoiceModel } from "@/model/invoice.model"; // Adjust path as needed
import { CustomerModel } from "@/model/customer.model"; // Adjust path as needed

export async function POST(req) {
  await dbConnect(); // Connect to your database

  const { data, token } = await req.json(); // Parse the JSON body
  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token provided" },
      { status: 401 }
    );
  }

  const response = NextResponse; // Using NextResponse for consistency
  try {
    const { name, email, contact } = JSON.parse(data);

    // Check if the email already exists
    const isEmailExist = await CustomerModel.findOne({ email });
    if (!isEmailExist) {
      await CustomerModel.create({ name, email, phoneNumber: contact });
    }

    const newData = await InvoiceModel.create({ details: data });
    return response.json({ success: true, data: newData }, { status: 201 });
  } catch (error) {
    console.log(error, "error in creating invoice");
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
