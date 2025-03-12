import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import PageLoader from "./components/Loader";

// Lazy loading components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddMoviePage = lazy(() => import("./pages/AddMoviePage"));
const EditMoviePage = lazy(() => import("./pages/EditMoviePage"));

function App() {
  const token = useSelector((state) => state.auth.token);

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  const AuthRoute = ({ children }) => {
    return !token ? children : <Navigate to="/dashboard" />;
  };

  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Public routes - Only accessible when not logged in */}
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthRoute>
                  <Signup />
                </AuthRoute>
              }
            />

            {/* Protected route - Only accessible when logged in */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <AddMoviePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <EditMoviePage />
                </PrivateRoute>
              }
            />
            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
