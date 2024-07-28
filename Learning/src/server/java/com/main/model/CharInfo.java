package com.main.model;

import java.util.Objects;

public class CharInfo {

    private String userID;
    private String classType; //TODO: Make class object (inheritance?)
    private int level;
    private String race; //TODO: Make race object (inheritance?)
    private String background;
    private int exp;

    public CharInfo(){}

    public CharInfo(String userID, String classType, int level, String race, String background, int exp) {
        this.userID = userID;
        this.classType = classType;
        this.level = level;
        this.race = race;
        this.background = background;
        this.exp = exp;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getClassType() {
        return classType;
    }

    public void setClassType(String classType) {
        this.classType = classType;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getRace() {
        return race;
    }

    public void setRace(String race) {
        this.race = race;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CharInfo)) return false;
        CharInfo charInfo = (CharInfo) o;
        return userID == charInfo.userID && level == charInfo.level && exp == charInfo.exp && classType.equals(charInfo.classType) && race.equals(charInfo.race) && background.equals(charInfo.background);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userID, classType, level, race, background, exp);
    }

    @Override
    public String toString() {
        return "CharInfo{" +
                "userID=" + userID +
                ", classType='" + classType + '\'' +
                ", level=" + level +
                ", race='" + race + '\'' +
                ", background='" + background + '\'' +
                ", exp=" + exp +
                '}';
    }
}
