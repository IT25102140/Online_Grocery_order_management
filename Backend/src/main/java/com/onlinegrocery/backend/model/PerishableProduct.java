package com.onlinegrocery.backend.model;
public class PerishableProduct extends Product {
    private String expiryDate;
    public String getExpiryDate() { return expiryDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }
}
