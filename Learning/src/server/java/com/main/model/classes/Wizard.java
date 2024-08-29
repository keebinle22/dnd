package com.main.model.classes;

import com.main.model.AbilitiesEnum;

import java.util.*;

public class Wizard implements ClassType {

    private int ctID;
    private String userID;
    private final String className = "wizard";
    private final List<AbilitiesEnum> primaryAbility = List.of(AbilitiesEnum.INTELLIGENCE);
    private final List<AbilitiesEnum> stProf = Arrays.asList(AbilitiesEnum.INTELLIGENCE, AbilitiesEnum.WISDOM);
    private final List<String> armorProf = new ArrayList<>();
    private final List<String> weaponProf = Arrays.asList("daggers", "darts", "slings", "quarterstaffs", "light_crossbows");
    private final Map<String, Object> startingSpellSlots = new HashMap<>();
    private List<String> features;

    private List<Map<String, Object>> spellSlots;
    private final AbilitiesEnum spellMod = AbilitiesEnum.INTELLIGENCE;

    public Wizard(){}

    public Wizard(int ctID, String userID, List<String> features, List<Map<String, Object>> spellSlots) {
        this.ctID = ctID;
        this.userID = userID;
        this.features = features;
        this.spellSlots = spellSlots;
    }

    @Override
    public Map<String, Object> getStartingSpellSlots() {
        startingSpellSlots.put("spell_level", "Cantrip");
        startingSpellSlots.put("total_slot", 3);
        startingSpellSlots.put("cur_slot", 3);
        return startingSpellSlots;
    }

    @Override
    public int getCtID() {
        return ctID;
    }
    @Override
    public void setCtID(int ctID) {
        this.ctID = ctID;
    }

    @Override
    public String getUserID() {
        return userID;
    }

    @Override
    public void setUserID(String userID) {
        this.userID = userID;
    }

    @Override
    public String getClassName() {
        return className;
    }

    @Override
    public String getHitDice() {
        return "1d6";
    }

    @Override
    public List<AbilitiesEnum> getPrimaryAbility() {
        return primaryAbility;
    }

    @Override
    public List<AbilitiesEnum> getStProf() {
        return stProf;
    }

    @Override
    public List<String> getArmorProf() {
        return armorProf;
    }

    @Override
    public List<String> getWeaponProf() {
        return weaponProf;
    }

    @Override
    public List<String> getFeatures() {
        return features;
    }

    @Override
    public void setFeatures(List<String> features) {
        this.features = features;
    }

    @Override
    public List<Map<String, Object>> getSpellSlots() {
        return spellSlots;
    }

    @Override
    public void setSpellSlots(List<Map<String, Object>> spellSlots) {
        this.spellSlots = spellSlots;
    }


    @Override
    public AbilitiesEnum getSpellMod() {
        return spellMod;
    }

    @Override
    public String getTools() {
        return null;
    }

    @Override
    public String getSneakAttack() {
        return null;
    }

    @Override
    public void setSneakAttack(String sneakAttack) {

    }

    @Override
    public String toString() {
        return "Wizard{" +
                "ctID=" + ctID +
                ", userID='" + userID + '\'' +
                ", className='" + className + '\'' +
                ", primaryAbility=" + primaryAbility +
                ", stProf=" + stProf +
                ", armorProf=" + armorProf +
                ", weaponProf=" + weaponProf +
                ", features=" + features +
                ", spellSlots=" + spellSlots +
                ", spellMod=" + spellMod +
                '}';
    }
}
