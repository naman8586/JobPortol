import { createContext, useState } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  const updateJob = (index, updatedJob) => {
    const updatedJobs = [...jobs];
    updatedJobs[index] = updatedJob;
    setJobs(updatedJobs);
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob }}>
      {children}
    </JobContext.Provider>
  );
};
