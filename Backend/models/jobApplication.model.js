import mongoose from "mongoose";

// ✅ Job Application Schema
const jobApplicationSchema = new mongoose.Schema(
  {
    // The job this application is for
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // References Job model
      required: true,
    },

    // The user who applied (must be a jobseeker)
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Resume file URL (e.g., Cloudinary link or file path)
    resume: {
      type: String,
      required: [true, "Resume is required"],
    },

    // Optional cover letter
    coverLetter: {
      type: String,
      default: "",
    },

    // Current status of the application
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

// ✅ Export JobApplication model
export const JobApplication = mongoose.model(
  "JobApplication",
  jobApplicationSchema
);
