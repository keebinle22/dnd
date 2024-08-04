package com.main.data.mapper;

import com.main.model.BattleStat;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BattleStatMapper implements RowMapper<BattleStat> {

    @Override
    public BattleStat mapRow(ResultSet rs, int rowNum) throws SQLException {
        BattleStat bs = new BattleStat();
        bs.setBsID(rs.getInt("bsID"));
        bs.setInitiative(rs.getInt("initiative"));
        bs.setArmor(rs.getInt("armor"));
        bs.setDefense(rs.getString("defense"));
        bs.setInspiration(rs.getInt("inspiration"));
        bs.setProfBonus(rs.getInt("profBonus"));
        bs.setAsSaveDC(rs.getInt("asSaveDC"));
        bs.setSpeed(rs.getString("speed"));
        bs.setUserID(rs.getString("userID"));
        return bs;
    }
}
