import React, { useEffect, useState} from "react";
import JobCard from "../components/JobCard";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Jobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs", { withCredentials: true });
      setJobs(res.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Apply to a job (jobseeker)
  // Apply to a job (jobseeker)
const handleApply = async (jobId) => {
  if (!user?.token) return alert("You must be logged in to apply");

  try {
    const res = await axios.post(
      `http://localhost:5000/api/applications/apply/${jobId}`,
      {}, // no body needed if resume/coverLetter is optional
      {
        headers: {
          Authorization: `Bearer ${user.token}`, // send JWT
        },
      }
    );

    alert(res.data.message);
  } catch (error) {
    console.error(error.response || error);
    alert(error.response?.data?.message || "Failed to apply");
  }
};



  // Edit job (recruiter) - navigate to edit page
  const handleEdit = (jobId) => {
    // You can create a separate EditJob page
    // For now, just alert
   navigate(`/jobs/edit/${jobId}`);


  };

  // Delete job (recruiter/admin)
  const handleDelete = async (jobId) => {
  if (!window.confirm("Are you sure you want to delete this job?")) return;

  try {
   await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    alert("Job deleted successfully");

    // Refetch jobs
    fetchJobs();  // This should update `jobs` state
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Failed to delete job");
  }
};

  

  if (loading) return <p className="text-center mt-10">Loading jobs...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onApply={handleApply}
            onEdit={handleEdit}
            onDelete={handleDelete}
            userRole={user?.role}
          />
        ))
      )}
    </div>
  );
};

export default Jobs;
