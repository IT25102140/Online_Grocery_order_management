package com.onlinegrocery.backend.service;

import com.onlinegrocery.backend.model.Supplier;
import com.onlinegrocery.backend.util.JsonFileHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {
    private static final String FILE_PATH = "suppliers.json";
    private final JsonFileHandler<Supplier> fileHandler;
    private final TypeReference<List<Supplier>> typeReference;

    public SupplierService(JsonFileHandler<Supplier> fileHandler) {
        this.fileHandler = fileHandler;
        this.typeReference = new TypeReference<List<Supplier>>() {};
    }

    public List<Supplier> getAllSuppliers() {
        return fileHandler.readFromFile(FILE_PATH, typeReference);
    }

    public Optional<Supplier> getSupplierById(String supplierId) {
        return fileHandler.readFromFile(FILE_PATH, typeReference).stream()
                .filter(s -> s.getSupplierId().equals(supplierId))
                .findFirst();
    }

    public Supplier addSupplier(Supplier supplier) {
        List<Supplier> suppliers = fileHandler.readFromFile(FILE_PATH, typeReference);
        if (suppliers.stream().anyMatch(s -> s.getSupplierId().equals(supplier.getSupplierId()))) {
            throw new IllegalArgumentException("Supplier already exists.");
        }
        suppliers.add(supplier);
        fileHandler.writeToFile(FILE_PATH, suppliers);
        return supplier;
    }

    public Supplier updateSupplier(Supplier updatedSupplier) {
        List<Supplier> suppliers = fileHandler.readFromFile(FILE_PATH, typeReference);
        boolean found = false;
        for (int i = 0; i < suppliers.size(); i++) {
            if (suppliers.get(i).getSupplierId().equals(updatedSupplier.getSupplierId())) {
                suppliers.set(i, updatedSupplier);
                found = true;
                break;
            }
        }
        if (!found) {
            throw new RuntimeException("Supplier not found.");
        }
        fileHandler.writeToFile(FILE_PATH, suppliers);
        return updatedSupplier;
    }

    public void deleteSupplier(String supplierId) {
        List<Supplier> suppliers = fileHandler.readFromFile(FILE_PATH, typeReference);
        if (!suppliers.removeIf(s -> s.getSupplierId().equals(supplierId))) {
            throw new RuntimeException("Supplier not found.");
        }
        fileHandler.writeToFile(FILE_PATH, suppliers);
    }
}
