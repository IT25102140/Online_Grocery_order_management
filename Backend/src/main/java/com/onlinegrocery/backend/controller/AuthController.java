package com.onlinegrocery.backend.controller;

import com.onlinegrocery.backend.model.*;
import com.onlinegrocery.backend.service.UserService;
import com.onlinegrocery.backend.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AdminService adminService;

    public AuthController(UserService userService, AdminService adminService) {
        this.userService = userService;
        this.adminService = adminService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            if (user.getRole() == null) user.setRole(UserRole.REGULAR);
            User created = userService.createUser(user);
            String token = userService.generateToken(created);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                new LoginResponse(token, created.getUserId(), created.getName(), created.getRole().name())
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.login(request.getEmail(), request.getPassword());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid email or password."));
        }
        String token = userService.generateToken(user);
        return ResponseEntity.ok(new LoginResponse(token, user.getUserId(), user.getName(), user.getRole().name()));
    }

    @PostMapping("/admin-login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest request) {
        // For admin login, email field is used as admin name
        AdminUser admin = adminService.verifyAdmin(request.getEmail(), request.getPassword());
        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid admin credentials."));
        }
        String token = adminService.generateAdminToken(admin);
        return ResponseEntity.ok(Map.of("token", token, "adminId", admin.getAdminId(), "name", admin.getName()));
    }
}
