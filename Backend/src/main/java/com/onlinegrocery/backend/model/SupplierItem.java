package com.onlinegrocery.backend.model;

public class SupplierItem {
    private String itemId;
    private String name;
    private int quantity;
    private double wholesalePrice;

    public String getItemId() { return itemId; }
    public void setItemId(String itemId) { this.itemId = itemId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getWholesalePrice() { return wholesalePrice; }
    public void setWholesalePrice(double wholesalePrice) { this.wholesalePrice = wholesalePrice; }
}
