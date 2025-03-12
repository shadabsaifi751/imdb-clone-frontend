import React, { useCallback, useEffect, useRef, useState } from "react";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { fetchMovies } from "../redux/actions/movieActions";
import { useDispatch, useSelector } from "react-redux";
import { ContentLoader } from "../components/Loader";

export default function Home() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [selectedMovieId, setSelectedMovieId] = useState(0);
  const { movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Auto-scroll effect when there are more than 5 movies
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (movies.length > 5 && scrollContainer) {
      const scrollWidth =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;
      let scrollPosition = 0;
      const scrollSpeed = 1; // Adjust speed as needed
      const interval = setInterval(() => {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= scrollWidth) {
          scrollPosition = 0; // Reset to start
        }
        scrollContainer.scrollLeft = scrollPosition;
      }, 30); // Adjust interval for smoother/faster scrolling

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [movies.length]);

  const MovieDetailHandle = useCallback((id) => {
    setSelectedMovieId(id);
  }, []);

  const moviesDetails =
    movies.length > 0 && movies.find((item, key) => key === selectedMovieId);

  if (error)
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  if (loading)
    return (
      <div className="h-[500px] flex items-center justify-center">
        <ContentLoader size={20} color="#666666" showMessage={true} />
      </div>
    );
  if (!movies?.length)
    return (
      <div className="h-[500px] flex items-center justify-center">
        <div>No movies available</div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="w-full sm:px-6 lg:px-8 mb-10">
        {/* Main Container */}
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-xl lg:text-2xl sm:text-3xl font-semibold text-white">
                {moviesDetails?.name}
              </h1>
            </div>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <button
                type="button"
                aria-label="Add to bookmark"
                className="text-nowrap flex gap-2 items-center cursor-pointer px-2 md:px-4 py-1 bg-yellow-500 text-black text-xs sm:text-base font-medium rounded hover:bg-yellow-400"
              >
                <BookmarkIcon className="size-5 text-black" /> Add to bookmark
              </button>
            </div>
          </div>

          {/* Poster and Details Section */}
          <div className="grid grid-cols-1 gap-4">
            {/* Poster */}
            <div className="w-full">
              <img
                src={moviesDetails?.poster}
                alt={moviesDetails?.name}
                className="w-full h-[350px] object-cover object-top rounded-lg shadow-lg"
              />
            </div>

            {/* movieHomeData Details */}
            <div className="flex-1">
              {/* Plot */}

              {/* Release Date and Watchlist */}
              <div className="flex text-left gap-8 flex-col sm:flex-row justify-between items-start sm:items-start mb-4">
                <p className="text-gray-300 text-left text-sm sm:text-base mb-4">
                  {moviesDetails?.plot}
                </p>
              </div>

              {/* Director and Writer */}
              <div className="text-gray-300 text-left text-sm sm:text-base">
                <p className="py-2 border-b border-b-yellow-900">
                  <span className="text-gray-400 mr-3">Release:</span>{" "}
                  {moviesDetails?.year_of_release}
                </p>
                <div className="py-2 flex gap-2 border-b border-b-yellow-900">
                  <p className="text-gray-400">Producer:</p>
                  <div className="flex items-start gap-5">
                    <div className="">
                      <h3 className="text-sm sm:text-base font-medium text-white">
                        {moviesDetails?.producer_id?.name || "Unknown Producer"}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400">
                        Gender: {moviesDetails?.producer_id?.gender || "NA"}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400">
                        DOB: {moviesDetails?.producer_id?.dob || "NA"}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-300 mt-2">
                        {moviesDetails?.producer_id?.bio || "NA"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2 flex gap-8">
                  <p className="text-gray-400">Actor:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-5">
                    {moviesDetails?.actors?.length > 0 &&
                      moviesDetails?.actors?.map((actor, index) => (
                        <div key={index}>
                          <h3 className="text-sm sm:text-base font-medium text-white">
                            {actor?.name || "NA"}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-400">
                            Gender: {actor?.gender || "NA"}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-400">
                            DOB: {actor?.dob || "NA"}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-300 mt-2">
                            {actor?.bio || "NA"}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-transparent">
        <h2 className="text-xl text-left sm:text-2xl font-semibold text-yellow-500 mb-4">
          Top 10 on IMDb this week
        </h2>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar space-x-4 pb-4 scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {movies.map((item, index) => (
            <div
              key={index}
              onClick={() => MovieDetailHandle(index)}
              className="min-w-[160px] cursor-pointer sm:min-w-[180px] md:min-w-[200px] w-[300px] flex-shrink-0 bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={item.poster}
                alt={item.name}
                className="w-full h-64 sm:h-72 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm sm:text-base font-medium text-white truncate">
                  {index + 1}.{" "}
                  {item.name.length > 25
                    ? `${item.name.substring(25)}...`
                    : item.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">4.7 ★</p>
                <button className="mt-2 px-2 py-1 cursor-pointer bg-gray-700 text-blue-400 text-xs sm:text-sm rounded hover:bg-gray-600 w-full">
                  ▶ Trailer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
