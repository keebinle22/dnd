package com.main.controller;

import com.main.domain.Result;
import com.main.domain.SkillService;
import com.main.model.Skills;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/skill")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService){
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<Skills>> getSkills(){
        List<Skills> all = skillService.getAllSkills();
        return ResponseEntity.ok(all);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Skills> getSkillById(@PathVariable int id){
        Skills skills = skillService.getSkills(id);
        if (skills == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(skills);
    }

    @PostMapping
    public ResponseEntity<Object> addSkill(@RequestBody Skills skills){
        Result<Skills> result = skillService.addSkills(skills);
        if (result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/update/{asID}")
    public ResponseEntity<Object> updateSkill(@PathVariable int asID, @RequestBody Skills skills){
        if (asID != skills.getAsID()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Skills> result = skillService.update(skills);
        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
