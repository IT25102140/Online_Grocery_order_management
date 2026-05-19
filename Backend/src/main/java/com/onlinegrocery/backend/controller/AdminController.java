package com.onlinegrocery.backend.controller;

import com.onlinegrocery.backend.model.ShopSettings;
import com.onlinegrocery.backend.model.User;
import com.onlinegrocery.backend.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ShopSettingsService shopSettingsService;
    private final UserService userService;
    private final AdminService adminService;

    public AdminController(ShopSettingsService shopSettingsService, UserService userService, AdminService adminService) {
        this.shopSettingsService = shopSettingsService;
        this.userService = userService;
        this.adminService = adminService;
    }

    // --- Shop Settings ---
    @GetMapping("/settings")
    public ResponseEntity<ShopSettings> getSettings() {
        return ResponseEntity.ok(shopSettingsService.getSettings());
    }

    @PutMapping("/settings")
    public ResponseEntity<ShopSettings> updateSettings(@RequestBody ShopSettings settings) {
        return ResponseEntity.ok(shopSettingsService.saveSettings(settings));
    }

    // --- Customer Management ---
    @GetMapping("/customers")
    public ResponseEntity<List<User>> getAllCustomers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/customers/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
