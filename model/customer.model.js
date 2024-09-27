import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const CustomerModel =
  mongoose.models.Customer || mongoose.model("Customer", CustomerSchema); // Use existing model if it exists

export { CustomerModel };
