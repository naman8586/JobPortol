import { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { JobContext } from "../context/JobContext";

function UserDashboard() {
  const { jobs: contextJobs } = useContext(JobContext);
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  useEffect(() => {
    setJobs(contextJobs);
  }, [contextJobs]);

  const fetchJobs = () => {
    setCustomSearch(false);
    setJobs(contextJobs);
  };

  const fetchJobsCustom = (jobCriteria) => {
    setCustomSearch(true);
    const filteredJobs = contextJobs.filter((job) =>
      (!jobCriteria.type || job.type === jobCriteria.type) &&
      (!jobCriteria.title || job.title?.toLowerCase().includes(jobCriteria.title?.toLowerCase())) &&
      (!jobCriteria.experience || job.experience === jobCriteria.experience) &&
      (!jobCriteria.location || job.location === jobCriteria.location)
    );
    setJobs(filteredJobs);
  };

  const handleApply = (jobId) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Please log in to apply!");
      return;
    }

    const newApplication = {
      jobId,
      userEmail: currentUser.email,
      appliedAt: new Date().toLocaleString(),
    };

    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    applications.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(applications));

    alert(`Applied successfully for Job ID: ${jobId}!`);
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white font-sans">
      <Navbar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom} />

      {customSearch && (
        <div className="flex justify-end pr-6 md:pr-12 mt-4">
          <button
            onClick={fetchJobs}
            className="bg-red-500 px-5 py-2 rounded-md text-white hover:bg-red-600 transition-all shadow-lg"
          >
            Clear Filters
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto mt-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all relative border border-gray-700 hover:border-yellow-400 transform hover:scale-105 duration-300"
            >
              <h4 className="text-xl font-semibold text-yellow-400">{job.title}</h4>
              <p className="text-gray-300 font-medium">{job.company} - {job.location || "Remote"}</p>
              <p className="text-gray-400 text-sm">Role: {job.role}</p>
              <p className="text-green-400 font-semibold">Stipend: {job.stipend}</p>
              <p className="text-gray-300 mt-2 text-sm leading-relaxed">{job.description}</p>
              <button
                onClick={() => handleApply(job.id)}
                className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full text-lg">No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
