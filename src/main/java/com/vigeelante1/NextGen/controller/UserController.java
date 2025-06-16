package com.vigeelante1.NextGen.controller;

import com.vigeelante1.NextGen.entities.User;
import com.vigeelante1.NextGen.payload.AuthResponse;
import com.vigeelante1.NextGen.security.JwtUtil;
import com.vigeelante1.NextGen.service.EmailService;
import com.vigeelante1.NextGen.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    @GetMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam("token") String token) {
        String email = jwtUtil.extractEmail(token);
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid verification link.");
        }
        if (user.isVerified()) {
            return ResponseEntity.ok("Email is already verified.");
        }
        user.setVerified(true);
        userService.saveUser(user);
        return ResponseEntity.status(302)
                .header("Location", "http://localhost:5173/verify-success")
                .build();

    }

//    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        User savedUser = userService.register(user);
        String token = jwtUtil.generateToken(savedUser.getEmail());
        emailService.sendVerificationEmail(savedUser.getEmail(), token);
        return ResponseEntity.ok("Signup successful! Please verify your email.");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        if (user != null) {
            if (!user.isVerified()) {
                return ResponseEntity.status(403).body("Please verify your email before logging in.");
            }
            String token = jwtUtil.generateToken(user.getEmail());
            return ResponseEntity.ok(new AuthResponse(token));
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}
