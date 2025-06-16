package com.vigeelante1.NextGen.controller;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SecureController {

    @GetMapping("/protected")
    public ResponseEntity<String> secretData() {
        return ResponseEntity.ok("You are authenticated and can access protected data!");
    }

//    @GetMapping("/api/protected")
//    public ResponseEntity<String> testProtectedEndpoint(Authentication authentication) {
//        String email = (String) authentication.getPrincipal();
//        return ResponseEntity.ok("Welcome, " + email + "! You are authenticated.");
//    }

}
