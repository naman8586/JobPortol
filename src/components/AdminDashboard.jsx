import React, { useState, useEffect, useContext } from "react";
import { JobContext } from "../context/JobContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { jobs = [], addJob, updateJob } = useContext(JobContext);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    role: "",
    stipend: "",
    description: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedApplications = JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(storedApplications);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.company || !form.role || !form.stipend) {
      alert("Please fill all required fields!");
      return;
    }

    if (editingIndex !== null) {
      updateJob(editingIndex, form);
      setEditingIndex(null);
    } else {
      addJob(form);
    }

    setForm({ title: "", company: "", location: "", role: "", stipend: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Navbar */}
      <div className="h-20 flex items-center justify-between px-10 md:px-20 w-full bg-gradient-to-r from-gray-800 to-black shadow-lg">
        <div className="text-3xl font-extrabold text-yellow-400">Admin Panel</div>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition-all shadow-md"
        >
          Sign Out
        </button>
      </div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-4xl font-bold text-center mb-6 text-yellow-400">Manage Job Postings</h2>

        {/* Job Posting Form */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-2xl font-semibold mb-4 text-yellow-300">
            {editingIndex !== null ? "Edit Job" : "Post a Job"}
          </h3>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Job Title" className="border p-3 rounded-lg w-full bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400" required />
            <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company Name" className="border p-3 rounded-lg w-full bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400" required />
            <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Location (Optional)" className="border p-3 rounded-lg w-full bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400" />
            <input type="text" name="role" value={form.role} onChange={handleChange} placeholder="Role" className="border p-3 rounded-lg w-full bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400" required />
            <input type="text" name="stipend" value={form.stipend} onChange={handleChange} placeholder="Stipend / Salary" className="border p-3 rounded-lg w-full bg-gray-700 text-white focus:ring-2 focus:ring-yellow-400" required />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Job Description" className="border p-3 rounded-lg w-full bg-gray-700 text-white h-28 focus:ring-2 focus:ring-yellow-400"></textarea>
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition-all shadow-md">
              {editingIndex !== null ? "Update Job" : "Post Job"}
            </button>
          </form>
        </div>

        {/* Job Applications */}
        <div className="mt-10">
          <h3 className="text-3xl font-semibold mb-4 text-yellow-400">Job Applications</h3>
          {applications.length === 0 ? (
            <p className="text-gray-400 text-center">No applications received yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.map((app, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 hover:shadow-lg transition-all relative">
                  <p className="text-lg font-semibold text-yellow-400">Job ID: {app.jobId}</p>
                  <p className="text-gray-300"><strong>Applicant:</strong> {app.userEmail}</p>
                  <p className="text-gray-400"><strong>Applied On:</strong> {app.appliedAt}</p>
                  {app.resume && (
                    <a href={app.resume} download className="text-blue-400 hover:underline block mt-2">
                      📄 Download Resume
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
