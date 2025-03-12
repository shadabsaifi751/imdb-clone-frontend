import { Loader2, Loader } from "lucide-react";
import React from "react";
import PropTypes from "prop-types";

// Fixed position overlay loader
const PageLoader = ({
  size = 40,
  color = "#ffffff",
  variant = "default",
  background = "rgba(0, 0, 0, 0.5)",
  message = "Loading...",
  showMessage = true,
  className = "",
}) => {
  const LoaderIcon = variant === "default" ? Loader2 : Loader;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}
      style={{ background }}
      aria-label="Loading"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <LoaderIcon
          className="animate-spin"
          size={size}
          color={color}
          aria-hidden="true"
        />
        {showMessage && (
          <span
            className="text-white text-lg font-medium animate-pulse"
            style={{ color }}
          >
            {message}
          </span>
        )}
      </div>
    </div>
  );
};

// Full screen loader
export const FullScreenLoader = ({
  size = 40,
  color = "#ffffff",
  variant = "default",
  message = "Loading...",
  showMessage = true,
  className = "",
}) => {
  const LoaderIcon = variant === "default" ? Loader2 : Loader;

  return (
    <div
      className={`h-screen w-full flex items-center justify-center ${className}`}
      aria-label="Loading"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <LoaderIcon
          className="animate-spin"
          size={size}
          color={color}
          aria-hidden="true"
        />
        {showMessage && (
          <span className="text-gray-800 text-lg font-medium animate-pulse">
            {message}
          </span>
        )}
      </div>
    </div>
  );
};

// New content-specific loader
export const ContentLoader = ({
  size = 24,
  color = "white",
  variant = "default",
  message = "Loading...",
  showMessage = false,
  className = "",
  spinnerPosition = "center", // 'left', 'center', 'right'
  width = "100%",
  height = "auto",
}) => {
  const LoaderIcon = variant === "default" ? Loader2 : Loader;

  const getFlexPosition = () => {
    switch (spinnerPosition) {
      case "left":
        return "justify-start";
      case "right":
        return "justify-end";
      default:
        return "justify-center";
    }
  };

  return (
    <div
      className={`w-full flex ${getFlexPosition()} items-center gap-2 ${className}`}
      style={{ width, height }}
      aria-label="Loading content"
      role="status"
    >
      <LoaderIcon
        className="animate-spin"
        size={size}
        color={color}
        aria-hidden="true"
      />
      {showMessage && (
        <span className="text-gray-300 text-sm font-medium animate-pulse">
          {message}
        </span>
      )}
    </div>
  );
};

// PropTypes definitions
PageLoader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  variant: PropTypes.oneOf(["default", "circle"]),
  background: PropTypes.string,
  message: PropTypes.string,
  showMessage: PropTypes.bool,
  className: PropTypes.string,
};

FullScreenLoader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  variant: PropTypes.oneOf(["default", "circle"]),
  message: PropTypes.string,
  showMessage: PropTypes.bool,
  className: PropTypes.string,
};

ContentLoader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  variant: PropTypes.oneOf(["default", "circle"]),
  message: PropTypes.string,
  showMessage: PropTypes.bool,
  className: PropTypes.string,
  spinnerPosition: PropTypes.oneOf(["left", "center", "right"]),
  width: PropTypes.string,
  height: PropTypes.string,
};

export default PageLoader;
