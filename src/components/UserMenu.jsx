import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function UserMenu({ isLogin }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let badgeCount = 0;
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      dispatch(logout()); // Dispatch the logout action
      setIsDropdownOpen(false); // Close the dropdown
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      {isLogin ? (
        <>
          <button className="text-gray-500 mr-3 cursor-pointer hover:text-gray-700 relative">
            <ShoppingBagIcon className="size-7 text-white" />
            <span className="absolute -top-1 -right-1 bg-black rounded-full text-white text-xs h-4 w-4 flex items-center justify-center">
              {badgeCount}
            </span>
          </button>
          <button
            className="text-gray-500  border-yellow-500 border-2 rounded-full cursor-pointer hover:text-gray-700 relative focus:outline-none"
            onClick={toggleDropdown}
            aria-label="User menu"
            aria-expanded={isDropdownOpen}
          >
            <UserCircleIcon className="size-7 text-white" />
          </button>
        </>
      ) : (
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 mr-5 cursor-pointer hover:text-gray-700 relative">
            <ShoppingBagIcon className="size-7 text-white" />
            <span className="absolute -top-1 -right-1 bg-black rounded-full text-white text-xs h-4 w-4 flex items-center justify-center">
              {badgeCount}
            </span>
          </button>
          <Link
            to="/login"
            className="text-gray-300 hover:text-white text-base"
          >
            Login
          </Link>
          <button
            // to="/signup"
            onClick={() => navigate("/signup")}
            className="text-white bg-yellow-600 p-[16px] sm:p-[18px] leading-[0px] cursor-pointer rounded-[6px] hover:text-white text-sm sm:text-base"
          >
            Signup
          </button>
        </div>
      )}

      {/* Dropdown Menu */}
      {isLogin && isDropdownOpen && (
        <div className="absolute right-0 top-10 mt-2 w-48 bg-[#0b121f] border border-gray-600 rounded-md shadow-lg z-10">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={() => setIsDropdownOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={() => setIsDropdownOpen(false)}
          >
            Settings
          </Link>
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={() => setIsDropdownOpen(false)}
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            disabled={loading}
            className={`block cursor-pointer w-full text-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}
