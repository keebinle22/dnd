package com.main.model.classes;

import com.main.model.AbilitiesEnum;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class Rogue implements ClassType{

    private int ctID;
    private String userID;
    private final String className = "rogue";
    private final List<AbilitiesEnum> primaryAbility = List.of(AbilitiesEnum.DEXTERITY);
    private final List<AbilitiesEnum> stProf = Arrays.asList(AbilitiesEnum.INTELLIGENCE, AbilitiesEnum.DEXTERITY);
    private final List<String> armorProf = List.of("light_armor");
    private final List<String> weaponProf = Arrays.asList("simple_weapons", "hand_crossbows", "longswords", "rapiers", "shortswords");
    private List<String> features;

//    private Map<String, Integer> totalSpellSlots;
//    private Map<String, Integer> curSpellSlots;
    private final AbilitiesEnum spellMod = AbilitiesEnum.CONSTITUTION;

    private String sneakAttack;
    private final String tools = "thieves_tools";

    public Rogue(){}

    public Rogue(int ctID, String userID, List<String> features, String sneakAttack) {
        this.ctID = ctID;
        this.userID = userID;
        this.features = features;
        this.sneakAttack = sneakAttack;
    }

    @Override
    public Map<String, Object> getStartingSpellSlots() {
        return null;
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
    public String getSneakAttack() {
        return sneakAttack;
    }

    @Override
    public void setSneakAttack(String sneakAttack) {
        this.sneakAttack = sneakAttack;
    }

    @Override
    public String getTools() {
        return tools;
    }

    @Override
    public String getHitDice() {
        return "1d8";
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
        return null;
    }

    @Override
    public void setSpellSlots(List<Map<String, Object>> spellSlots) {
    }
    @Override
    public AbilitiesEnum getSpellMod() {
        return spellMod;
    }
}
