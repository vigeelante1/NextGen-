package com.vigeelante1.NextGen.controller;
import com.vigeelante1.NextGen.entities.Course;
import com.vigeelante1.NextGen.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    // ✅ Get all courses
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseRepository.findAll());
    }

    // ✅ Get a specific course by ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Optional<Course> course = courseRepository.findByIdWithLearningPoints(id); // 🔄 changed method
        return course.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }





}
