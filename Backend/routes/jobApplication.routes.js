import express from 'express';

import { applyJob,getMyApplications,getApplicantsForJob,updateApplicationStatus,getUserApplications } from '../controllers/jobApplication.controller.js';

import {protect, authorizeRoles} from "../middleware/auth.middleware.js";

const router = express.Router();

// 🧩 Jobseeker routes
router.post("/apply/:jobId", protect, authorizeRoles("jobseeker"), applyJob);

router.get("/my-applications", protect, authorizeRoles("jobseeker"), getMyApplications);

// 🧩 Recruiter/Admin routes
router.get(
  "/job/:jobId/applicants",
  protect,
  authorizeRoles("recruiter", "admin"),
  getApplicantsForJob
);
router.put(
  "/status/:id",
  protect,
  authorizeRoles("recruiter", "admin"),
  updateApplicationStatus
);
router.get(
  "/user/:userId",
  protect,
  authorizeRoles("recruiter", "admin"),
  getUserApplications
);

export default router;