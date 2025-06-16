import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from backend
    axios.get('http://localhost:8080/api/courses')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div className="main-content px-4 py-8">
      <h1 className="welcome-heading text-3xl font-bold mb-2">Welcome to NextGen Learning</h1>
      <p className="sub-heading text-gray-600 mb-6">
        Learn the latest technologies and enhance your skills with our curated courses.
      </p>
      <h2 className="hot-picks text-xl font-semibold mb-4">🔥 Hot Picks for You</h2>

      <div className="course-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div className="course-card border rounded-xl shadow-lg p-4 bg-white" key={course.id}>
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{course.description}</p>
            <p className="text-sm text-gray-500 mb-2"><strong>Instructor:</strong> {course.instructor}</p>
            <p className="text-sm text-gray-500 mb-4"><strong>Price:</strong> ₹{course.price}</p>
            <Link to={`/courses/${course.id}`}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
