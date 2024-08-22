package com.main.exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgException(Exception ex){
        return new ResponseEntity<String>("Bad argument", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<NotFoundException> handleNotFoundException(Exception ex){
        return new ResponseEntity<NotFoundException>(new NotFoundException(ex.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<AccessException> handleDataAccessException(Exception ex){
        return new ResponseEntity<AccessException>(new AccessException(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<AccessException> handleBadCredException(Exception ex){
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        return new ResponseEntity<AccessException>(new AccessException(ex.getMessage()),HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<AccessDeniedException> handleAccessDeniedException(Exception ex){
        return new ResponseEntity<AccessDeniedException>(new AccessDeniedException(ex.getMessage()), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<AccessException> handleExpiredJWTException(Exception ex){
        return new ResponseEntity<AccessException>(new AccessException(ex.getMessage()), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<AccessException> handleMalformedJwtException(Exception ex){
        return new ResponseEntity<AccessException>(new AccessException(ex.getMessage()), HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler
    public ResponseEntity<AccessException> defaultException(Exception ex){
        return new ResponseEntity<AccessException>(new AccessException(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
