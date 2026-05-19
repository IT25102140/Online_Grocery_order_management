package com.onlinegrocery.backend.model;
public class Order {
    private String orderId;
    private String userId;
    private String cartId;
    private OrderStatus status;
    private String shippingAddress;
    private String orderDate;

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getCartId() { return cartId; }
    public void setCartId(String cartId) { this.cartId = cartId; }
    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }
    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
    public String getOrderDate() { return orderDate; }
    public void setOrderDate(String orderDate) { this.orderDate = orderDate; }
}
