import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, setAuthToken } from "../../services/api";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { getState }) => {
    const { auth } = getState();
    setAuthToken(auth.token);
    const response = await axiosInstance.get("/movies");
    return response.data.movies;
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData, { getState }) => {
    const { auth } = getState();
    setAuthToken(auth.token);
    const response = await axiosInstance.post("/movies", movieData);
    return response.data;
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, movieData }, { getState }) => {
    const { auth } = getState();
    setAuthToken(auth.token);
    const response = await axiosInstance.put(`/movies/${id}`, movieData);
    return { ...response.data, id: response.data._id }; // Normalize id to match reducer
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id, { getState }) => {
    const { auth } = getState();
    setAuthToken(auth.token);
    await axiosInstance.delete(`/movies/${id}`);
    return id;
  }
);

// auth async function
export const signup = createAsyncThunk("auth/sign-up", async (credentials) => {
  const response = await axiosInstance.post("/auth/sign-up", credentials);
  return response.data.token;
});

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data.token;
});
