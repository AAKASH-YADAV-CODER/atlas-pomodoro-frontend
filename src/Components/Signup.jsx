import React, { useState } from "react";
import PasswordStrengthMeter from "./PasswordStrengthMeter.jsx";
import { User, Mail, Lock, Phone } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";

    // New password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long,should have one uppercase,one lowercase and one special character";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Invalid phone number (10 digits required)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        // Use the full URL instead of relying on the proxy
        const response = await fetch(`/api/v1/user/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (!response.ok) {
          // Display the specific error message from the server
          throw new Error(data.message || "Error registering user");
        }

        // Success case
        toast.success("Registration successful! Please login.");
        setLoading(false);
        navigate("/login");
      } catch (error) {
        console.error("Error during registration:", error.message);

        // Display a more user-friendly error message
        if (error.message.includes("phone")) {
          setErrors((prev) => ({
            ...prev,
            phone: "This phone number is already registered",
          }));
          toast.error("This phone number is already registered");
        } else if (error.message.includes("email")) {
          setErrors((prev) => ({
            ...prev,
            email: "This email is already registered",
          }));
          toast.error("This email is already registered");
        } else {
          toast.error(error.message || "Error registering user");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl relative z-10">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <User className=" mt-2 " />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-white/20 bg-white/10 backdrop-blur-sm rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="flex gap-3">
            <Mail className=" mt-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-white/20 bg-white/10 backdrop-blur-sm rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="flex gap-3">
            <Lock className=" mt-2" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-white/20 bg-white/10 backdrop-blur-sm rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 pl-3">{errors.password}</p>
          )}
          <div className="flex gap-3">
            <Lock className=" mt-2" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-white/20 bg-white/10 backdrop-blur-sm rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 pl-3">{errors.confirmPassword}</p>
          )}
          <div className="flex gap-3">
            <Phone className=" mt-2" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-white/20 bg-white/10 backdrop-blur-sm rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.phone && <p className="text-red-500 pl-3">{errors.phone}</p>}
          <PasswordStrengthMeter password={formData.password} />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-gradient-x hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {loading ? (
              <Loader className="w-6 h-6 text-white animate-spin mx-auto" />
            ) : (
              "Register"
            )}
          </button>
          <Link
            to="/login"
            className="w-full flex items-center justify-center py-2 px-4 border border-white/20 rounded-md shadow-sm text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
