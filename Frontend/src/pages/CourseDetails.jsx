import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CourseDetails.css';
import Swal from 'sweetalert2';
import { Typography, Box, Grid, Paper, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/courses/${id}`)
      .then((response) => setCourse(response.data))
      .catch((err) => console.error('Error loading course:', err));
  }, [id]);

  const handleEnroll = () => {
    Swal.fire({
      title: '🎁 Got a Discount Code?',
      html: `
        <p style="margin-bottom: 10px;">Enter it below to get a discount!</p>
        <input type="text" id="discountCode" class="swal2-input" placeholder="e.g. HALF50" />
      `,
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      imageWidth: 80,
      imageHeight: 80,
      imageAlt: 'Enrollment Icon',
      background: '#f0f8ff',
      showCancelButton: true,
      confirmButtonText: '🎓 Avail Now',
      cancelButtonText: 'Decline Offer',
      confirmButtonColor: '#1976d2',
      cancelButtonColor: '#9e9e9e',
      customClass: {
        popup: 'enroll-popup',
        confirmButton: 'mui-confirm-btn',
        cancelButton: 'mui-cancel-btn',
      },
      preConfirm: () => {
        const code = document.getElementById('discountCode').value.trim();
        if (code) {
          if (code.toLowerCase() === 'half50') {
            toast.success('🎉 50% Off Applied!');
          } else {
            toast.warning('⚠️ Invalid Discount Code');
          }
        } else {
          toast.info('ℹ️ No Discount Code Used');
        }

        return code; // Pass this to `.then()` if needed
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '✅ Enrollment Complete!',
          text: 'Welcome to the course. Let’s start learning!',
          icon: 'success',
          confirmButtonColor: '#1976d2',
          timer: 2500,
          timerProgressBar: true,
        });
      }
    });
  };


  if (!course) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ backgroundColor: '#e6f0fa', minHeight: '100vh', py: 6 }}>
      <ToastContainer position="bottom-center" autoClose={3000} />

      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          {course.thumbnail_url && (
            <img
              src={course.thumbnail_url}
              alt={`${course.title} Logo`}
              style={{
                width: '100%',
                maxWidth: '300px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                marginBottom: '20px',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}

          <Typography variant="h3" fontWeight={700} gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Instructor: <strong>{course.instructor}</strong>
          </Typography>
          <Typography variant="h6" color="success.main" gutterBottom>
            ₹{course.price}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {course.description}
          </Typography>

          <button className="enroll-button" onClick={handleEnroll}>
            Enroll Now
          </button>

          {/* Static MUI section */}
          <Box mt={5}>
            <Paper elevation={1} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#f9fbfe' }}>
              <Grid container spacing={3} justifyContent="space-between">
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    9 course series
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Create Production Level Apps
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    4.2 ⭐
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    (279 reviews)
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Beginner level
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No experience required
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    2 month
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    4 hrs/week
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Flexible schedule
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Learn at your pace
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Paper>

        {/* Learning Points */}
        {course.learningPoints?.length > 0 && (
          <Box mt={5}>
            <Paper elevation={2} sx={{ padding: 3, borderRadius: 2 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                What You Will Learn
              </Typography>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {course.learningPoints.map((lp, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <CheckCircleIcon sx={{ color: '#10b981', mr: 1 }} />
                    <Typography variant="body1">{lp.point}</Typography>
                  </li>
                ))}
              </ul>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CourseDetails;
