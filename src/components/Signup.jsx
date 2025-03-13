import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/movieActions.js";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = await dispatch(signup(credentials)).unwrap();
      if (token) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0b121f]">
      <div className="w-full max-w-md p-8 bg-[#0b121f] md:bg-gray-800 rounded-lg md:shadow-lg">
        <h2 className="text-xl md:text-2xl font-semibold text-white text-left md:text-center mb-6">
          Sign up for an account
        </h2>
        {/* Display error message if signup fails */}
        {error && (
          <div className="mb-4 text-center text-sm text-red-400">{error}</div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-left text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              type="text" 
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-left text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center flex-wrap justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 text-gray-500 focus:ring-gray-500 border-gray-600 rounded bg-gray-700"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>
            <div>
              <Link
                to="/login"
                className="text-sm text-gray-400 hover:text-gray-300"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Sign up
          </button>
        </form>
        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">Or continue with</p>
          <div className="mt-3 flex gap-2 flex-wrap md:flex-nowrap md:gap-0 justify-center space-x-0 md:space-x-4">
            <button className="flex items-center cursor-pointer justify-center w-full md:w-1/2 py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              Google
            </button>
            <button className="flex items-center cursor-pointer justify-center w-full md:w-1/2 py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <img
                src="https://github.githubassets.com/favicons/favicon.png"
                alt="GitHub"
                className="h-5 w-5 mr-2"
              />
              GitHub
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
