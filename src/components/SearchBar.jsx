import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ fetchJobsCustom }) {
  const [jobCriteria, setJobCriteria] = useState({
    title: "",
    location: "",
    experience: "",
    type: "",
  });

  const handleChange = (e) => {
    setJobCriteria((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const search = async () => {
    await fetchJobsCustom(jobCriteria);
  };

  return (
    <div className="flex flex-wrap gap-6 my-10 justify-center px-6">
      {["title", "type", "location", "experience"].map((field, index) => (
        <select
          key={index}
          onChange={handleChange}
          name={field}
          value={jobCriteria[field]}
          className="w-64 py-3 pl-4 bg-white text-gray-900 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all hover:shadow-lg"
        >
          <option value="" disabled hidden>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </option>
          {field === "title" &&
            [
              "iOS Developer",
              "Frontend Developer",
              "Backend Developer",
              "Android Developer",
              "Developer Advocate",
            ].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          {field === "type" &&
            ["Full Time", "Part Time", "Contract"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          {field === "location" &&
            ["Remote", "In-Office", "Hybrid"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          {field === "experience" &&
            ["Fresher", "Junior Level", "Mid Level", "Senior Level"].map(
              (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              )
            )}
        </select>
      ))}

      <button
        onClick={search}
        className="flex items-center justify-center w-64 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg"
      >
        <FaSearch className="mr-2" /> Search Jobs
      </button>
    </div>
  );
}

export default SearchBar;
