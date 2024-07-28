package com.main.domain;

import com.main.model.AbilityScores;

import java.util.ArrayList;
import java.util.List;

public class ASResult {
    private ArrayList<String> messages = new ArrayList<>();
    private AbilityScores as;

    public List<String> getErrorMessages(){
        return new ArrayList<>(messages);
    }

    public void addErrorMessage(String message){
        messages.add(message);
    }

    public boolean isSuccess(){
        return messages.size()==0;
    }

    public AbilityScores getAS(){
        return this.as;
    }

    public void setAS(AbilityScores as){
        this.as = as;
    }
}
