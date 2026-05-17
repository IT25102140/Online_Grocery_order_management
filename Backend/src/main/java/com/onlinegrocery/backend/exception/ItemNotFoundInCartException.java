package com.onlinegrocery.backend.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ItemNotFoundInCartException extends RuntimeException {
    public ItemNotFoundInCartException(String message) {
        super(message);
    }
}
