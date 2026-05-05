package com.onlinegrocery.backend.service;

import com.onlinegrocery.backend.exception.PaymentNotFoundException;
import com.onlinegrocery.backend.model.Payment;
import com.onlinegrocery.backend.util.JsonFileHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {
    private static final String FILE_PATH = "payments.json";
    private final JsonFileHandler<Payment> fileHandler;
    private final TypeReference<List<Payment>> typeReference;

    public PaymentService(JsonFileHandler<Payment> fileHandler) {
        this.fileHandler = fileHandler;
        this.typeReference = new TypeReference<List<Payment>>() {};
    }

    public Payment processPayment(Payment payment) {
        List<Payment> payments = fileHandler.readFromFile(FILE_PATH, typeReference);
        payments.removeIf(p -> p.getPaymentId().equals(payment.getPaymentId()));
        payments.add(payment);
        fileHandler.writeToFile(FILE_PATH, payments);
        return payment;
    }

    public List<Payment> getAllPayments() {
        return fileHandler.readFromFile(FILE_PATH, typeReference);
    }

    public List<Payment> getPaymentsByUserId(String userId) {
        return fileHandler.readFromFile(FILE_PATH, typeReference).stream()
            .filter(p -> userId.equals(p.getUserId()))
            .collect(Collectors.toList());
    }

    public void deletePayment(String paymentId) {
        List<Payment> payments = fileHandler.readFromFile(FILE_PATH, typeReference);
        if (!payments.removeIf(p -> p.getPaymentId().equals(paymentId))) {
            throw new PaymentNotFoundException("Payment not found.");
        }
        fileHandler.writeToFile(FILE_PATH, payments);
    }
}
