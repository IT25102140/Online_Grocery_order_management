package com.onlinegrocery.backend.service;

import com.onlinegrocery.backend.model.ShopSettings;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;

@Service
public class ShopSettingsService {
    private static final String FILE_PATH = "data/shop.json";
    private final ObjectMapper mapper = new ObjectMapper();

    public ShopSettingsService() {
        File file = new File(FILE_PATH);
        if (!file.exists()) {
            ShopSettings defaults = new ShopSettings();
            defaults.setStoreStatus("OPEN");
            defaults.setTaxRate(0.08);
            defaults.setCurrency("USD");
            defaults.setStoreName("FreshCart");
            saveSettings(defaults);
        }
    }

    public synchronized ShopSettings getSettings() {
        try {
            File file = new File(FILE_PATH);
            if (!file.exists()) return new ShopSettings();
            return mapper.readValue(file, ShopSettings.class);
        } catch (IOException e) {
            System.err.println("Error reading shop settings: " + e.getMessage());
            return new ShopSettings();
        }
    }

    public synchronized ShopSettings saveSettings(ShopSettings settings) {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(new File(FILE_PATH), settings);
        } catch (IOException e) {
            System.err.println("Error writing shop settings: " + e.getMessage());
            throw new RuntimeException("Failed to save shop settings", e);
        }
        return settings;
    }
}
