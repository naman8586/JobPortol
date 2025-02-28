import { Routes, Route } from "react-router-dom";
import { JobProvider } from "./context/JobContext"; 
import AuthPage from "./components/AuthPage";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <JobProvider>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </JobProvider>
  );
}

export default App;
