// models/User.js
import mongoose from "mongoose";

// ✅ User Schema for Job Portal
// Roles: jobseeker | recruiter | admin (admin not public)
const userSchema = new mongoose.Schema(
  {
    // Full name of the user
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true, // Optional: removes extra spaces from start & end
    },

    // Unique email for login and communication
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // ensures email is stored in lowercase
    },

    // Hashed password (will be hidden by default in queries)
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // 🔒 hides password field when fetching user
    },

    // Role determines access level
    role: {
      type: String,
      enum: ["jobseeker", "recruiter", "admin"],
      default: "jobseeker",
    },

    // Profile picture URL (uploaded via Cloudinary)
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Export User model
export const User = mongoose.model("User", userSchema);
