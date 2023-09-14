import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verification_token: {
      type: String,
      required: true,
    },
    verification_code: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
    },
    passwordResetToken: { 
      type: String,
      default: null, 
    },
    passwordResetTokenExpiration: { 
      type: Date,
      default: null, 
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
