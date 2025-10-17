import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // useAuth hook

const JobForm = ({ onSuccess }) => {
  const { user } = useAuth(); // get logged-in user
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-Time",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      return alert("You must be logged in to post a job");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/jobs",
        form,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // send JWT
          },
        }
      );

      alert(res.data.message);
      onSuccess?.();
      setForm({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        jobType: "Full-Time",
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-md shadow-md max-w-lg mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold mb-4">Create New Job</h2>

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

      <Button type="submit">Post Job</Button>
    </form>
  );
};

export default JobForm;
