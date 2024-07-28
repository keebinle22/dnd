package com.main.controller;

import com.main.domain.CharInfoService;
import com.main.domain.Result;
import com.main.model.CharInfo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/charinfo")
public class CharInfoController {

    private final CharInfoService charInfoService;

    public CharInfoController(CharInfoService charInfoService){
        this.charInfoService = charInfoService;
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
        Result<CharInfo> result = charInfoService.addCharInfo(charInfo);
        if (result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
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
        Result<CharInfo> result = charInfoService.deleteCharInfo(userId);
        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
