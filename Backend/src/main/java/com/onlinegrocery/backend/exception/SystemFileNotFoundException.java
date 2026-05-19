package com.onlinegrocery.backend.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class SystemFileNotFoundException extends RuntimeException {
    public SystemFileNotFoundException(String message) {
        super(message);
    }
}
