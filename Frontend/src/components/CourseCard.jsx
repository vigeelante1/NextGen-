import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <Card onClick={handleClick} sx={{ cursor: 'pointer', minWidth: 275, m: 2 }}>
      <CardContent>
        <img src={course.thumbnail_url} alt={course.title} height="100" />
        <Typography variant="h6">{course.title}</Typography>
        <Typography>Instructor: {course.instructor}</Typography>
        <Typography>Price: ₹{course.price}</Typography>
        <Button variant="contained" onClick={handleClick}>Enroll Now</Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
