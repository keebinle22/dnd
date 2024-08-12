package com.main.controller;

import com.main.domain.BattleStatService;
import com.main.domain.Result;
import com.main.model.BattleStat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/battlestat")
public class BattleStatController {
    private final BattleStatService service;

    public BattleStatController(BattleStatService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<BattleStat>> getAllBS(){
        return ResponseEntity.ok(service.getAllBS());
    }

    @GetMapping("/{userID}")
    public ResponseEntity<BattleStat> getBSByID(@PathVariable String userID){
        BattleStat bs = service.getBS(userID);
        if (bs == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(bs);
    }

    @PostMapping
    public ResponseEntity<Object> addBS(@RequestBody BattleStat bs){
        Result<BattleStat> result = service.addBS(bs);
        if (result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PostMapping("/{userID}")
    public ResponseEntity<Object> addBS(@PathVariable String userID){
        Result<BattleStat> result = service.addBS(userID);
        if (result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/update/{userID}")
    public ResponseEntity<Object> updateBS(@PathVariable String userID, @RequestBody BattleStat bs){
        if (!userID.equalsIgnoreCase(bs.getUserID())){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<BattleStat> result = service.updateBS(bs);
        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/delete/{userID}")
    public ResponseEntity<Object> deleteBS(@PathVariable String userID){
        Result<BattleStat> result = service.deleteBS(userID);
        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
