import React, { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../store/user-slice";
import { getApiUrl } from "../utils/apiConfig";
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../utils/firebase.js";
import { Loader } from "lucide-react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setLoggedInUser(JSON.parse(user)));
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(getApiUrl(`/api/v1/user/login`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error logging in");
      }
      setLoading(false);
      if (data?.data) {
        const userData = data.data;
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.token);
        dispatch(setLoggedInUser(userData));
        toast.success("User Logged In successfully!");
        navigate("/");
      } else {
        toast.error("Invalid login response");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid login response");
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const user = result.user;
  //     // Send to backend for token generation
  //     const response = await fetch(getApiUrl(`/api/v1/user/google-auth`), {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: user.email,
  //         name: user.displayName,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || "Google authentication failed");
  //     }
  //     setLoading(false);
  //     // Store token and user data
  //     localStorage.setItem("user", JSON.stringify(data.data));
  //     localStorage.setItem("token", data.token);
  //     dispatch(setLoggedInUser(data.data));
  //     toast.success("Google login successful!");
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Google login error:", error);
  //     toast.error(error.message || "Google login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex-1 relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
      <div className="max-w-md w-full relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-white/20 bg-white/10 backdrop-blur-sm placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-white/20 bg-white/10 backdrop-blur-sm placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 animate-gradient-x hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {loading ? (
                <Loader className="w-6 h-6 text-white animate-spin mx-auto" />
              ) : (
                " Sign in"
              )}
            </button>
          </div>
        </form>
        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleGoogleSignIn}
              className="w-[70%] inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Google
            </button>
          </div>
        </div> */}
        <p className="mt-2 text-center text-sm text-white">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="underline transition duration-200 ease-in-out text-blue-300 hover:text-blue-200 focus:text-blue-200"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
