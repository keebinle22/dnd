package com.main.domain;

import com.main.data.ClassTypeRepository;
import com.main.model.CharInfo;
import com.main.model.classes.ClassType;
import com.main.model.classes.Rogue;
import com.main.model.classes.Wizard;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ClassTypeService {
    private final ClassTypeRepository repo;


    public ClassTypeService(ClassTypeRepository repo) {
        this.repo = repo;
    }

    public List<Map<String, Object>> getSpells(){
        return repo.getSpell();
    }

    public ClassType getClassByUser(String userID){
        return repo.getClassByUser(userID);
    }

    public Result<ClassType> addClass(String className, String userID){
        Result<ClassType> result = new Result<>();
        //validate
        ClassType ct;
        switch (className) {
            case "wizard" -> ct = new Wizard();
            case "rogue" -> ct = new Rogue();
            default -> {
                System.out.println("error in classtype mapper");
                return null;
            }
        }
        ct.setUserID(userID);
        if (result.isSuccess()){
            ClassType savedCT = repo.addClass(ct);
            result.setPayload(savedCT);
        }
        return result;
    }
}
