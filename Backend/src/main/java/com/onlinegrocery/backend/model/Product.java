package com.onlinegrocery.backend.model;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"productType"})
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "productType", visible = true)
@JsonSubTypes({
    @JsonSubTypes.Type(value = PerishableProduct.class, name = "PERISHABLE"),
    @JsonSubTypes.Type(value = NonPerishableProduct.class, name = "NON_PERISHABLE")
})
public abstract class Product {
    private String productId;
    private String productType;
    private String name;
    private double price;
    private String imageUrl;
    private String description;
    private String category;

    public String getProductType() { return productType; }
    public void setProductType(String productType) { this.productType = productType; }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getPrice() { return price; }
    public void setPrice(double price) {
        if(price >= 0) { this.price = price; }
    }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
