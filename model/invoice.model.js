import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const InvoiceModel =
  mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema); // Use existing model if it exists

export { InvoiceModel };
