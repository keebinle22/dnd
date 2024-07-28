package com.main.model;

import java.util.Objects;

public class Skills {
    private int skillID;

    private int acrobatics;
    private int animalHandling;
    private int arcana;
    private int athletics;
    private int deception;
    private int history;
    private int insight;
    private int intimidation;
    private int investigation;
    private int medicine;
    private int nature;
    private int perception;
    private int performance;
    private int persuasion;
    private int religion;
    private int sleightOfHand;
    private int stealth;
    private int survival;
    private int asID;

    public Skills(){}

    public Skills(int skillID, int acrobatics, int animalHandling, int arcana, int athletics, int deception, int history, int insight, int intimidation, int investigation, int medicine, int nature, int perception, int performance, int persuasion, int religion, int sleightOfHand, int stealth, int survival, int asID) {
        this.skillID = skillID;
        this.acrobatics = acrobatics;
        this.animalHandling = animalHandling;
        this.arcana = arcana;
        this.athletics = athletics;
        this.deception = deception;
        this.history = history;
        this.insight = insight;
        this.intimidation = intimidation;
        this.investigation = investigation;
        this.medicine = medicine;
        this.nature = nature;
        this.perception = perception;
        this.performance = performance;
        this.persuasion = persuasion;
        this.religion = religion;
        this.sleightOfHand = sleightOfHand;
        this.stealth = stealth;
        this.survival = survival;
        this.asID = asID;
    }

    public int getSkillID() {
        return skillID;
    }

    public void setSkillID(int skillID) {
        this.skillID = skillID;
    }

    public int getAcrobatics() {
        return acrobatics;
    }

    public void setAcrobatics(int acrobatics) {
        this.acrobatics = acrobatics;
    }

    public int getAnimalHandling() {
        return animalHandling;
    }

    public void setAnimalHandling(int animalHandling) {
        this.animalHandling = animalHandling;
    }

    public int getArcana() {
        return arcana;
    }

    public void setArcana(int arcana) {
        this.arcana = arcana;
    }

    public int getAthletics() {
        return athletics;
    }

    public void setAthletics(int athletics) {
        this.athletics = athletics;
    }

    public int getDeception() {
        return deception;
    }

    public void setDeception(int deception) {
        this.deception = deception;
    }

    public int getHistory() {
        return history;
    }

    public void setHistory(int history) {
        this.history = history;
    }

    public int getInsight() {
        return insight;
    }

    public void setInsight(int insight) {
        this.insight = insight;
    }

    public int getIntimidation() {
        return intimidation;
    }

    public void setIntimidation(int intimidation) {
        this.intimidation = intimidation;
    }

    public int getInvestigation(){return investigation;}

    public void setInvestigation(int investigation){
        this.investigation = investigation;
    }

    public int getMedicine() {
        return medicine;
    }

    public void setMedicine(int medicine) {
        this.medicine = medicine;
    }

    public int getNature() {
        return nature;
    }

    public void setNature(int nature) {
        this.nature = nature;
    }

    public int getPerception() {
        return perception;
    }

    public void setPerception(int perception) {
        this.perception = perception;
    }

    public int getPerformance() {
        return performance;
    }

    public void setPerformance(int performance) {
        this.performance = performance;
    }

    public int getPersuasion() {
        return persuasion;
    }

    public void setPersuasion(int persuasion) {
        this.persuasion = persuasion;
    }

    public int getReligion() {
        return religion;
    }

    public void setReligion(int religion) {
        this.religion = religion;
    }

    public int getSleightOfHand() {
        return sleightOfHand;
    }

    public void setSleightOfHand(int sleightOfHand) {
        this.sleightOfHand = sleightOfHand;
    }

    public int getStealth() {
        return stealth;
    }

    public void setStealth(int stealth) {
        this.stealth = stealth;
    }

    public int getSurvival() {
        return survival;
    }

    public void setSurvival(int survival) {
        this.survival = survival;
    }

    public int getAsID() {
        return asID;
    }

    public void setAsID(int asID) {
        this.asID = asID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Skills)) return false;
        Skills skills = (Skills) o;
        return skillID == skills.skillID && acrobatics == skills.acrobatics && animalHandling == skills.animalHandling && arcana == skills.arcana && athletics == skills.athletics && deception == skills.deception && history == skills.history && insight == skills.insight && intimidation == skills.intimidation && investigation == skills.investigation && medicine == skills.medicine && nature == skills.nature && perception == skills.perception && performance == skills.performance && persuasion == skills.persuasion && religion == skills.religion && sleightOfHand == skills.sleightOfHand && stealth == skills.stealth && survival == skills.survival && asID == skills.asID;
    }

    @Override
    public int hashCode() {
        return Objects.hash(skillID, acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival, asID);
    }

    @Override
    public String toString() {
        return "Skills{" +
                "skillID=" + skillID +
                ", acrobatics=" + acrobatics +
                ", animalHandling=" + animalHandling +
                ", arcana=" + arcana +
                ", athletics=" + athletics +
                ", deception=" + deception +
                ", history=" + history +
                ", insight=" + insight +
                ", intimidation=" + intimidation +
                ", investigation=" + investigation +
                ", medicine=" + medicine +
                ", nature=" + nature +
                ", perception=" + perception +
                ", performance=" + performance +
                ", persuasion=" + persuasion +
                ", religion=" + religion +
                ", sleightOfHand=" + sleightOfHand +
                ", stealth=" + stealth +
                ", survival=" + survival +
                ", asID=" + asID +
                '}';
    }
}
