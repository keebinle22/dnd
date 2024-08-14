package com.main.domain;

import com.main.data.BattleStatRepository;
import com.main.model.BattleStat;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BattleStatService {

    private final BattleStatRepository repo;

    public BattleStatService(BattleStatRepository repo) {
        this.repo = repo;
    }

    public List<BattleStat> getAllBS(){
        return repo.findAllBS();
    }

    public BattleStat getBS(String userID){
        return repo.getBSByID(userID);
    }

    public Result<BattleStat> addBS(BattleStat bs){
        Result<BattleStat> result = validate(bs);

        if (!result.isSuccess()){
            return result;
        }
        if (bs.getBsID() != 0){
            result.addMessage("Id cannot be set of 'add' operation.", ResultType.INVALID);
        }
        List<BattleStat> all = getAllBS();
        boolean repeat = all.stream().anyMatch(ci -> ci.getUserID().equalsIgnoreCase(bs.getUserID()));
        if (repeat){
            result.addMessage("Username already exist.", ResultType.INVALID);
        }
        if (result.isSuccess()){
            BattleStat savedBS = repo.addBS(bs);
            result.setPayload(savedBS);
        }
        return result;
    }

    public Result<BattleStat> addBS(String userID){
        Result<BattleStat> result = new Result<>();

        List<BattleStat> all = getAllBS();
        boolean repeat = all.stream().anyMatch(ci -> ci.getUserID().equalsIgnoreCase(userID));
        if (repeat){
            result.addMessage("Username already exist.", ResultType.INVALID);
        }
        if (result.isSuccess()){
            BattleStat bs = new BattleStat(userID);
            BattleStat savedBS = repo.addBS(bs);
            result.setPayload(savedBS);
        }
        return result;
    }

    public Result<BattleStat> updateBS(BattleStat bs){
        Result<BattleStat> result = validate(bs);
        if (!result.isSuccess()){
            return result;
        }
        if (!repo.editBS(bs)){
            String msg = String.format("%s does not exist.", bs.getUserID());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<BattleStat> deleteBS(String userID){
        Result<BattleStat> result = new Result<>();
        if (userID.isBlank() || userID.isEmpty()){
            result.addMessage("Username is required.", ResultType.INVALID);
            return result;
        }
        if (!repo.deleteBS(userID)){
            String msg = String.format("%s does not exist.", userID);
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<BattleStat> validate(BattleStat bs){
        Result<BattleStat> result= new Result<>();
        if (bs == null ){
            result.addMessage("BattleStat cannot be null.", ResultType.INVALID);
            return result;
        }
        if (bs.getUserID() == null || bs.getUserID().isEmpty() || bs.getUserID().isBlank()){
            result.addMessage("Username is required.", ResultType.INVALID);
        }
//        if (bs.getInitiative() < 0){
//            result.addMessage("Initiative cannot be negative.", ResultType.INVALID);
//        }
        if (bs.getArmor() < 0){
            result.addMessage("Armor cannot be negative.", ResultType.INVALID);
        }
        if (bs.getInspiration() < 0){
            result.addMessage("Inspiration cannot be negative.", ResultType.INVALID);
        }
        if (bs.getProfBonus() < 0){
            result.addMessage("Proficiency Bonus cannot be negative.", ResultType.INVALID);
        }
        if (bs.getAsSaveDC() < 0){
            result.addMessage("Ability Save DC cannot be negative.", ResultType.INVALID);
        }
        return result;
    }
}
