package com.onlinegrocery.backend.controller;

import com.onlinegrocery.backend.model.Cart;
import com.onlinegrocery.backend.service.CartService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {
    private final CartService cartService;
    public CartController(CartService cartService) { this.cartService = cartService; }

    @PostMapping("/add")
    public ResponseEntity<Cart> addCart(@RequestBody Cart cart) {
        return new ResponseEntity<>(cartService.createOrUpdateCart(cart), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Cart>> getAllCarts() {
        return ResponseEntity.ok(cartService.getAllCarts());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable String id) {
        cartService.deleteCart(id);
        return ResponseEntity.noContent().build();
    }
}
