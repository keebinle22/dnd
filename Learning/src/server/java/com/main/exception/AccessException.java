package com.main.exception;

public class AccessException {
    private String message;

    public AccessException(String message){
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
