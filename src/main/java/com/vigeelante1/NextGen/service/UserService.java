package com.vigeelante1.NextGen.service;

import com.vigeelante1.NextGen.entities.User;
import com.vigeelante1.NextGen.repository.UserRepository;
import com.vigeelante1.NextGen.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ Register user and send verification email
    public User register(User user) {
        user.setVerified(false);
        User savedUser = userRepository.save(user);

        // Generate JWT token using email
        String token = jwtUtil.generateToken(savedUser.getEmail());

        // Send email with verification token
        emailService.sendVerificationEmail(savedUser.getEmail(), token);

        return savedUser;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }


    // ✅ Authenticate user by email and password
    public User authenticate(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmailAndPassword(email, password);
        return userOptional.orElse(null);
    }

    // ✅ Verify user email using decoded JWT
    public boolean verifyUser(String token) {
        String email = jwtUtil.extractEmail(token); // extractUsername gives email
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmail(email));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setVerified(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
