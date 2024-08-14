package com.main.controller;

import com.main.domain.AbilityScoreService;
import com.main.domain.Result;
import com.main.domain.SkillService;
import com.main.model.AbilityScores;
import com.main.model.Skills;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/abilityscore")
@CrossOrigin(origins = "http://localhost:3000")
public class ASController {

    private final AbilityScoreService scoreService;
    private final SkillService skillService;

    public ASController(AbilityScoreService scoreService, SkillService skillService) {
        this.scoreService = scoreService;
        this.skillService = skillService;
    }
    @GetMapping("/user")
    public ResponseEntity<List<AbilityScores>> findAllAS(){
        List<AbilityScores> all = scoreService.getAllAS();
        return ResponseEntity.ok(all);
    }
    @GetMapping("/user/{userID}")
    public ResponseEntity<AbilityScores> findASByUser(@PathVariable String userID){
        AbilityScores as = scoreService.getAS(userID);
        if (as == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(as);
    }
    @PostMapping
    public ResponseEntity<Object> addAS(@RequestBody AbilityScores as){
        Result<AbilityScores> result = scoreService.add(as);
        if (result.isSuccess()){
            skillService.addSkills(as);
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
    @PutMapping("/user/{userID}")
    public ResponseEntity<Object> updateAS(@PathVariable String userID, @RequestBody AbilityScores as){
        if (!userID.equalsIgnoreCase(as.getUserID())){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        int asID = scoreService.getAS(as.getUserID()).getAsID();
        as.setAsID(asID);
        Result<AbilityScores> result = scoreService.update(as);
        if (result.isSuccess()){
            Result<Skills> result2 = skillService.update(as);
            if (result2.isSuccess()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{userID}")
    public ResponseEntity<Object> deleteAS(@PathVariable String userID){
        ResponseEntity<AbilityScores> as = findASByUser(userID);
        if (!as.getStatusCode().is2xxSuccessful()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Result<Skills> skillResult = skillService.delete(as.getBody().getAsID());
        if (skillResult.isSuccess()){
            Result<AbilityScores> result = scoreService.delete(userID);
            if (skillResult.isSuccess()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return ErrorResponse.build(result);
        }
        return ErrorResponse.build(skillResult);
    }
}
