package com.main.controller;

import com.main.domain.HealthService;
import com.main.domain.Result;
import com.main.model.Health;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/health")
public class HealthController {
    private final HealthService service;

    public HealthController(HealthService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Health>> getAllHealth(){
        return ResponseEntity.ok(service.getAllHealth());
    }

    @GetMapping("/{userID}")
    public ResponseEntity<Health> getHealthByID(@PathVariable String userID){
        Health health = service.getHealth(userID);
        if (health == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(health);
    }

    @PostMapping
    public ResponseEntity<Object> addHealth(@RequestBody Health health){
        Result<Health> result = service.addHealth(health);
        return result.isSuccess() ? new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED) : ErrorResponse.build(result);
    }

    @PutMapping("/update/{userID}")
    public ResponseEntity<Object> updateHealth(@PathVariable String userID, @RequestBody Health health){
        if (!userID.equalsIgnoreCase(health.getUserID())){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Health> result = service.updateHealth(health);
        return result.isSuccess() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : ErrorResponse.build(result);
    }

    @DeleteMapping("/delete/{userID}")
    public ResponseEntity<Object> deleteHealth(@PathVariable String userID){
        Result<Health> result = service.deleteHealth(userID);
        return result.isSuccess() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : ErrorResponse.build(result);
    }
}
