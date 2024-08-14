package com.main.domain;

import com.main.data.SkillRepository;
import com.main.model.AbilityScores;
import com.main.model.Skills;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {
    private final SkillRepository skillRepo;

    public SkillService(SkillRepository skillRepo){
        this.skillRepo = skillRepo;
    }

    public List<Skills> getAllSkills(){
        return skillRepo.findAllSkills();
    }

    public Skills getSkills(int asID){
        return skillRepo.findSkillById(asID);
    }

    public Result<Skills> addSkills(Skills skills){
        Result<Skills> result = validate(skills);

        if (!result.isSuccess()){
            return result;
        }

        if (skills.getSkillID() != 0){
            result.addMessage("Id cannot be set of 'add' operation.", ResultType.INVALID);
        }

        if (result.isSuccess()){
            Skills savedSkill = skillRepo.addSkill(skills);
            result.setPayload(savedSkill);
        }

        return result;
    }

    public Result<Skills> addSkills(AbilityScores as){
        Result<Skills> result = new Result<>();
        Skills skills = new Skills();
        skills.setAcrobatics(modifier(as.getDexterity()));
        skills.setAnimalHandling(modifier(as.getWisdom()));
        skills.setArcana(modifier(as.getIntelligence()));
        skills.setAthletics(modifier(as.getStrength()));
        skills.setDeception(modifier(as.getCharisma()));
        skills.setHistory(modifier(as.getIntelligence()));
        skills.setInsight(modifier(as.getWisdom()));
        skills.setIntimidation(modifier(as.getCharisma()));
        skills.setInvestigation(modifier(as.getIntelligence()));
        skills.setMedicine(modifier(as.getWisdom()));
        skills.setNature(modifier(as.getIntelligence()));
        skills.setPerception(modifier(as.getWisdom()));
        skills.setPerformance(modifier(as.getCharisma()));
        skills.setPersuasion(modifier(as.getCharisma()));
        skills.setReligion(modifier(as.getIntelligence()));
        skills.setSleightOfHand(modifier(as.getDexterity()));
        skills.setStealth(modifier(as.getDexterity()));
        skills.setSurvival(modifier(as.getWisdom()));
        skills.setAsID(as.getAsID());
        Skills savedSkill = skillRepo.addSkill(skills);
        result.setPayload(savedSkill);
        return result;
    }

    public Result<Skills> update(Skills updatedSkill){
        Result<Skills> result = validate(updatedSkill);
        if (!result.isSuccess()){
            return result;
        }
        if (updatedSkill.getSkillID() <= 0){
            result.addMessage("Skill ID is required.", ResultType.INVALID);
            return result;
        }
        if (!skillRepo.updateSkill(updatedSkill)){
            String msg = String.format("Id: %s not found", updatedSkill.getSkillID());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<Skills> update (AbilityScores as){
        Result<Skills> result = new Result<>();
        Skills skills = getSkills(as.getAsID());
        skills.setAcrobatics(modifier(as.getDexterity()));
        skills.setAnimalHandling(modifier(as.getWisdom()));
        skills.setArcana(modifier(as.getIntelligence()));
        skills.setAthletics(modifier(as.getStrength()));
        skills.setDeception(modifier(as.getCharisma()));
        skills.setHistory(modifier(as.getIntelligence()));
        skills.setInsight(modifier(as.getWisdom()));
        skills.setIntimidation(modifier(as.getCharisma()));
        skills.setInvestigation(modifier(as.getIntelligence()));
        skills.setMedicine(modifier(as.getWisdom()));
        skills.setNature(modifier(as.getIntelligence()));
        skills.setPerception(modifier(as.getWisdom()));
        skills.setPerformance(modifier(as.getCharisma()));
        skills.setPersuasion(modifier(as.getCharisma()));
        skills.setReligion(modifier(as.getIntelligence()));
        skills.setSleightOfHand(modifier(as.getDexterity()));
        skills.setStealth(modifier(as.getDexterity()));
        skills.setSurvival(modifier(as.getWisdom()));
        if (!skillRepo.updateSkill(skills)){
            String msg = String.format("Id: %s not found", skills.getSkillID());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<Skills> delete(int asID){
        Result<Skills> result = new Result<>();
        if (asID == 0){
            result.addMessage("Username is required.", ResultType.INVALID);
            return result;
        }
        if (!skillRepo.deleteSkill(asID)){
            String msg = String.format("%d does not exist.", asID);
            result.addMessage(msg, ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result<Skills> validate(Skills skills){
        Result<Skills> result = new Result<>();

        if (skills == null){
            result.addMessage("Skill cannot be null.", ResultType.INVALID);
            return result;
        }
/*        if (skills.getSkillID() <= 0){
            result.addMessage("Skill ID is required", ResultType.INVALID);
        }*/
        if (skills.getAsID() <= 0){
            result.addMessage("AS ID is required", ResultType.INVALID);
            return result;
        }
        if (skills.getAcrobatics() >= 5 || skills.getAcrobatics() <= -5){
            result.addMessage("Acrobatics score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getAnimalHandling() >= 5 || skills.getAnimalHandling() <= -5){
            result.addMessage("Animal Handling score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getArcana() >= 5 || skills.getArcana() <= -5){
            result.addMessage("Arcana score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getAthletics() >= 5 || skills.getAthletics() <= -5){
            result.addMessage("Athletics score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getDeception() >= 5 || skills.getDeception() <= -5){
            result.addMessage("Deception score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getHistory() >= 5 || skills.getHistory() <= -5){
            result.addMessage("History score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getInsight() >= 5 || skills.getInsight() <= -5){
            result.addMessage("Insight score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getIntimidation() >= 5 || skills.getIntimidation() <= -5){
            result.addMessage("Intimidation score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getInvestigation() >= 5 || skills.getInvestigation() <= -5){
            result.addMessage("Investigation score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getMedicine() >= 5 || skills.getMedicine() <= -5){
            result.addMessage("Medicine score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getNature() >= 5 || skills.getNature() <= -5){
            result.addMessage("Nature score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getPerception() >= 5 || skills.getPerception() <= -5){
            result.addMessage("Perception score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getPerformance() >= 5 || skills.getPerformance() <= -5){
            result.addMessage("Performance score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getPersuasion() >= 5 || skills.getPersuasion() <= -5){
            result.addMessage("Persuasion score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getReligion() >= 5 || skills.getReligion() <= -5){
            result.addMessage("Religion score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getSleightOfHand() >= 5 || skills.getSleightOfHand() <= -5){
            result.addMessage("Sleight of Hand score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getStealth() >= 5 || skills.getStealth() <= -5){
            result.addMessage("Stealth score must be between -5 and 5.", ResultType.INVALID);
        }
        if (skills.getSurvival() >= 5 || skills.getSurvival() <= -5){
            result.addMessage("Survival score must be between -5 and 5.", ResultType.INVALID);
        }

        return result;
    }

    private int modifier(int value){
        double mod = Math.floor((value-10)/2);
        return (int) mod;
    }
}
