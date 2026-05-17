package com.onlinegrocery.backend.model;
public class CartItem {
    private String productId;
    private int quantity;

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) {
        if(quantity > 0) { this.quantity = quantity; }
    }
}
