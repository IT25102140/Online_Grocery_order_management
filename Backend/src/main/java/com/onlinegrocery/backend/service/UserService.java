package com.onlinegrocery.backend.service;

import com.onlinegrocery.backend.exception.UserNotFoundException;
import com.onlinegrocery.backend.model.User;
import com.onlinegrocery.backend.util.JsonFileHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private static final String FILE_PATH = "users.json";
    private final JsonFileHandler<User> fileHandler;
    private final TypeReference<List<User>> typeReference;

    public UserService(JsonFileHandler<User> fileHandler) {
        this.fileHandler = fileHandler;
        this.typeReference = new TypeReference<List<User>>() {};
    }

    public User createUser(User user) {
        List<User> users = fileHandler.readFromFile(FILE_PATH, typeReference);
        // Check duplicate email
        if (users.stream().anyMatch(u -> u.getEmail().equals(user.getEmail()))) {
            throw new IllegalArgumentException("User with email " + user.getEmail() + " already exists.");
        }
        if (user.getUserId() == null || user.getUserId().isEmpty()) {
            user.setUserId("U-" + UUID.randomUUID().toString().substring(0, 8));
        }
        users.add(user);
        fileHandler.writeToFile(FILE_PATH, users);
        return user;
    }

    public User login(String email, String password) {
        List<User> users = fileHandler.readFromFile(FILE_PATH, typeReference);
        return users.stream()
            .filter(u -> u.getEmail().equals(email) && u.getPassword().equals(password))
            .findFirst()
            .orElse(null);
    }

    public String generateToken(User user) {
        String raw = user.getUserId() + ":" + System.currentTimeMillis() + ":freshcart-user-secret";
        return java.util.Base64.getEncoder().encodeToString(raw.getBytes());
    }

    public List<User> getAllUsers() {
        return fileHandler.readFromFile(FILE_PATH, typeReference);
    }

    public User getUserById(String userId) {
        List<User> users = fileHandler.readFromFile(FILE_PATH, typeReference);
        return users.stream()
            .filter(u -> u.getUserId().equals(userId))
            .findFirst()
            .orElseThrow(() -> new UserNotFoundException("User not found."));
    }

    public User updateUser(User updatedUser) {
        List<User> users = fileHandler.readFromFile(FILE_PATH, typeReference);
        boolean found = false;
        for (User user : users) {
            if (user.getUserId().equals(updatedUser.getUserId())) {
                user.setName(updatedUser.getName());
                user.setEmail(updatedUser.getEmail());
                user.setPassword(updatedUser.getPassword());
                user.setRole(updatedUser.getRole());
                found = true;
                break;
            }
        }
        if (!found) throw new UserNotFoundException("User not found.");
        fileHandler.writeToFile(FILE_PATH, users);
        return updatedUser;
    }

    public void deleteUser(String id) {
        List<User> users = fileHandler.readFromFile(FILE_PATH, typeReference);
        if (!users.removeIf(u -> u.getUserId().equals(id))) {
            throw new UserNotFoundException("User not found.");
        }
        fileHandler.writeToFile(FILE_PATH, users);
    }
}
