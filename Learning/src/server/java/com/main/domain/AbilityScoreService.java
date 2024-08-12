package com.main.domain;

import com.main.data.AbilityScoreRepository;
import com.main.model.AbilityScores;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AbilityScoreService {
    private final AbilityScoreRepository repo;

    public AbilityScoreService(AbilityScoreRepository repo){
        this.repo = repo;
    }

    public List<AbilityScores> getAllAS(){
        return repo.findAllAS();
    }

    public AbilityScores getAS(String userID){
        return repo.getASById(userID);
    }

    public Result<AbilityScores> add(AbilityScores as){
        Result<AbilityScores> result = validate(as);

        if (!result.isSuccess()){
            return result;
        }
        if (as.getAsID() != 0){
            result.addMessage("Id cannot be set for 'add' operation.", ResultType.INVALID);
        }
        if (result.isSuccess()){
            AbilityScores savedAS = repo.addAS(as);
            result.setPayload(savedAS);
        }
        return result;
    }

    public void add(String userID){
        AbilityScores as = new AbilityScores(0,0,0,0,0,0,0,userID);
        repo.addAS(as);
    }

    public Result<AbilityScores> update(AbilityScores updatedAS){
        Result<AbilityScores> result = validate(updatedAS);
        if (!result.isSuccess()){
            return result;
        }
/*        if (updatedAS.getAsID() <= 0){
            result.addMessage("Username is required.", ResultType.INVALID);
            return result;
        }*/
        if (!repo.editAS(updatedAS)){
            String msg = String.format("Username: %s, not found", updatedAS.getUserID());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<AbilityScores> validate(AbilityScores as){
        Result<AbilityScores> result = new Result<>();

        if (as == null){
            result.addMessage("Ability Score cannot be null.", ResultType.INVALID);
        }
        if (as.getAsID() < 0){
            result.addMessage("Id is required.", ResultType.INVALID);
        }
        if (as.getStrength() < 0 || as.getStrength() > 20){
            result.addMessage("Strength score must be between 0 and 20.", ResultType.INVALID);
        }
        if (as.getDexterity() < 0 || as.getDexterity() > 20){
            result.addMessage("Dexterity score must be between 0 and 20.", ResultType.INVALID);
        }
        if (as.getConstitution() < 0 || as.getConstitution() > 20){
            result.addMessage("Constitution score must be between 0 and 20.", ResultType.INVALID);
        }
        if (as.getIntelligence() < 0 || as.getIntelligence() > 20){
            result.addMessage("Intelligence score must be between 0 and 20.", ResultType.INVALID);
        }
        if (as.getWisdom() < 0 || as.getWisdom() > 20){
            result.addMessage("Wisdom score must be between 0 and 20.", ResultType.INVALID);
        }
        if (as.getCharisma() < 0 || as.getCharisma() > 20){
            result.addMessage("Charisma score must be between 0 and 20.", ResultType.INVALID);
        }
        if (as.getUserID().isBlank() || as.getUserID().isEmpty()){
            result.addMessage("User is required.", ResultType.INVALID);
        }
        return result;
    }
}
