package com.onlinegrocery.backend.model;

public class ShopSettings {
    private String storeStatus;
    private double taxRate;
    private String currency;
    private String storeName;

    public String getStoreStatus() { return storeStatus; }
    public void setStoreStatus(String storeStatus) { this.storeStatus = storeStatus; }
    public double getTaxRate() { return taxRate; }
    public void setTaxRate(double taxRate) { this.taxRate = taxRate; }
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    public String getStoreName() { return storeName; }
    public void setStoreName(String storeName) { this.storeName = storeName; }
}
