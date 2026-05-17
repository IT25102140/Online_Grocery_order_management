package com.onlinegrocery.backend.service;

import com.onlinegrocery.backend.exception.CartNotFoundException;
import com.onlinegrocery.backend.model.Cart;
import com.onlinegrocery.backend.util.JsonFileHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CartService {
    private static final String FILE_PATH = "carts.json";
    private final JsonFileHandler<Cart> fileHandler;
    private final TypeReference<List<Cart>> typeReference;

    public CartService(JsonFileHandler<Cart> fileHandler) {
        this.fileHandler = fileHandler;
        this.typeReference = new TypeReference<List<Cart>>() {};
    }

    public Cart createOrUpdateCart(Cart cart) {
        List<Cart> carts = fileHandler.readFromFile(FILE_PATH, typeReference);
        carts.removeIf(c -> c.getCartId().equals(cart.getCartId()));
        carts.add(cart);
        fileHandler.writeToFile(FILE_PATH, carts);
        return cart;
    }

    public List<Cart> getAllCarts() {
        return fileHandler.readFromFile(FILE_PATH, typeReference);
    }

    public void deleteCart(String cartId) {
        List<Cart> carts = fileHandler.readFromFile(FILE_PATH, typeReference);
        if (!carts.removeIf(c -> c.getCartId().equals(cartId))) {
            throw new CartNotFoundException("Cart not found.");
        }
        fileHandler.writeToFile(FILE_PATH, carts);
    }
}
