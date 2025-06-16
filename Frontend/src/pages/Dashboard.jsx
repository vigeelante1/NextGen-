import React from "react";
import "../pages/Dashboard.css";

const Dashboard = () => {
  const courses = [
    { name: "React Development", progress: 75 },
    { name: "Spring Boot", progress: 50 },
    { name: "Java Programming", progress: 30 },
  ];

  return (
    <div className="dashboard">
      <h1>Your Learning Progress</h1>
      <p>Keep track of your progress and complete your courses!</p>
      <div className="progress-container">
        {courses.map((course, index) => (
          <div key={index} className="course-progress">
            <h3>{course.name}</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p>{course.progress}% completed</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
