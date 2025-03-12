import {
  Bars3BottomRightIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setNavSidebarOpen } from "../redux/sidebarSlice";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const Header = () => {
  const dispatch = useDispatch();
  const sideNav = useSelector((state) => state.sidebar.isNavSidebarOpen);
  const isLoggedIn = useSelector((state) => state.auth.token);

  const toggleNavSidebar = () => {
    dispatch(setNavSidebarOpen(!sideNav));
  };

  return (
    <>
      <header className="bg-[#0b121f] z-20 sticky top-0 left-0 gap-2  p-4 px-5 md:px-10 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-500">IMDB.</Link>

        <form className="min-w-lg hidden md:block mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <MagnifyingGlassIcon className="size-6 text-yellow-500" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full px-4 py-2 ps-10 text-sm text-yellow border border-yellow-300 rounded-lg bg-black focus:ring-yellow-500 outline-none focus:border-yellow-500 "
              placeholder="Search Movies Name..."
              required
            />
          </div>
        </form>

        <div className="flex space-x-2">
          <UserMenu isLogin={isLoggedIn} />
          <button
            onClick={toggleNavSidebar}
            className="text-gray-500 ms-2 block md:hidden cursor-pointer hover:text-gray-700 relative"
          >
            <Bars3BottomRightIcon className="size-8 text-white" />
          </button>
        </div>
      </header>
      <Sidebar />
    </>
  );
};

export default Header;
