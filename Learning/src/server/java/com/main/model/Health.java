package com.main.model;

public class Health {
    private int healthID;
    private int maxHP;
    private int curHP;
    private int tempHP;
    private int totalHitDice;
    private int curHitDice;
    private int successDeathSaves;
    private int failDeathSaves;
    private String userID;

    public Health() {
    }

    public Health(int healthID, int maxHP, int curHP, int tempHP, int totalHitDice, int curHitDice, int successDeathSaves, int failDeathSaves, String userID) {
        this.healthID = healthID;
        this.maxHP = maxHP;
        this.curHP = curHP;
        this.tempHP = tempHP;
        this.totalHitDice = totalHitDice;
        this.curHitDice = curHitDice;
        this.successDeathSaves = successDeathSaves;
        this.failDeathSaves = failDeathSaves;
        this.userID = userID;
    }

    public int getHealthID() {
        return healthID;
    }

    public void setHealthID(int healthID) {
        this.healthID = healthID;
    }

    public int getMaxHP() {
        return maxHP;
    }

    public void setMaxHP(int maxHP) {
        this.maxHP = maxHP;
    }

    public int getCurHP() {
        return curHP;
    }

    public void setCurHP(int curHP) {
        this.curHP = curHP;
    }

    public int getTempHP() {
        return tempHP;
    }

    public void setTempHP(int tempHP) {
        this.tempHP = tempHP;
    }

    public int getTotalHitDice() {
        return totalHitDice;
    }

    public void setTotalHitDice(int totalHitDice) {
        this.totalHitDice = totalHitDice;
    }

    public int getCurHitDice() {
        return curHitDice;
    }

    public void setCurHitDice(int curHitDice) {
        this.curHitDice = curHitDice;
    }

    public int getSuccessDeathSaves() {
        return successDeathSaves;
    }

    public void setSuccessDeathSaves(int successDeathSaves) {
        this.successDeathSaves = successDeathSaves;
    }

    public int getFailDeathSaves() {
        return failDeathSaves;
    }

    public void setFailDeathSaves(int failDeathSaves) {
        this.failDeathSaves = failDeathSaves;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }
}
