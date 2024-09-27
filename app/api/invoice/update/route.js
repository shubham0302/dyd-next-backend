import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { InvoiceModel } from "@/model/invoice.model"; // Adjust path as needed

export async function POST(req) {
  await dbConnect(); // Connect to your database

  const { id, data, token } = await req.json();

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token provided" },
      { status: 401 }
    );
  }

  const response = NextResponse; // Using NextResponse for consistency
  try {
    const isDataExist = await InvoiceModel.findById(id);
    if (!isDataExist) {
      const newData = await InvoiceModel.create({ details: data });
      return response.json({ success: true, data: newData }, { status: 201 });
    }

    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
      id,
      { details: data },
      { new: true }
    );
    return response.json(
      { success: true, data: updatedInvoice },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "error updating invoice data");
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
