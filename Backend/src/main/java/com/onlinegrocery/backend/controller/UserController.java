package com.onlinegrocery.backend.controller;

import com.onlinegrocery.backend.model.User;
import com.onlinegrocery.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) { this.userService = userService; }

    @PostMapping("/add")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try { return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED); }
        catch (IllegalArgumentException e) { return ResponseEntity.status(HttpStatus.CONFLICT).build(); }
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/update")
    public ResponseEntity<User> update(@RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
