import React, { useState } from "react";
import { Autocomplete, TextField, Paper, Typography, Grid } from "@mui/material";

const courseList = [
  { id: 1, title: "Java Programming", description: "Master the basics of Java." },
  { id: 4, title: "Python for Data Science", description: "Learn Python in data analysis." },
  { id: 5, title: "Kotlin", description: "Learn the Basics of Kotlin by creating Apps." },
  { id: 7, title: "Introduction to Networking", description: "Understanding the core of Networks." },
  { id: 3, title: "Spring", description: "Learn the Basics of Spring." },
];

export default function CourseSearch() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleCourseSelect = (event, value) => {
    setSelectedCourse(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const match = courseList.find(course =>
        course.title.toLowerCase().includes(inputValue.toLowerCase())
      );
      if (match) {
        setSelectedCourse(match);
      }
    }
  };

  return (
    <div>

      {selectedCourse && (
        <Paper elevation={3} style={{ marginTop: 20, padding: 20 }}>
          <Typography variant="h5">{selectedCourse.title}</Typography>
          <Typography variant="body1">{selectedCourse.description}</Typography>
        </Paper>
      )}
    </div>
  );
}
