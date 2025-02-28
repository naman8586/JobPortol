import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-16 lg:px-24 w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-md">
     
      <div className="text-3xl font-bold tracking-wide">Joboard.</div>

  
      <nav className="hidden md:flex gap-10 text-lg font-medium">
        {["Home", "Jobs", "Companies", "Contact"].map((item, index) => (
          <a
            key={index}
            href="#"
            className="relative group transition-all"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
          </a>
        ))}
      </nav>

     
      <button
        onClick={handleSignOut}
        className="bg-white text-orange-600 px-6 py-2 rounded-full font-semibold transition-all shadow-sm hover:bg-orange-700 hover:text-white"
      >
        Sign Out
      </button>
    </header>
  );
}

export default Navbar;
