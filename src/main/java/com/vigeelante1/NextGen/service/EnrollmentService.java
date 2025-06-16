package com.vigeelante1.NextGen.service;

import com.vigeelante1.NextGen.entities.Course;
import com.vigeelante1.NextGen.entities.Enrollment;
import com.vigeelante1.NextGen.entities.User;
import com.vigeelante1.NextGen.repository.CourseRepository;
import com.vigeelante1.NextGen.repository.EnrollmentRepository;
import com.vigeelante1.NextGen.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public String enrollUserToCourse(Long userId, Long courseId) {
        // Check if user exists
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            return "User not found";
        }

        // Check if course exists
        Optional<Course> courseOpt = courseRepository.findById(courseId);
        if (!courseOpt.isPresent()) {
            return "Course not found";
        }

        // Check if already enrolled
        boolean alreadyEnrolled = enrollmentRepository.existsByUserIdAndCourseId(userId, courseId);
        if (alreadyEnrolled) {
            return "User already enrolled in this course";
        }

        // Enroll
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(userOpt.get());
        enrollment.setCourse(courseOpt.get());
        enrollmentRepository.save(enrollment);

        return "Enrollment successful";
    }
}
