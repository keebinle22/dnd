package com.main.controller;

import com.main.domain.*;
import com.main.model.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/charinfo")
public class CharInfoController {

    private final CharInfoService charInfoService;
    private final AbilityScoreService asService;
    private final HealthService healthService;
    private final SkillService skillService;
    private final BattleStatService battleStatService;

    public CharInfoController(CharInfoService charInfoService, AbilityScoreService asService, HealthService healthService, SkillService skillService, BattleStatService battleStatService){
        this.charInfoService = charInfoService;
        this.asService = asService;
        this.healthService = healthService;
        this.skillService = skillService;
        this.battleStatService = battleStatService;
    }
    @GetMapping
    public ResponseEntity<List<CharInfo>> getCharInfo(){
        List<CharInfo> all = charInfoService.getAllCharInfo();
        return ResponseEntity.ok(all);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CharInfo> getCharInfoById(@PathVariable String userId){
        CharInfo charInfo = charInfoService.getCharInfo(userId);
        if (charInfo == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(charInfo);
    }

    @PostMapping
    public ResponseEntity<Object> addCharInfo(@RequestBody CharInfo charInfo){
        String userID = charInfo.getUserID();
        Result<CharInfo> result = charInfoService.addCharInfo(charInfo);
        if (result.isSuccess()){
            if (asService.getAS(userID) == null && healthService.getHealth(userID) == null){
                asService.add(userID);
                healthService.addHealth(userID);
                skillService.addSkills(asService.getAS(userID));

                return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
            }
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<Object> updateCharInfo(@PathVariable String userId, @RequestBody CharInfo charInfo){
        if (!userId.equalsIgnoreCase(charInfo.getUserID())){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<CharInfo> result = charInfoService.updateCharInfo(charInfo);
        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Object> deleteCharInfo(@PathVariable String userId){
        AbilityScores as = asService.getAS(userId);
        Result<Skills> skillsResult = skillService.delete(as.getAsID());
        if (skillsResult.isSuccess()){
            Result<AbilityScores> asResult = asService.delete(userId);
            if (asResult.isSuccess()){
                Result<Health> healthResult = healthService.deleteHealth(userId);
                if (healthResult.isSuccess()){
                    Result<BattleStat> bsResult = battleStatService.deleteBS(userId);
                    if (bsResult.isSuccess()){
                        Result<CharInfo> charResult = charInfoService.deleteCharInfo(userId);
                        if (charResult.isSuccess()){
                            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                        }
                        return ErrorResponse.build(charResult);
                    }
                    return ErrorResponse.build(bsResult);
                }
                return ErrorResponse.build(healthResult);
            }
            return ErrorResponse.build(asResult);
        }
        return ErrorResponse.build(skillsResult);

    }
}
