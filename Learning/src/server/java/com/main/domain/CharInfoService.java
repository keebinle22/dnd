package com.main.domain;

import com.main.data.CharInfoRepository;
import com.main.data.ClassTypeRepository;
import com.main.data.HealthRepository;
import com.main.model.CharInfo;
import com.main.model.Health;
import com.main.model.classes.ClassType;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;

//what

@Service
public class CharInfoService {
    private final CharInfoRepository charInfoRepository;
    private final ClassTypeRepository classTypeRepository;
    private final HealthRepository healthRepository;

    public CharInfoService(CharInfoRepository charInfoRepository, ClassTypeRepository classTypeRepository, HealthRepository healthRepository){
        this.charInfoRepository = charInfoRepository;
        this.classTypeRepository = classTypeRepository;
        this.healthRepository = healthRepository;
    }

    public List<CharInfo> getAllCharInfo(){
        return charInfoRepository.findAllCharInfo();
    }

    public CharInfo getCharInfo(String userID){
        return charInfoRepository.findCharInfoById(userID);

    }

    public Result<CharInfo> addCharInfo(CharInfo charInfo){
        Result<CharInfo> result = new Result<>();
        if (charInfo.getUserID() == null || charInfo.getUserID().isBlank() || charInfo.getUserID().isEmpty()){
            result.addMessage("Username is required.", ResultType.INVALID);
            return result;
        }
        List<CharInfo> all = getAllCharInfo();
        boolean repeat = all.stream().anyMatch(ci -> ci.getUserID().equalsIgnoreCase(charInfo.getUserID()));
        if (repeat){
            result.addMessage("Username already exist.", ResultType.INVALID);
        }
        if(result.isSuccess()){
            CharInfo savedCI = charInfoRepository.addCharInfo(charInfo);
            result.setPayload(savedCI);
        }
        return result;
    }

    public Result<CharInfo> updateCharInfo(CharInfo charInfo){
        Result<CharInfo> result = validate(charInfo);
        if (!result.isSuccess()){
            return result;
        }
        if (!charInfoRepository.updateCharInfo(charInfo)){
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
        if (!charInfoRepository.deleteCharInfo(userID)){
            String msg = String.format("%s does not exist.", userID);
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public void deleteAll(){
        charInfoRepository.deleteAll();
    }

    public Result<?> levelUp(CharInfo ci, Health health){
        Result<CharInfo> result = validate(ci);
        Result<Health> result1 = validate(health);
        if (!result.isSuccess()){
            return result;
        }
        if (!result1.isSuccess()){
            return result1;
        }
        CharInfo prevCI = charInfoRepository.findCharInfoById(ci.getUserID());
        if (ci.getLevel() <= prevCI.getLevel()){
            result.addMessage("Invalid level up.", ResultType.INVALID);
            return result;
        } //what to do if > 1 level?

        if (!classTypeRepository.levelUp(ci) || !healthRepository.levelUpHealth(health)) {
            result.addMessage("Error", ResultType.NOT_FOUND);
        }
        charInfoRepository.updateCharInfo(ci);
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
        if (charInfo.getClassType().isEmpty() || charInfo.getClassType().isBlank()){
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

    private Result<Health> validate(Health health){
        Result<Health> result = new Result<>();
        if (health == null){
            result.addMessage("Health cannot be null.", ResultType.INVALID);
            return result;
        }
        if (health.getUserID() == null || health.getUserID().isBlank() || health.getUserID().isEmpty()){
            result.addMessage("Username is required.", ResultType.INVALID);
        }
        if (health.getMaxHP() < 0){
            result.addMessage("Max HP cannot be negative.", ResultType.INVALID);
        }
        if (health.getCurHP() < 0){
            result.addMessage("Cur HP cannot be negative.", ResultType.INVALID);
        }
        if (health.getMaxHP() < health.getCurHP()){
            result.addMessage("Cur HP cannot be greater than Max HP.", ResultType.INVALID);
        }
        if (health.getTempHP() < 0){
            result.addMessage("Temp HP cannot be negative.", ResultType.INVALID);
        }
        if (health.getTotalHitDice() < 0){
            result.addMessage("Total Hit Dice cannot be negative.", ResultType.INVALID);
        }
        if (health.getCurHitDice() < 0){
            result.addMessage("Cur Hit Dice cannot be negative.", ResultType.INVALID);
        }
        if (health.getTotalHitDice() < health.getCurHitDice()){
            result.addMessage("Cur Hit Dice cannot be greater than Total Hit Dice.", ResultType.INVALID);
        }
        if (health.getSuccessDeathSaves() < 0 || health.getSuccessDeathSaves() > 3){
            result.addMessage("Success Death Saves is out of bounds (0-3).", ResultType.INVALID);
        }
        if (health.getFailDeathSaves() < 0 || health.getFailDeathSaves() > 3){
            result.addMessage("Fail Death Saves is out of bounds (0-3).", ResultType.INVALID);
        }
        return result;
    }
}
