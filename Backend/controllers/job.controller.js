import { Job } from "../models/job.model.js";

// Placeholder for creating a job
export const createJob = async (req, res) => {
  res.status(200).json({ message: "Create job route works!" });
};

// Placeholder for getting all jobs
export const getAllJobs = async (req, res) => {
  res.status(200).json({ message: "Get all jobs route works!" });
};

// Placeholder for getting a single job
export const getJobById = async (req, res) => {
  res.status(200).json({ message: `Get job ${req.params.id} works!` });
};

// Placeholder for updating a job
export const updateJob = async (req, res) => {
  res.status(200).json({ message: `Update job ${req.params.id} works!` });
};

// Placeholder for deleting a job
export const deleteJob = async (req, res) => {
  res.status(200).json({ message: `Delete job ${req.params.id} works!` });
};
