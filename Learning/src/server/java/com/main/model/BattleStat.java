package com.main.model;

import java.util.Objects;

public class BattleStat {

    private int bsID;
    private int initiative;
    private int armor;
    private String defense;
    private int inspiration;
    private int profBonus;
    private int asSaveDC;
    private String speed;
    private String userID;

    public BattleStat() {
    }

    public BattleStat(String userID) {
        this.userID = userID;
//        this.bsID = 0;
//        this.initiative = 0;
//        this.armor = 0;
//        this.profBonus = 0;
//        this.speed = "";
//        this.defense = "";
//        this.asSaveDC = 0;
    }

    public BattleStat(int bsID, int initiative, int armor, int profBonus, String speed, String userID) {
        this.bsID = bsID;
        this.initiative = initiative;
        this.armor = armor;
        this.profBonus = profBonus;
        this.speed = speed;
        this.userID = userID;
    }

    public BattleStat(int bsID, int initiative, int armor, String defense, int inspiration, int profBonus, int asSaveDC, String speed, String userID) {
        this.bsID = bsID;
        this.initiative = initiative;
        this.armor = armor;
        this.defense = defense;
        this.inspiration = inspiration;
        this.profBonus = profBonus;
        this.asSaveDC = asSaveDC;
        this.speed = speed;
        this.userID = userID;
    }

    public int getBsID() {
        return bsID;
    }

    public void setBsID(int bsID) {
        this.bsID = bsID;
    }

    public int getInitiative() {
        return initiative;
    }

    public void setInitiative(int initiative) {
        this.initiative = initiative;
    }

    public int getArmor() {
        return armor;
    }

    public void setArmor(int armor) {
        this.armor = armor;
    }

    public String getDefense() {
        return defense;
    }

    public void setDefense(String defense) {
        this.defense = defense;
    }

    public int getInspiration() {
        return inspiration;
    }

    public void setInspiration(int inspiration) {
        this.inspiration = inspiration;
    }

    public int getProfBonus() {
        return profBonus;
    }

    public void setProfBonus(int profBonus) {
        this.profBonus = profBonus;
    }

    public int getAsSaveDC() {
        return asSaveDC;
    }

    public void setAsSaveDC(int asSaveDC) {
        this.asSaveDC = asSaveDC;
    }

    public String getSpeed() {
        return speed;
    }

    public void setSpeed(String speed) {
        this.speed = speed;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BattleStat)) return false;
        BattleStat that = (BattleStat) o;
        return bsID == that.bsID && initiative == that.initiative && armor == that.armor && inspiration == that.inspiration && profBonus == that.profBonus && asSaveDC == that.asSaveDC && speed == that.speed && defense.equals(that.defense) && userID.equals(that.userID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bsID, initiative, armor, defense, inspiration, profBonus, asSaveDC, speed, userID);
    }

    @Override
    public String toString() {
        return "BattleStat{" +
                "bsID=" + bsID +
                ", initiative=" + initiative +
                ", armor=" + armor +
                ", defense='" + defense + '\'' +
                ", inspiration=" + inspiration +
                ", profBonus=" + profBonus +
                ", abilitySaveDC=" + asSaveDC +
                ", speed=" + speed +
                ", userID='" + userID + '\'' +
                '}';
    }
}
