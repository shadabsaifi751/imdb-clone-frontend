import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, deleteMovie } from "../redux/actions/movieActions.js";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ContentLoader } from "../components/Loader.jsx";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movies, loading, error } = useSelector((state) => state.movies);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      dispatch(deleteMovie(id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 h-screen">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-center">Movies Collection</h2>
        <button
          onClick={() => navigate(`/add`)}
          className="bg-yellow-600 text-white font-semibold px-3 py-1 rounded-md cursor-pointer hover:bg-yellow-600"
        >
          Add Movies
        </button>
      </div>

      {loading && (
        <div className="h-[250px] flex items-center justify-center">
          <ContentLoader size={20} showMessage={true} />
        </div>
      )}
      {error && (
        <div className="h-[250px] flex items-center justify-center">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-500 shadow-md rounded-lg">
            <thead className="bg-[#0b121f] text-white">
              <tr>
                <th className="py-3 px-4 text-left">SR</th>
                <th className="py-3 px-4 text-left">Profile</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Year</th>
                <th className="py-3 px-4 text-left">Producer</th>
                <th className="py-3 px-4 text-left">Actors</th>
                {token && <th className="py-3 px-4 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {movies.length > 0 ? (
                movies.length > 0 &&
                movies.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-t text-left border-gray-500 bg-black hover:bg-gray-900"
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">
                      <img
                        src={item.poster}
                        alt={item.name}
                        className="rounded-full h-[50px] w-[50px] object-cover object-center"
                      />
                    </td>
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.year_of_release}</td>
                    <td className="py-2 px-4">
                      {item?.producer_id?.name || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {item.actors.map((a) => a.name).join(", ")}
                    </td>
                    {token && (
                      <td className="py-2 px-4 flex justify-center">
                        <button
                          onClick={() => navigate(`/edit/${item._id}`)}
                          className="text-white p-1 rounded-md cursor-pointer"
                        >
                          <PencilSquareIcon className="size-6 text-white" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className=" p-1 rounded-md cursor-pointer"
                        >
                          <TrashIcon className="size-6 text-red-500" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className="h-[250px] flex items-center bg-black justify-center">
                      <p className="text-base md:text-xl">
                        No movies available
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
