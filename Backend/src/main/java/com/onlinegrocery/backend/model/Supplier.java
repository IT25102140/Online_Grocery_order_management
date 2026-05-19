package com.onlinegrocery.backend.model;

import java.util.List;

public class Supplier {
    private String supplierId;
    private String name;
    private String contactPerson;
    private String email;
    private String phone;
    private String address;
    private String status;
    private List<SupplierItem> items;

    public String getSupplierId() { return supplierId; }
    public void setSupplierId(String supplierId) { this.supplierId = supplierId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<SupplierItem> getItems() { return items; }
    public void setItems(List<SupplierItem> items) { this.items = items; }
}
