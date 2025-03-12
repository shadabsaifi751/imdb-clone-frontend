import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../redux/actions/movieActions.js";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { TrashIcon } from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";
import { Loader2 } from "lucide-react";

export default function AddMoviePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moviesLoading = useSelector((state) => state.movies);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    year_of_release: "",
    plot: "",
    poster: null,
    producer: { name: "", gender: "", dob: null, bio: "" },
    actors: [{ name: "", gender: "", dob: null, bio: "" }],
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, poster: file });
    setErrors({ ...errors, poster: file ? "" : "Poster is required" });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value ? "" : "Movie name is required";
      case "year_of_release":
        return value ? "" : "Year of release is required";
      case "plot":
        return value ? "" : "Plot is required";
      case "poster":
        return value ? "" : "Poster is required";
      case "producer.name":
        return value ? "" : "Producer name is required";
      case "producer.gender":
        return value ? "" : "Producer gender is required";
      case "producer.dob":
        return value ? "" : "Producer DOB is required";
      case "producer.bio":
        return value ? "" : "Producer bio is required";
      case "actor.name":
        return value ? "" : "Actor name is required";
      case "actor.gender":
        return value ? "" : "Actor gender is required";
      case "actor.dob":
        return value ? "" : "Actor DOB is required";
      case "actor.bio":
        return value ? "" : "Actor bio is required";
      default:
        return "";
    }
  };

  const validateActorField = (actor, index) => {
    const actorErrors = {};
    actorErrors[`actorName${index}`] = validateField("actor.name", actor.name);
    actorErrors[`actorGender${index}`] = validateField(
      "actor.gender",
      actor.gender
    );
    actorErrors[`actorDob${index}`] = validateField("actor.dob", actor.dob);
    actorErrors[`actorBio${index}`] = validateField("actor.bio", actor.bio);
    return actorErrors;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate top-level fields
    Object.keys(formData).forEach((key) => {
      if (key !== "producer" && key !== "actors") {
        newErrors[key] = validateField(key, formData[key]);
      }
    });

    // Validate producer fields
    Object.keys(formData.producer).forEach((key) => {
      newErrors[`producer${key.charAt(0).toUpperCase() + key.slice(1)}`] =
        validateField(`producer.${key}`, formData.producer[key]);
    });

    // Validate actors fields
    formData.actors.forEach((actor, index) => {
      Object.assign(newErrors, validateActorField(actor, index));
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error); // True if no errors
  };

  const handleChange = (field, value, actorIndex = null) => {
    let newErrors = { ...errors };

    if (actorIndex !== null) {
      const newActors = [...formData.actors];
      newActors[actorIndex] = { ...newActors[actorIndex], [field]: value };
      setFormData({ ...formData, actors: newActors });

      // Revalidate the entire actor object and update errors
      const actorErrors = validateActorField(newActors[actorIndex], actorIndex);
      Object.keys(actorErrors).forEach((key) => {
        newErrors[key] = actorErrors[key];
      });
    } else if (field.startsWith("producer.")) {
      const producerField = field.split(".")[1];
      setFormData({
        ...formData,
        producer: { ...formData.producer, [producerField]: value },
      });
      newErrors[
        `producer${
          producerField.charAt(0).toUpperCase() + producerField.slice(1)
        }`
      ] = validateField(field, value);
    } else {
      setFormData({ ...formData, [field]: value });
      newErrors[field] = validateField(field, value);
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill out all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("year_of_release", Number(formData.year_of_release));
    formDataToSend.append("plot", formData.plot);
    formDataToSend.append("poster", formData.poster);
    formDataToSend.append(
      "producer",
      JSON.stringify({
        ...formData.producer,
        dob: formData.producer.dob.toISOString().split("T")[0],
      })
    );
    formDataToSend.append(
      "actors",
      JSON.stringify(
        formData.actors.map((actor) => ({
          ...actor,
          dob: actor.dob.toISOString().split("T")[0],
        }))
      )
    );

    dispatch(addMovie(formDataToSend))
      .then(() => navigate("/dashboard"))
      .catch((err) => alert(err.message));
  };

  const addActorField = () => {
    setFormData({
      ...formData,
      actors: [
        ...formData.actors,
        { name: "", gender: "", dob: null, bio: "" },
      ],
    });
  };

  const removeActorField = (index) => {
    if (formData.actors.length === 1) {
      alert("You must have at least one actor.");
      return;
    }
    const newActors = formData.actors.filter((_, i) => i !== index);
    setFormData({ ...formData, actors: newActors });
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`actor`) && key.includes(index)) delete newErrors[key];
    });
    setErrors(newErrors);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full backdrop-blur-sm max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
      >
        <div className="flex justify-between">
          <h2 className="text-xl text-white font-semibold">Add New Movie</h2>
          <Link
            to="/dashboard"
            className="px-3 py-1 cursor-pointer bg-gray-600 text-white rounded"
          >
            Cancel
          </Link>
        </div>
        <div>
          <input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Movie Name"
            className={`w-full px-3 py-2 bg-gray-700 text-white border ${
              errors.name ? "border-red-500" : "border-gray-600"
            } rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500 text-left">{errors.name}</p>
          )}
        </div>
        <div>
          <DatePicker
            selected={
              formData.year_of_release
                ? new Date(formData.year_of_release, 0, 1)
                : null
            }
            onChange={(date) =>
              handleChange("year_of_release", date ? date.getFullYear() : "")
            }
            showYearPicker
            dateFormat="yyyy"
            placeholderText="Select Year"
            className={`w-full px-3 py-2 bg-gray-700 text-white border ${
              errors.year_of_release ? "border-red-500" : "border-gray-600"
            } rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400`}
          />
          {errors.year_of_release && (
            <p className="mt-1 text-xs text-red-500 text-left">
              {errors.year_of_release}
            </p>
          )}
        </div>
        <div>
          <textarea
            value={formData.plot}
            onChange={(e) => handleChange("plot", e.target.value)}
            placeholder="Enter movie plot"
            rows="4"
            className={`w-full px-3 py-2 bg-gray-700 text-white border ${
              errors.plot ? "border-red-500" : "border-gray-600"
            } rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400 resize-y`}
          />
          {errors.plot && (
            <p className="mt-1 text-xs text-red-500 text-left">{errors.plot}</p>
          )}
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={`w-full px-3 py-2 bg-gray-700 text-white border ${
              errors.poster ? "border-red-500" : "border-gray-600"
            } rounded file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-yellow-600 file:text-white hover:file:bg-yellow-700`}
          />
          {formData.poster && (
            <p className="mt-1 text-xs text-left text-gray-300">
              Selected: {formData.poster.name}
            </p>
          )}
          {errors.poster && (
            <p className="mt-1 text-xs text-red-500 text-left">
              {errors.poster}
            </p>
          )}
        </div>
        <div>
          <input
            value={formData.producer.name}
            onChange={(e) => handleChange("producer.name", e.target.value)}
            placeholder="Producer Name"
            className={`w-full px-3 py-2 bg-gray-700 text-white border ${
              errors.producerName ? "border-red-500" : "border-gray-600"
            } rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400`}
          />
          {errors.producerName && (
            <p className="mt-1 text-xs text-red-500 text-left">
              {errors.producerName}
            </p>
          )}
        </div>
        <div>
          <select
            value={formData.producer.gender}
            onChange={(e) => handleChange("producer.gender", e.target.value)}
            className={`w-full px-3 py-2 bg-gray-700 text-white border ${
              errors.producerGender ? "border-red-500" : "border-gray-600"
            } rounded focus:outline-none focus:ring-2 focus:ring-yellow-500`}
          >
            <option value="" disabled className="text-gray-400">
              Select Gender
            </option>
            <option value="F" className="text-white bg-gray-800">
              Female
            </option>
            <option value="M" className="text-white bg-gray-800">
              Male
            </option>
            <option value="O" className="text-white bg-gray-800">
              Other
            </option>
          </select>
          {errors.producerGender && (
            <p className="mt-1 text-xs text-red-500 text-left">
              {errors.producerGender}
            </p>
          )}
        </div>
        <div>
          <DatePicker
            selected={
              formData.producer.dob ? new Date(formData.producer.dob) : null
            }
            onChange={(date) => handleChange("producer.dob", date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
            placeholderText="Select Producer DOB"
            className={`w-full px-3 py-2 bg-gray-700 text-white border ${
              errors.producerDob ? "border-red-500" : "border-gray-600"
            } rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400`}
          />
          {errors.producerDob && (
            <p className="mt-1 text-xs text-red-500 text-left">
              {errors.producerDob}
            </p>
          )}
        </div>
        <div>
          <textarea
            value={formData.producer.bio}
            onChange={(e) => handleChange("producer.bio", e.target.value)}
            placeholder="Enter producer bio"
            rows="4"
            className={`w-full px-3 py-2 bg-gray-700 text-white border ${
              errors.producerBio ? "border-red-500" : "border-gray-600"
            } rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400 resize-y`}
          />
          {errors.producerBio && (
            <p className="mt-1 text-xs text-red-500 text-left">
              {errors.producerBio}
            </p>
          )}
        </div>
        {formData.actors.map((actor, index) => (
          <div
            key={index}
            className="bg-gray-700 p-5 rounded-lg border border-gray-600 space-y-4 relative"
          >
            {formData.actors.length > 1 && (
              <button
                type="button"
                onClick={() => removeActorField(index)}
                className="absolute -top-3 -right-3 p-1 cursor-pointer bg-white text-white rounded-full transition duration-200"
                disabled={formData.actors.length === 1}
              >
                <TrashIcon className="size-6 text-red-500" />
              </button>
            )}
            <div>
              <input
                value={actor.name}
                onChange={(e) => handleChange("name", e.target.value, index)}
                placeholder="Actor Name"
                className={`w-full px-3 py-2 bg-gray-600 text-white border ${
                  errors[`actorName${index}`]
                    ? "border-red-500"
                    : "border-gray-500"
                } rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400`}
              />
              {errors[`actorName${index}`] && (
                <p className="mt-1 text-xs text-red-500 text-left">
                  {errors[`actorName${index}`]}
                </p>
              )}
            </div>
            <div>
              <select
                value={actor.gender}
                onChange={(e) => handleChange("gender", e.target.value, index)}
                className={`w-full px-3 py-2 bg-gray-600 text-white border ${
                  errors[`actorGender${index}`]
                    ? "border-red-500"
                    : "border-gray-600"
                } rounded focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              >
                <option value="" disabled className="text-gray-400">
                  Select Gender
                </option>
                <option value="F" className="text-white bg-gray-800">
                  Female
                </option>
                <option value="M" className="text-white bg-gray-800">
                  Male
                </option>
                <option value="O" className="text-white bg-gray-800">
                  Other
                </option>
              </select>
              {errors[`actorGender${index}`] && (
                <p className="mt-1 text-xs text-red-500 text-left">
                  {errors[`actorGender${index}`]}
                </p>
              )}
            </div>
            <div>
              <DatePicker
                selected={actor.dob ? new Date(actor.dob) : null}
                onChange={(date) => handleChange("dob", date, index)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()}
                placeholderText="Select Actor DOB"
                className={`w-full px-3 py-2 bg-gray-600 text-white border ${
                  errors[`actorDob${index}`]
                    ? "border-red-500"
                    : "border-gray-500"
                } rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400`}
              />
              {errors[`actorDob${index}`] && (
                <p className="mt-1 text-xs text-red-500 text-left">
                  {errors[`actorDob${index}`]}
                </p>
              )}
            </div>
            <div>
              <textarea
                value={actor.bio}
                onChange={(e) => handleChange("bio", e.target.value, index)}
                placeholder="Bio"
                rows="4"
                className={`w-full px-3 py-2 bg-gray-600 text-white border ${
                  errors[`actorBio${index}`]
                    ? "border-red-500"
                    : "border-gray-500"
                } rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400`}
              />
              {errors[`actorBio${index}`] && (
                <p className="mt-1 text-xs text-red-500 text-left">
                  {errors[`actorBio${index}`]}
                </p>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addActorField}
          className="w-full px-3 py-2 cursor-pointer bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-200"
        >
          Add Actor
        </button>
        <button
          type="submit"
          disabled={moviesLoading.loading}
          className="w-full flex items-center gap-4 justify-center px-3 py-2 cursor-pointer bg-yellow-600 text-white rounded hover:bg-yellow-700 transition duration-200 disabled:bg-yellow-400 disabled:cursor-not-allowed"
        >
          {moviesLoading.loading && <Loader2 className="animate-spin" />}
          Add Movie
        </button>
      </form>
    </div>
  );
}
