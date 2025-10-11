import { Job } from "../models/job.model.js";


// Create a new job posting
export const createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary, jobType } = req.body;

    // ✅ Step 1: Basic validation
    if (!title || !description || !company) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and company are required",
      });
    }

    // ✅ Step 2: Create new Job entry
    const newJob = new Job({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      postedBy: req.user._id, // Added automatically from auth middleware
    });

    // ✅ Step 3: Save to DB
    await newJob.save();

    // ✅ Step 4: Return success response
    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });

  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating job",
    });
  }
};


// Placeholder for getting all jobs
export const getAllJobs = async (req, res) => {
 try {
  const jobs = await Job.find().populate("postedBy","name email").sort({createdAt:-1});

  //If no Jobs found
  if(!jobs.length){
    return res.status(404).json({
      success:false,
      message:"No jobs found"
    });
  }

//Success response

  return res.status(200).json({
    success:true,
    count:jobs.length,
    jobs
  });


 } catch (error) {
  console.error("Error fetching jobs:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching jobs",
    });
 }
};

// Placeholder for getting a single job

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Find job by ID
    const job = await Job.findById(id).populate("postedBy", "name email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // ✅ Success
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching job details",
    });
  }
};


// Placeholder for updating a job

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // 1️⃣ Find job
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // 2️⃣ Check if logged-in user is the one who posted it
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this job",
      });
    }

    // 3️⃣ Update fields
    Object.assign(job, updates);

    // 4️⃣ Save updated job
    const updatedJob = await job.save();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating job",
    });
  }
};


// Placeholder for deleting a job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Find the job
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // 2️⃣ Check if the logged-in user is the job poster
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this job",
      });
    }

    // 3️⃣ Delete the job
    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting job",
    });
  }
};