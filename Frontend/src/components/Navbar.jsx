import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ✅ include useLocation
import { FaSearch } from "react-icons/fa";
import "../components/Navbar.css";

function Navbar() {
  const [query, setQuery] = useState("");
  const [mainResult, setMainResult] = useState(null);
  const [relatedResults, setRelatedResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ get current route
  const isLoggedIn = !!localStorage.getItem("token");

  const allCourses = [
    { id: 1, title: "Java Programming" },
    { id: 3, title: "Spring Boot" },
    { id: 1, title: "Java with DSA" },
    { id: 4, title: "Python Basics" },
    { id: 2, title: "ReactJS" },
    { id: 3, title: "Spring" },
    { id: 6, title: "Aws"},
  ];

  useEffect(() => {
    if (!query.trim()) {
      setMainResult(null);
      setRelatedResults([]);
      return;
    }

    const filtered = allCourses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );

    const exactMatch = filtered.find(course =>
      course.title.toLowerCase() === query.toLowerCase()
    );

    const related = filtered.filter(course =>
      course.title.toLowerCase() !== query.toLowerCase()
    );

    setMainResult(exactMatch || null);
    setRelatedResults(related || []);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(query)}`);
      setMainResult(null);
      setRelatedResults([]);
    }
  };

  const handleSuggestionClick = (id) => {
    navigate(`/courses/${id}`);
    setQuery("");
    setMainResult(null);
    setRelatedResults([]);
  };

  // ✅ Conditionally hide search bar on login and signup pages
  const hideSearchBar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="site-title">NextGen</h2>
      </div>

      {/* ✅ Show only if not login/signup */}
      {!hideSearchBar && (
        <div className="navbar-center">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search courses..."
              className="search-bar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {(mainResult || relatedResults.length > 0) && (
              <ul className="suggestion-box">
                {mainResult && (
                  <li onClick={() => handleSuggestionClick(mainResult.id)}>
                    {mainResult.title}
                  </li>
                )}
                {relatedResults.length > 0 && (
                  <>
                    <li className="suggestion-heading">
                      Do you also want to search for:
                    </li>
                    {relatedResults.map((course) => (
                      <li
                        key={course.id}
                        onClick={() => handleSuggestionClick(course.id)}
                      >
                        {course.title}
                      </li>
                    ))}
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="navbar-right">
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          {!isLoggedIn ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          ) : (
            <li><Link to="/dashboard">Dashboard</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
