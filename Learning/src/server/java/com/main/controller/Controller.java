package com.main.controller;

import com.main.domain.AbilityScoreService;
import com.main.domain.Result;
import com.main.model.AbilityScores;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/abilityscore")
@CrossOrigin(origins = "http://localhost:3000")
//@Profile("test")
public class Controller {

    private final AbilityScoreService service;

    public Controller(AbilityScoreService service) {
        this.service = service;
    }
    @GetMapping("/user")
    public ResponseEntity<List<AbilityScores>> findAllAS(){
        List<AbilityScores> all = service.getAllAS();
        return ResponseEntity.ok(all);
    }
    @GetMapping("/user/{userID}")
    public ResponseEntity<AbilityScores> findASByUser(@PathVariable String userID){
        AbilityScores as = service.getAS(userID);
        if (as == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(as);
    }
    @PostMapping
    public ResponseEntity<Object> addAS(@RequestBody AbilityScores as){
        Result<AbilityScores> result = service.add(as);
        if (result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
    @PutMapping("/user/{userID}")
    public ResponseEntity<Object> updateAS(@PathVariable String userID, @RequestBody AbilityScores as){
        if (!userID.equalsIgnoreCase(as.getUserID())){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<AbilityScores> result = service.update(as);
        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
