package com.onlinegrocery.backend.service;

import com.onlinegrocery.backend.model.AdminUser;
import com.onlinegrocery.backend.util.JsonFileHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class AdminService {
    private static final String FILE_PATH = "admin.json";
    private final JsonFileHandler<AdminUser> fileHandler;
    private final TypeReference<List<AdminUser>> typeReference;

    public AdminService(JsonFileHandler<AdminUser> fileHandler) {
        this.fileHandler = fileHandler;
        this.typeReference = new TypeReference<List<AdminUser>>() {};
    }

    public AdminUser verifyAdmin(String name, String password) {
        List<AdminUser> admins = fileHandler.readFromFile(FILE_PATH, typeReference);
        return admins.stream()
            .filter(a -> a.getName().equals(name) && a.getPassword().equals(password))
            .findFirst()
            .orElse(null);
    }

    public String generateAdminToken(AdminUser admin) {
        // Simple token: base64(adminId:timestamp:secret)
        String raw = admin.getAdminId() + ":" + System.currentTimeMillis() + ":freshcart-admin-secret";
        return java.util.Base64.getEncoder().encodeToString(raw.getBytes());
    }

    public boolean validateToken(String token) {
        try {
            String decoded = new String(java.util.Base64.getDecoder().decode(token));
            String[] parts = decoded.split(":");
            if (parts.length < 3) return false;
            return parts[2].equals("freshcart-admin-secret");
        } catch (Exception e) {
            return false;
        }
    }

    public AdminUser createAdmin(AdminUser admin) {
        List<AdminUser> admins = fileHandler.readFromFile(FILE_PATH, typeReference);
        if (admin.getAdminId() == null || admin.getAdminId().isEmpty()) {
            admin.setAdminId("ADMIN-" + UUID.randomUUID().toString().substring(0, 8));
        }
        admins.add(admin);
        fileHandler.writeToFile(FILE_PATH, admins);
        return admin;
    }

    public List<AdminUser> getAllAdmins() {
        return fileHandler.readFromFile(FILE_PATH, typeReference);
    }
}
