package com.main.domain;

import com.main.data.CharInfoRepository;
import com.main.model.CharInfo;
import org.springframework.stereotype.Service;

import java.util.List;

//what

@Service
public class CharInfoService {
    private final CharInfoRepository repo;

    public CharInfoService(CharInfoRepository repo){
        this.repo = repo;
    }

    public List<CharInfo> getAllCharInfo(){
        return repo.findAllCharInfo();
    }

    public CharInfo getCharInfo(String userID){
        return repo.findCharInfoById(userID);
    }

    public Result<CharInfo> addCharInfo(CharInfo charInfo){
        Result<CharInfo> result = validate(charInfo);
        if (!result.isSuccess()){
            return result;
        }
        List<CharInfo> all = getAllCharInfo();
        boolean repeat = all.stream().anyMatch(ci -> ci.getUserID().equalsIgnoreCase(charInfo.getUserID()));
        if (repeat){
            result.addMessage("Username already exist.", ResultType.INVALID);
        }
        if(result.isSuccess()){
            CharInfo savedCI = repo.addCharInfo(charInfo);
            result.setPayload(savedCI);
        }
        return result;
    }

    public Result<CharInfo> updateCharInfo(CharInfo charInfo){
        Result<CharInfo> result = validate(charInfo);
        if (!result.isSuccess()){
            return result;
        }
        if (!repo.updateCharInfo(charInfo)){
            String msg = String.format("%s does not exist.", charInfo.getUserID());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<CharInfo> deleteCharInfo(String userID){
        Result<CharInfo> result = new Result<>();
        if (userID.isBlank() || userID.isEmpty()){
            result.addMessage("Username is required.", ResultType.INVALID);
            return result;
        }
        if (!repo.deleteCharInfo(userID)){
            String msg = String.format("%s does not exist.", userID);
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<CharInfo> validate(CharInfo charInfo){
        Result<CharInfo> result = new Result<>();

        if (charInfo == null){
            result.addMessage("CharInfo cannot be null.", ResultType.INVALID);
            return result;
        }
        if (charInfo.getUserID() == null || charInfo.getUserID().isBlank() || charInfo.getUserID().isEmpty()){
            result.addMessage("Username is required.", ResultType.INVALID);
        }
        if (charInfo.getClassType().isBlank() || charInfo.getClassType().isEmpty()){
            result.addMessage("Class is required.", ResultType.INVALID);
        }
        if (charInfo.getLevel() < 0 || charInfo.getLevel() > 20){
            result.addMessage("Level is out of bounds (0-20).", ResultType.INVALID);
        }
        if (charInfo.getRace().isBlank() || charInfo.getRace().isEmpty()){
            result.addMessage("Race is required.", ResultType.INVALID);
        }
        if (charInfo.getBackground().isBlank() || charInfo.getBackground().isEmpty()){
            result.addMessage("Class is required.", ResultType.INVALID);
        }
        if (charInfo.getExp() < 0){
            result.addMessage("Exp cannot be negative.", ResultType.INVALID);
        }
        return result;
    }
}
