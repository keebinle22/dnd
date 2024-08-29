package com.main.domain;

import com.main.data.HealthRepository;
import com.main.model.Health;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthService {
    private final HealthRepository repo;

    public HealthService(HealthRepository repo) {
        this.repo = repo;
    }

    public List<Health> getAllHealth(){
        return repo.getAllHealth();
    }

    public Health getHealth(String userID){
        return repo.getHealthByID(userID);
    }

    public Result<Health> addHealth(Health health){
        Result<Health> result = validate(health);
        if (!result.isSuccess()){
            return result;
        }
        if (health.getHealthID() != 0){
            result.addMessage("Id cannot be set of 'add' operation.", ResultType.INVALID);
        }
        List<Health> all = getAllHealth();
        boolean repeat = all.stream().anyMatch(h -> h.getUserID().equalsIgnoreCase(health.getUserID()));
        if (repeat){
            result.addMessage("Username already exist.", ResultType.INVALID);
        }
        if (result.isSuccess()){
            Health savedHealth = repo.addHealth(health);
            result.setPayload(savedHealth);
        }
        return result;
    }

    public void addHealth(String userID){
        Health health = new Health(0,0,0,0,0,0,0,0,userID);
        repo.addHealth(health);
    }

    public Result<Health> updateHealth(Health health){
        Result<Health> result = validate(health);
        if (!result.isSuccess()){
            return result;
        }
        if (!repo.editHealth(health)){
            String msg = String.format("%s does not exist.", health.getUserID());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<Health> deleteHealth(String userID){
        Result<Health> result = new Result<>();
        if (userID.isBlank() || userID.isEmpty()){
            result.addMessage("Username is required.", ResultType.INVALID);
            return result;
        }
        if (!repo.deleteHealth(userID)){
            String msg = String.format("%s does not exist.", userID);
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public void deleteAll(){
        repo.deleteAll();
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
