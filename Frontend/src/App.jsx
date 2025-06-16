import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";
import SearchResults from "./pages/SearchResults";
import VerifiedSuccess from "./pages/VerifiedSuccess";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// ✅ Layout with Navbar and Footer
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <Routes>
        {/* ✅ Route without Navbar/Footer */}
        <Route path="/verify-success" element={<VerifiedSuccess />} />

        {/* ✅ Routes with Navbar/Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/search" element={<SearchResults />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
