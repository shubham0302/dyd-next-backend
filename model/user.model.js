import mongoose from "mongoose";

// Check if the User model is already defined
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
