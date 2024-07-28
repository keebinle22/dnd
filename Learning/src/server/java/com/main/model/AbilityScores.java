package com.main.model;

import java.util.Objects;

public class AbilityScores {
    private int asID;
    private int strength;
    private int dexterity;
    private int constitution;
    private int intelligence;
    private int wisdom;
    private int charisma;
    private String userID;

    public AbilityScores(){}

    public AbilityScores(int asID, int strength, int dexterity, int constitution, int intelligence, int wisdom, int charisma, String userID) {
        this.asID = asID;
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.intelligence = intelligence;
        this.wisdom = wisdom;
        this.charisma = charisma;
        this.userID = userID;
    }

    public int getAsID(){
        return this.asID;
    }

    public void setAsID(int asID){
        this.asID = asID;
    }

    public int getStrength() {
        return strength;
    }

    public void setStrength(int strength) {
        this.strength = strength;
    }

    public int getDexterity() {
        return dexterity;
    }

    public void setDexterity(int dexterity) {
        this.dexterity = dexterity;
    }

    public int getConstitution() {
        return constitution;
    }

    public void setConstitution(int constitution) {
        this.constitution = constitution;
    }

    public int getIntelligence() {
        return intelligence;
    }

    public void setIntelligence(int intelligence) {
        this.intelligence = intelligence;
    }

    public int getWisdom() {
        return wisdom;
    }

    public void setWisdom(int wisdom) {
        this.wisdom = wisdom;
    }

    public int getCharisma() {
        return charisma;
    }

    public void setCharisma(int charisma) {
        this.charisma = charisma;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    @Override
    public String toString() {
        return "AbilityScores{" +
                "asID=" + asID +
                ", strength=" + strength +
                ", dexterity=" + dexterity +
                ", constitution=" + constitution +
                ", intelligence=" + intelligence +
                ", wisdom=" + wisdom +
                ", charisma=" + charisma +
                ", userID='" + userID + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AbilityScores)) return false;
        AbilityScores that = (AbilityScores) o;
        return asID == that.asID && strength == that.strength && dexterity == that.dexterity && constitution == that.constitution && intelligence == that.intelligence && wisdom == that.wisdom && charisma == that.charisma && userID.equals(that.userID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(asID, strength, dexterity, constitution, intelligence, wisdom, charisma, userID);
    }
}
