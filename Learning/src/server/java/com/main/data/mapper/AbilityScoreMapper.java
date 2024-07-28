package com.main.data.mapper;

import com.main.model.AbilityScores;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AbilityScoreMapper implements RowMapper<AbilityScores> {
    @Override
    public AbilityScores mapRow(ResultSet resultSet, int i) throws SQLException {
        AbilityScores as = new AbilityScores();
        as.setAsID(resultSet.getInt("asID"));
        as.setStrength(resultSet.getInt("strength"));
        as.setDexterity(resultSet.getInt("dexterity"));
        as.setConstitution(resultSet.getInt("constitution"));
        as.setIntelligence(resultSet.getInt("intelligence"));
        as.setWisdom(resultSet.getInt("wisdom"));
        as.setCharisma(resultSet.getInt("charisma"));
        as.setUserID(resultSet.getString("userID"));
        return as;
    }
}
