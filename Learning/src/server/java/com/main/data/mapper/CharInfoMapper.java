package com.main.data.mapper;

import com.main.model.CharInfo;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CharInfoMapper implements RowMapper<CharInfo> {
    @Override
    public CharInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
        CharInfo charInfo = new CharInfo();

        charInfo.setUserID(rs.getString("userID"));
        charInfo.setClassType(rs.getString("classType")); //TODO: Change to rs.getObject()
        charInfo.setLevel(rs.getInt("levels"));
        charInfo.setRace(rs.getString("race")); //TODO: Change to rs.getObject()
        charInfo.setBackground(rs.getString("background"));
        charInfo.setExp(rs.getInt("exp"));

        return charInfo;
    }
}
