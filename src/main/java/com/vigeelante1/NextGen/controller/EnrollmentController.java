package com.vigeelante1.NextGen.controller;

import com.vigeelante1.NextGen.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping("/enroll")
    public ResponseEntity<String> enrollUser(@RequestParam Long userId, @RequestParam Long courseId) {
        String response = enrollmentService.enrollUserToCourse(userId, courseId);
        if (response.equals("Enrollment successful")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}
