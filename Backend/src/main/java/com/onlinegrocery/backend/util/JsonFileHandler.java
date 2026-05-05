package com.onlinegrocery.backend.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JsonFileHandler<T> {
    private final ObjectMapper mapper = new ObjectMapper();

    private static final String DATA_DIR = "data/";

    public JsonFileHandler() {
        File dir = new File(DATA_DIR);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    public synchronized List<T> readFromFile(String filePath, TypeReference<List<T>> typeReference) {
        try {
            File file = new File(DATA_DIR + filePath);
            if (!file.exists()) { return new ArrayList<>(); }
            return mapper.readValue(file, typeReference);
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    public synchronized void writeToFile(String filePath, List<T> dataList) {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(new File(DATA_DIR + filePath), dataList);
        } catch (IOException e) {
            System.err.println("Error writing to file: " + e.getMessage());
            throw new RuntimeException("Failed to save data to file", e);
        }
    }

    public synchronized Object dumpFileContents(String fileName) {
        try {
            File file = new File(DATA_DIR + fileName + ".json");
            if (!file.exists()) { return null; }
            return mapper.readValue(file, Object.class);
        } catch (IOException e) {
            System.err.println("Error dumping raw file: " + e.getMessage());
            throw new RuntimeException("Failed to read generic file data", e);
        }
    }
}
