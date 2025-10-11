import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(morgan("dev"));
// Test Route
app.get("/", (req, res) => {
  res.send("Job Portal Backend is running successfully 🚀");
});




//Create Midlleware for routes
app.use("/api/auth",authRoutes);
app.use("/api/jobs",jobRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
