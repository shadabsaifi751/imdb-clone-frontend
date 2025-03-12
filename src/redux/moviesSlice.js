import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "./actions/movieActions";

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Movie
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Movie
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.movies.findIndex(
          (movie) => movie._id === action.payload.id
        );
        if (index !== -1) state.movies[index] = action.payload;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Movie
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = state.movies.filter(
          (movie) => movie._id !== action.payload
        );
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
