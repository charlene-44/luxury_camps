// backend/src/main/java/com/camps/backend/exceptions/ResourceNotFoundException.java

package com.camps.backend.errors;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
