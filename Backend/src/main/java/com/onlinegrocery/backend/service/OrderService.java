package com.onlinegrocery.backend.service;

import com.onlinegrocery.backend.exception.OrderNotFoundException;
import com.onlinegrocery.backend.model.Order;
import com.onlinegrocery.backend.util.JsonFileHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private static final String FILE_PATH = "orders.json";
    private final JsonFileHandler<Order> fileHandler;
    private final TypeReference<List<Order>> typeReference;

    public OrderService(JsonFileHandler<Order> fileHandler) {
        this.fileHandler = fileHandler;
        this.typeReference = new TypeReference<List<Order>>() {};
    }

    public Order placeOrder(Order newOrder) {
        List<Order> orders = fileHandler.readFromFile(FILE_PATH, typeReference);
        orders.removeIf(o -> o.getOrderId().equals(newOrder.getOrderId()));
        orders.add(newOrder);
        fileHandler.writeToFile(FILE_PATH, orders);
        return newOrder;
    }

    public List<Order> getAllOrders() {
        return fileHandler.readFromFile(FILE_PATH, typeReference);
    }

    public List<Order> getOrdersByUserId(String userId) {
        return fileHandler.readFromFile(FILE_PATH, typeReference).stream()
            .filter(o -> o.getUserId().equals(userId))
            .collect(Collectors.toList());
    }

    public Order updateOrderStatus(String orderId, String status) {
        List<Order> orders = fileHandler.readFromFile(FILE_PATH, typeReference);
        Order target = null;
        for (Order o : orders) {
            if (o.getOrderId().equals(orderId)) {
                o.setStatus(com.onlinegrocery.backend.model.OrderStatus.valueOf(status));
                target = o;
                break;
            }
        }
        if (target == null) throw new OrderNotFoundException("Order not found.");
        fileHandler.writeToFile(FILE_PATH, orders);
        return target;
    }

    public void deleteOrder(String orderId) {
        List<Order> orders = fileHandler.readFromFile(FILE_PATH, typeReference);
        if (!orders.removeIf(o -> o.getOrderId().equals(orderId))) {
            throw new OrderNotFoundException("Order not found.");
        }
        fileHandler.writeToFile(FILE_PATH, orders);
    }
}
