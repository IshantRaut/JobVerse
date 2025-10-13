import { JobApplication } from "../models/jobApplication.model.js";
import { Job } from "../models/job.model.js";

// -------------------------------------------------------------
// 1️⃣ Apply for a Job (Jobseeker only)
// -------------------------------------------------------------
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { resume, coverLetter } = req.body;

    // ✅ Step 1: Validate job existence
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // ✅ Step 2: Prevent duplicate applications
    const existing = await JobApplication.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // ✅ Step 3: Create a new job application
    const newApplication = new JobApplication({
      job: jobId,
      applicant: req.user._id,
      resume,
      coverLetter,
    });

    await newApplication.save();

    // ✅ Step 4: Return success response
    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    console.error("Error applying for job:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while applying for job",
    });
  }
};

// -------------------------------------------------------------
// 2️⃣ Get All Applications of Logged-in Jobseeker
// -------------------------------------------------------------
export const getMyApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({ applicant: req.user._id })
      .populate("job", "title company location jobType status")
      .sort({ createdAt: -1 });

    if (!applications.length) {
      return res.status(404).json({
        success: false,
        message: "You have not applied to any jobs yet",
      });
    }

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching applications",
    });
  }
};

// -------------------------------------------------------------
// 3️⃣ Get All Applicants for a Specific Job (Recruiter only)
// -------------------------------------------------------------
export const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // ✅ Ensure the logged-in recruiter owns the job
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view applicants for this job",
      });
    }

    const applicants = await JobApplication.find({ job: jobId })
      .populate("applicant", "name email role")
      .populate("job", "title company")
      .sort({ createdAt: -1 });

    if (!applicants.length) {
      return res.status(404).json({
        success: false,
        message: "No applications found for this job",
      });
    }

    return res.status(200).json({
      success: true,
      count: applicants.length,
      applicants,
    });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching applicants",
    });
  }
};

// -------------------------------------------------------------
// 4️⃣ Update Application Status (Recruiter/Admin only)
// -------------------------------------------------------------
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params; // application ID
    const { status } = req.body;

    const application = await JobApplication.findById(id).populate("job");

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    // ✅ Only the job owner (recruiter) or admin can update
    if (
      application.job.postedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this application",
      });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating application status",
    });
  }
};

// -------------------------------------------------------------
// 5️⃣ Get All Applications by a Specific User (Admin/Recruiter)
// -------------------------------------------------------------
export const getUserApplications = async (req, res) => {
  try {
    const { userId } = req.params;

    const applications = await JobApplication.find({ applicant: userId })
      .populate("job", "title company location jobType status")
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    if (!applications.length) {
      return res.status(404).json({
        success: false,
        message: "No applications found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching user applications",
    });
  }
};