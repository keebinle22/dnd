package com.main.data.mapper;

import com.main.model.Health;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class HealthMapper implements RowMapper<Health> {

    @Override
    public Health mapRow(ResultSet rs, int rowNum) throws SQLException {
        Health health = new Health();

        health.setHealthID(rs.getInt("healthID"));
        health.setMaxHP(rs.getInt("maxHP"));
        health.setCurHP(rs.getInt("curHP"));
        health.setTempHP(rs.getInt("tempHP"));
        health.setTotalHitDice(rs.getInt("totalHitDice"));
        health.setCurHitDice(rs.getInt("curHitDice"));
        health.setSuccessDeathSaves(rs.getInt("successDeathSaves"));
        health.setFailDeathSaves(rs.getInt("failDeathSaves"));
        health.setUserID(rs.getString("userID"));
        return health;
    }
}
