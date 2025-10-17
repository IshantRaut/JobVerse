import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

const EditJob = () => {
  const { user } = useAuth();
  const { id } = useParams(); // job ID from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-Time",
  });

  const [loading, setLoading] = useState(true);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        const job = res.data.job;
        setForm({
          title: job.title,
          description: job.description,
          company: job.company,
          location: job.location,
          salary: job.salary,
          jobType: job.jobType,
        });
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to fetch job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      return alert("You must be logged in to edit a job");
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/jobs/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      alert(res.data.message);
      navigate("/jobs");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update job");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading job details...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-md shadow-md max-w-lg mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Job</h2>

      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="company"
        placeholder="Company Name"
        value={form.company}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
      />

      <textarea
        name="description"
        placeholder="Job Description"
        value={form.description}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={form.salary}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
      />

      <select
        name="jobType"
        value={form.jobType}
        onChange={handleChange}
        className="mb-3 w-full border p-2 rounded"
      >
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Internship">Internship</option>
      </select>

      <Button type="submit">Update Job</Button>
    </form>
  );
};

export default EditJob;
