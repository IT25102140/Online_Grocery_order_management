package com.onlinegrocery.backend.controller;

import com.onlinegrocery.backend.model.AdminUser;
import com.onlinegrocery.backend.model.User;
import com.onlinegrocery.backend.service.AdminService;
import com.onlinegrocery.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AdminService adminService;

    public AuthController(UserService userService, AdminService adminService) {
        this.userService = userService;
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.login(request.getEmail(), request.getPassword());
        if (user != null) {
            String token = userService.generateToken(user);
            return ResponseEntity.ok(new AuthResponse(token, user.getUserId(), user.getName(), user.getRole().name()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User newUser = new User();
            newUser.setName(request.getName());
            newUser.setEmail(request.getEmail());
            newUser.setPassword(request.getPassword());
            newUser.setRole(request.getRole() != null ? com.onlinegrocery.backend.model.UserRole.valueOf(request.getRole()) : com.onlinegrocery.backend.model.UserRole.REGULAR);
            
            User createdUser = userService.createUser(newUser);
            String token = userService.generateToken(createdUser);
            
            return ResponseEntity.ok(new AuthResponse(token, createdUser.getUserId(), createdUser.getName(), createdUser.getRole().name()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/admin-login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginRequest request) {
        AdminUser admin = adminService.verifyAdmin(request.getEmail(), request.getPassword());
        if (admin != null) {
            String token = adminService.generateAdminToken(admin);
            return ResponseEntity.ok(new AdminAuthResponse(token, admin.getAdminId(), admin.getName()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    // DTOs
    public static class LoginRequest {
        private String email;
        private String password;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        private String role;
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }

    public static class AuthResponse {
        private String token;
        private String userId;
        private String name;
        private String role;

        public AuthResponse(String token, String userId, String name, String role) {
            this.token = token;
            this.userId = userId;
            this.name = name;
            this.role = role;
        }

        public String getToken() { return token; }
        public String getUserId() { return userId; }
        public String getName() { return name; }
        public String getRole() { return role; }
    }

    public static class AdminAuthResponse {
        private String token;
        private String adminId;
        private String name;

        public AdminAuthResponse(String token, String adminId, String name) {
            this.token = token;
            this.adminId = adminId;
            this.name = name;
        }

        public String getToken() { return token; }
        public String getAdminId() { return adminId; }
        public String getName() { return name; }
    }
}
