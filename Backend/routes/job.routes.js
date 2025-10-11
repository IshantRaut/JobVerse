import express from "express";

import { createJob, getAllJobs , getJobById, updateJob, deleteJob } from "../controllers/job.controller.js";

import {protect, authorizeRoles} from "../middleware/auth.middleware.js";
const router = express.Router();



// Public routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Protected routes (recruiter only)
router.post("/", protect, authorizeRoles("recruiter"), createJob);
router.put("/:id", protect, authorizeRoles("recruiter"), updateJob);
router.delete("/:id", protect, authorizeRoles("recruiter", "admin"), deleteJob);

export default router;