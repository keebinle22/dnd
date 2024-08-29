package com.main.data.mapper;

import com.main.model.classes.ClassType;
import com.main.model.classes.Rogue;
import com.main.model.classes.Wizard;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ClassTypeMapper implements RowMapper<ClassType> {
    @Override
    public ClassType mapRow(ResultSet rs, int rowNum) throws SQLException {
        String cname = rs.getString("class_name");
        ClassType ct;
        switch (cname){
            case "wizard":
                ct = new Wizard();
                break;
            case "rogue":
                ct = new Rogue();
                break;
            default:
                System.out.println("error in classtype mapper");
                return null;
        }
        ct.setCtID(rs.getInt("class_type_id"));
        ct.setFeatures(null);
        ct.setSpellSlots(null);
//        ct.setSneakAttack(rs.getString("sneak_attack"));
        ct.setUserID(rs.getString("userID"));
        return ct;
    }
}
