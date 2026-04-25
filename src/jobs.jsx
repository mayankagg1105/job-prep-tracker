import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import axios from "axios";
import "./Jobs.css"

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null);
    const [updatedJob, setUpdatedJob] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;
  
    const fetchJobs = useCallback(() => {
      axios
        .get("https://job-prep-tracker-backend.onrender.com/job")
        .then((response) => setJobs(response.data))
        .catch((error) => console.error("Error fetching jobs:", error));
    }, []);
  
    useEffect(() => {
      fetchJobs();
    }, [fetchJobs]);
  
    const editJob = (job) => {
      setEditingJob(job);
      setUpdatedJob(job);
    };
  
    const handleUpdateChange = (e) => {
      console.log("Updating:", e.target.name, "Value:", e.target.value);
      setUpdatedJob({ ...updatedJob, [e.target.name]: e.target.value });
    };
  
    const updateJob = (e) => {
      e.preventDefault();
      console.log("Updated job:", updatedJob);
      axios
        .put(`https://job-prep-tracker-backend.onrender.com/job/${updatedJob.id}`, updatedJob)
        .then(() => {
          alert("Job updated successfully!");
          setEditingJob(null);
          fetchJobs();
        })
        .catch((error) => console.error("Error updating job:", error));
    };
  
    const deleteJob = (id) => {
      axios
        .delete(`https://job-prep-tracker-backend.onrender.com/job/${id}`)
        .then(() => {
          alert("Job deleted successfully!");
          fetchJobs();
        })
        .catch((error) => console.error("Error deleting job:", error));
    };
  
    // Filtering Logic
    const filteredJobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (locationFilter === "" || job.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
        (categoryFilter === "" || job.category.toLowerCase().includes(categoryFilter.toLowerCase())) &&
        (statusFilter === "ALL" || job.status === statusFilter)
    );
  
    // Pagination Logic
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  
    return (
      <div>
        <h2>Job Listings</h2>
  
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  
        {/* Location Filter */}
        <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          <option value="">All Locations</option>
          {[...new Set(jobs.map((job) => job.location))].map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
  
        {/* Category Filter */}
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {[...new Set(jobs.map((job) => job.category))].map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="ALL">All Status</option>
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFERED">Offered</option>
          <option value="REJECTED">Rejected</option>
          <option value="WITHDRAWN">Withdrawn</option>
        </select>
  
        {/* Job Listings */}
        <ul>
          {currentJobs.map((job) => (
            <li key={job.id}>
              {editingJob && editingJob.id === job.id ? (
                <form onSubmit={updateJob}>
                  <input type="text" name="title" value={updatedJob.title} onChange={handleUpdateChange} required />
                  <input type="text" name="company" value={updatedJob.company} onChange={handleUpdateChange} required />
                  <input type="text" name="location" value={updatedJob.location} onChange={handleUpdateChange} required />
                  <input type="number" name="salary" value={updatedJob.salary} onChange={handleUpdateChange} required />
                  <input type="text" name="category" value={updatedJob.category} onChange={handleUpdateChange} required />
                  <textarea name="description" value={updatedJob.description} onChange={handleUpdateChange} required></textarea>
                  <select name="status" value={updatedJob.status} onChange={handleUpdateChange} required>
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEW">Interview</option>
                    <option value="OFFERED">Offered</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="WITHDRAWN">Withdrawn</option>
                  </select>
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingJob(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <strong>{job.title}</strong> at {job.company}, {job.location} - ₹{job.salary}
                  <p>Category: {job.category}</p>
                  <p>Status: {job.status}</p>
                  <p>{job.description}</p>
                  <button onClick={() => editJob(job)}>Edit</button>
                  <button onClick={() => deleteJob(job.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
  
        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    );
  };
  
  export default Jobs;
