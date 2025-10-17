import React from 'react'
import {Button} from "@/components/ui/button"
const JobCard = ({job,onApply,onEdit,onDelete,userRole}) => {
  return (
   <div className="border rounded-md shadow-md p-4 mb-4 bg-white">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.company} - {job.location}</p>
      <p className="text-gray-700 my-2">{job.description}</p>
      <p className="text-gray-500">Salary: ${job.salary || "N/A"}</p>
      <p className="text-gray-500">Type: {job.jobType}</p>
      <p className="text-gray-400 text-sm">Posted by: {job.postedBy.name}</p>

      <div className="mt-3 flex gap-2">
        {userRole === "jobseeker" && (
          <Button onClick={() => onApply(job._id)}>Apply</Button>
        )}
        {userRole === "recruiter" && (
          <>
            <Button variant="outline" onClick={() => onEdit(job._id)}>Edit</Button>
            <Button variant="outline" onClick={() => onDelete(job._id)}>Delete</Button>
          </>
        )}
      </div>
    </div>
  )
}

export default JobCard
