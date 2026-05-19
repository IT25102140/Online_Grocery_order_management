package com.onlinegrocery.backend.controller;

import com.onlinegrocery.backend.model.Order;
import com.onlinegrocery.backend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    public OrderController(OrderService orderService) { this.orderService = orderService; }

    @PostMapping("/add")
    public ResponseEntity<Order> addOrder(@RequestBody Order order) {
        return new ResponseEntity<>(orderService.placeOrder(order), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable String userId) {
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    @PutMapping("/status/{orderId}")
    public ResponseEntity<Order> updateStatus(@PathVariable String orderId, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, body.get("status")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
