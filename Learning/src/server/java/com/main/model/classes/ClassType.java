package com.main.model.classes;

import com.main.model.AbilitiesEnum;

import java.util.List;
import java.util.Map;

public interface ClassType {
    Map<String, Object> getStartingSpellSlots();

    int getCtID();

    void setCtID(int ctID);

    String getUserID();

    void setUserID(String userID);

    String getClassName();

    String getHitDice();

    List<AbilitiesEnum> getPrimaryAbility();

    List<AbilitiesEnum> getStProf();

    List<String> getArmorProf();

    List<String> getWeaponProf();

    List<String> getFeatures();

    void setFeatures(List<String> features);

    List<Map<String, Object>> getSpellSlots();

    void setSpellSlots(List<Map<String, Object>> spellSlots);

    AbilitiesEnum getSpellMod();

    String getTools();

    String getSneakAttack();

    void setSneakAttack(String sneakAttack);
}
