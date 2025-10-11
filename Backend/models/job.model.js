import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    // Title of the job
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    // Full description of the job
    description: {
      type: String,
      required: [true, "Job description is required"],
    },

    // Company name
    company: {
      type: String,
      required: [true, "Company name is required"],
    },

    // Location (optional)
    location: {
      type: String,
      default: "Remote",
    },

    // Salary (optional)
    salary: {
      type: Number,
      default: 0,
    },

    // Job type: full-time, part-time, internship
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship"],
      default: "Full-Time",
    },

    // Reference to the recruiter who posted the job
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Job status: active or closed
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt automatically
  }
);


export const Job = mongoose.model("Job", jobSchema);