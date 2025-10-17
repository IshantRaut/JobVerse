import {useEffect,useState} from 'react'
import JobCard from '../../components/JobCard'
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const RecruiterDashboard = () => {
  const { user } =useAuth;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs posted by this recruiter
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs", { withCredentials: true });
      // Filter jobs posted by logged-in recruiter
      const myJobs = res.data.jobs.filter(job => job.postedBy._id === user._id);
      setJobs(myJobs);
    } catch (error) {
      console.error("Error fetching recruiter jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEdit = (jobId) => {
    alert(`Navigate to Edit Job page for ${jobId}`);
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, { withCredentials: true });
      alert("Job deleted successfully");
      fetchJobs();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete job");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading your jobs...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Posted Jobs</h1>
      {jobs.length === 0 ? (
        <p>You havent posted any jobs yet.</p>
      ) : (
        jobs.map(job => (
          <JobCard
            key={job._id}
            job={job}
            onEdit={handleEdit}
            onDelete={handleDelete}
            userRole="recruiter"
          />
        ))
      )}
    </div>
  );
};

export default RecruiterDashboard;
