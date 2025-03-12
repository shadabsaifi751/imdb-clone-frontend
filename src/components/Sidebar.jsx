import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setNavSidebarOpen } from "../redux/sidebarSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const isNavSidebarOpen = useSelector(
    (state) => state.sidebar.isNavSidebarOpen
  );
  const dispatch = useDispatch();

  if (!isNavSidebarOpen) return null;

  const closeSidebar = () => {
    dispatch(setNavSidebarOpen(false));
  };

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <>
      <AnimatePresence>
        {isNavSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-30"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNavSidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 right-0 h-screen w-2/3 sm:w-1/2 bg-[#0b121f] text-white p-4 shadow-lg z-40 sidebar-motion"
          >
            <button
              onClick={closeSidebar}
              className="ml-auto mt-5 cursor-pointer block"
            >
              <XMarkIcon className="size-8 text-white" />
            </button>
            <nav className="space-y-3 mt-5 pb-10">
              {["Home", "Profile", "Dashboard", "Settings", "Contact Us"].map(
                (item, index) => (
                  <motion.div
                    key={item}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                  >
                    <a
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      onClick={closeSidebar}
                      className="block px-4 text-xl font-semibold text-right py-2 rounded transition"
                    >
                      <span className="inline-block hover:text-yellow-600">
                        {item}
                      </span>
                    </a>
                  </motion.div>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
