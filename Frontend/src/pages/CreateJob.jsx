import React from "react";
import JobForm from "../components/JobForm";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/jobs"); // Redirect after successful creation
  };

  return <JobForm onSuccess={handleSuccess} />;
};

export default CreateJob;
