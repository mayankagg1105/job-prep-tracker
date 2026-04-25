import React from "react";
import { useState } from "react";
import axios from "axios";

const AddJob = ({ onJobAdded }) => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    category:"",
    status:"",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("https://job-prep-tracker-backend.onrender.com/job", job);
    alert("Job added successfully!");
    onJobAdded();
    setJob({
      title: "",
      company: "",
      location: "",
      salary: Number(job.salary),
      description: "",
      category: "",
      status: "",
    });
  } catch (error) {
    console.error("Error adding job:", error);
  }
};


  return (
    <div>
      <h2>Add a Job</h2>
      <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Job Title" value={job.title} onChange={handleChange} required />
                <input type="text" name="company" placeholder="Company" value={job.company} onChange={handleChange} required />
                
                <select name="location" value={job.location} onChange={handleChange} required>
                     <option value="">Select Location</option>
                     <option value="New York">New York</option>
                     <option value="San Francisco">San Francisco</option>
                     <option value="Los Angeles">Los Angeles</option>
                </select>
                <input type="number" name="salary" placeholder="Salary" value={job.salary} onChange={handleChange} required />

                <select name="category" value={job.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="Software">Software</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                </select>

                <textarea name="description" placeholder="Job Description" value={job.description} onChange={handleChange} required></textarea>

                <select name="status" value={job.status} onChange={handleChange} required>
                    <option value="">Select Status</option>
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEW">Interview</option>
                    <option value="OFFERED">Offered</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="WITHDRAWN">Withdrawn</option>
                </select>

                <button type="submit" >Add Job</button>
            </form>

    </div>
  );
};

export default AddJob;
