package com.main.data;

import com.main.data.mapper.ClassTypeMapper;
import com.main.model.CharInfo;
import com.main.model.classes.ClassType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Repository
public class ClassTypeRepository {
    private final JdbcTemplate jdbcTemplate;

    public ClassTypeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ClassType> getAllClass(){
        String sql = "select * from class_type;";
        sql = "select * from cur_spell_slots;";
        Map<String, Object> test = jdbcTemplate.queryForMap(sql);
        return null;
    }

    public ClassType getClassByUser(String userID){
        String sql = "select * from class_type;";
        ClassType test = jdbcTemplate.query(sql, new ClassTypeMapper()).stream().findAny().orElse(null);
        assert test != null;
        sql = "select * from spell_slots where class_type_id = ?;";
        test.setSpellSlots(jdbcTemplate.queryForList(sql, test.getCtID()));
        return test;
    }

    public ClassType addClass(ClassType classType){
        final String sql = "insert into class_type (class_name, userID) value (?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, classType.getClassName());
            ps.setString(2, classType.getUserID());
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0){
            return null;
        }
        classType.setCtID(Objects.requireNonNull(keyHolder.getKey()).intValue());
        Map<String, Object> spellSlot = classType.getStartingSpellSlots();
        if (spellSlot != null){
            spellSlot.put("class_type_id", classType.getCtID());
            addSpellSlot(classType.getStartingSpellSlots());
        }

        return classType;
    }

    public boolean updateClass(ClassType classType){
        final String sql = "update class_type set class_name = ?, userID = ? where userID = ?;";
        return jdbcTemplate.update(sql, classType.getClassName(), classType.getUserID()) > 0;
    }

    public boolean deleteClass(String userID){
        final String sql = "delete from class_type where userID = ?;";
        return jdbcTemplate.update(sql, userID) > 0;
    }

    public boolean levelUp(CharInfo ci){
        ClassType ct = getClassByUser(ci.getUserID());
        int level = ci.getLevel();
        Map<String, Object> spellSlot = null;
        String spellLevel = "";
        String newSpellLevel = "";
        int newSlot = 0;

        switch (level) {
            case 1, 2 -> spellLevel = "1st";
            case 3 -> {
                spellLevel = "1st";
                newSpellLevel = "2rd";
                newSlot = 2;
            }
            case 4 -> spellLevel = "2nd";
            case 5 -> {
                newSpellLevel = "3rd";
                newSlot = 2;
            }
            case 6 -> spellLevel = "3rd";
            case 7 -> {
                newSpellLevel = "4th";
                newSlot = 1;
            }
            case 8, 9 -> {
                spellLevel = "4th";
                newSpellLevel = "5th";
                newSlot = 1;
            }
            case 10 -> spellLevel = "5th";
        }
        if (!newSpellLevel.isBlank() && !newSpellLevel.isEmpty()){
            Map<String, Object> newSpellSlot = new HashMap<>();
            newSpellSlot.put("spell_level", newSpellLevel);
            newSpellSlot.put("total_slot", newSlot);
            newSpellSlot.put("cur_slot", newSlot);
            newSpellSlot.put("class_type_id", ct.getCtID());
            addSpellSlot(newSpellSlot);
        }

        String finalSpellLevel = spellLevel;
        spellSlot = ct.getSpellSlots().stream().filter(stringObjectMap -> stringObjectMap.containsValue(finalSpellLevel)).findAny().orElse(null);
        if (spellSlot != null){
            int prevTotal = (int) spellSlot.get("total_slot");
            int prevCur = (int) spellSlot.get("cur_slot");
            spellSlot.replace("total_slot", prevTotal+1);
            spellSlot.replace("cur_slot", prevCur+1);
        }
        String sql = "update spell_slots set " +
                "spell_level=?, " +
                "total_slot=?, " +
                "cur_slot=? " +
                "where spell_slot_id=?";
        assert spellSlot != null;
        return jdbcTemplate.update(sql, spellSlot.get("spell_level"), spellSlot.get("total_slot"), spellSlot.get("cur_slot"), spellSlot.get("spell_slot_id")) > 0;
    }

    public List<Map<String, Object>> getSpell(){
        final String sql = "select * from spell_slots;";
        return jdbcTemplate.queryForList(sql);
    }

    private Map<String, Object> addSpellSlot(Map<String, Object> spellSlot){
        final String sql = "insert into spell_slots (spell_level, total_slot, cur_slot, class_type_id) value (?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, (String) spellSlot.get("spell_level"));
            ps.setInt(2, (Integer) spellSlot.get("total_slot"));
            ps.setInt(3, (Integer) spellSlot.get("cur_slot"));
            ps.setInt(4, (Integer) spellSlot.get("class_type_id"));
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0){
            return null;
        }
        return spellSlot;
    }
}
