package com.onlinegrocery.backend.model;
public class NonPerishableProduct extends Product {
    private int warrantyMonths;
    public int getWarrantyMonths() { return warrantyMonths; }
    public void setWarrantyMonths(int warrantyMonths) { this.warrantyMonths = warrantyMonths; }
}
