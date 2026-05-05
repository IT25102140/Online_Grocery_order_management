package com.onlinegrocery.backend.controller;

import com.onlinegrocery.backend.model.Product;
import com.onlinegrocery.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    public ProductController(ProductService productService) { this.productService = productService; }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        try { return new ResponseEntity<>(productService.addProduct(product), HttpStatus.CREATED); }
        catch (IllegalArgumentException e) { return ResponseEntity.status(HttpStatus.CONFLICT).build(); }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @PutMapping("/update")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(product));
    }

    @PutMapping("/price")
    public ResponseEntity<Product> updatePrice(@RequestBody PriceUpdateRequest request) {
        return ResponseEntity.ok(productService.updatePrice(request.getProductId(), request.getPrice()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    public static class PriceUpdateRequest {
        private String productId;
        private double price;
        public String getProductId() { return productId; }
        public void setProductId(String productId) { this.productId = productId; }
        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }
    }
}
