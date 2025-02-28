import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const onSubmit = (data) => {
    setLoading(true);

    setTimeout(() => {
      if (isLogin) {
        const userExists = users.find(
          (user) => user.email === data.email && user.password === data.password
        );
        if (userExists) {
          localStorage.setItem("currentUser", JSON.stringify(userExists));
          alert(`Logged in successfully as ${userExists.role}!`);
          navigate(userExists.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
        } else {
          alert("User not found or incorrect credentials!");
        }
      } else {
        if (data.password !== data.confirmPassword) {
          alert("Passwords do not match!");
          setLoading(false);
          return;
        }

        if (users.some((user) => user.email === data.email)) {
          alert("User already exists! Please login.");
          setLoading(false);
          return;
        }

        const newUser = { email: data.email, password: data.password, role: data.role };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        alert("Signup successful! Now login.");
        setIsLogin(true);
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-4">
      <div className="w-full max-w-md p-8 bg-opacity-30 backdrop-blur-3xl rounded-3xl shadow-2xl border border-gray-700 relative overflow-hidden transition transform hover:scale-105 duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-600 opacity-25 blur-md"></div>

        <div className="flex justify-between mb-6 relative z-10">
          <button
            className={`px-6 py-3 w-1/2 text-lg font-semibold transition rounded-l-xl shadow-md ${isLogin ? "bg-yellow-400 text-black" : "bg-transparent border border-yellow-500 text-white hover:bg-yellow-500 hover:text-black"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-6 py-3 w-1/2 text-lg font-semibold transition rounded-r-xl shadow-md ${!isLogin ? "bg-yellow-400 text-black" : "bg-transparent border border-yellow-500 text-white hover:bg-yellow-500 hover:text-black"}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
          <div>
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-4 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 outline-none transition shadow-md"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <label className="block text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters" },
              })}
              className="w-full p-4 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 outline-none transition shadow-md"
            />
            <button
              type="button"
              className="absolute right-4 top-12 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {!isLogin && (
            <>
              <div className="relative">
                <label className="block text-gray-300">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                  className="w-full p-4 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 outline-none transition shadow-md"
                />
                <button
                  type="button"
                  className="absolute right-4 top-12 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
              </div>

              <div>
                <label className="block text-gray-300">Role</label>
                <select
                  {...register("role", { required: "Role is required" })}
                  className="w-full p-4 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 outline-none transition shadow-md"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>}
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full p-4 rounded-xl bg-yellow-400 text-black hover:bg-yellow-500 transition text-lg font-semibold shadow-md hover:shadow-lg"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
