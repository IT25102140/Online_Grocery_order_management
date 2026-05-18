package com.onlinegrocery.backend.service;

import com.onlinegrocery.backend.exception.InvalidPriceException;
import com.onlinegrocery.backend.exception.ProductNotFoundException;
import com.onlinegrocery.backend.model.Product;
import com.onlinegrocery.backend.util.JsonFileHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private static final String FILE_PATH = "products.json";
    private final JsonFileHandler<Product> fileHandler;
    private final TypeReference<List<Product>> typeReference;

    public ProductService(JsonFileHandler<Product> fileHandler) {
        this.fileHandler = fileHandler;
        this.typeReference = new TypeReference<List<Product>>() {};
    }

    public Product addProduct(Product newProduct) {
        if (newProduct.getPrice() < 0) throw new InvalidPriceException("Initial price cannot be negative.");
        List<Product> products = fileHandler.readFromFile(FILE_PATH, typeReference);
        if (products.stream().anyMatch(p -> p.getProductId().equals(newProduct.getProductId()))) {
            throw new IllegalArgumentException("Product already exists.");
        }
        products.add(newProduct);
        fileHandler.writeToFile(FILE_PATH, products);
        return newProduct;
    }

    public List<Product> getAllProducts() {
        return fileHandler.readFromFile(FILE_PATH, typeReference);
    }

    public Product updateProduct(Product updatedProduct) {
        List<Product> products = fileHandler.readFromFile(FILE_PATH, typeReference);
        boolean found = false;
        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getProductId().equals(updatedProduct.getProductId())) {
                products.set(i, updatedProduct);
                found = true;
                break;
            }
        }
        if (!found) throw new ProductNotFoundException("Product not found.");
        fileHandler.writeToFile(FILE_PATH, products);
        return updatedProduct;
    }

    public Product updatePrice(String productId, double newPrice) {
        if (newPrice < 0) throw new InvalidPriceException("Price cannot be negative.");
        List<Product> products = fileHandler.readFromFile(FILE_PATH, typeReference);
        boolean found = false;
        Product updatedProduct = null;
        for (Product product : products) {
            if (product.getProductId().equals(productId)) {
                product.setPrice(newPrice);
                updatedProduct = product;
                found = true;
                break;
            }
        }
        if (!found) throw new ProductNotFoundException("Product not found.");
        fileHandler.writeToFile(FILE_PATH, products);
        return updatedProduct;
    }

    public void deleteProduct(String productId) {
        List<Product> products = fileHandler.readFromFile(FILE_PATH, typeReference);
        if (!products.removeIf(p -> p.getProductId().equals(productId))) {
            throw new ProductNotFoundException("Product not found.");
        }
        fileHandler.writeToFile(FILE_PATH, products);
    }
}
