package com.main.data;

import com.main.data.mapper.HealthMapper;
import com.main.model.Health;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class HealthRepository {
    private final JdbcTemplate jdbcTemplate;

    public HealthRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Health> getAllHealth(){
        final String sql = "select * from health limit 100;";
        return jdbcTemplate.query(sql,new HealthMapper());
    }

    public Health getHealthByID(String userID){
        final String sql = "select * from health where userID =?;";
        return jdbcTemplate.query(sql, new HealthMapper(), userID).stream().findAny().orElse(null);
    }

    public Health addHealth(Health health){
        final String sql = "insert into health (maxHP, curHP, tempHP, totalHitDice, curHitDice, successDeathSaves, failDeathSaves, userID) " +
                "value (?,?,?,?,?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, health.getMaxHP());
            ps.setInt(2, health.getCurHP());
            ps.setInt(3, health.getTempHP());
            ps.setInt(4, health.getTotalHitDice());
            ps.setInt(5, health.getCurHitDice());
            ps.setInt(6, health.getSuccessDeathSaves());
            ps.setInt(7, health.getFailDeathSaves());
            ps.setString(8, health.getUserID());
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0){
            return null;
        }
        health.setHealthID(keyHolder.getKey().intValue());
        return health;
    }
    public boolean editHealth(Health health){
        final String sql = "update health set " +
                "maxHP = ?, " +
                "curHP = ?, " +
                "tempHP = ?, " +
                "totalHitDice = ?, " +
                "curHitDice = ?, " +
                "successDeathSaves = ?, " +
                "failDeathSaves = ? " +
                "where userID = ?;";
        return jdbcTemplate.update(sql,
                health.getMaxHP(),
                health.getCurHP(),
                health.getTempHP(),
                health.getTotalHitDice(),
                health.getCurHitDice(),
                health.getSuccessDeathSaves(),
                health.getFailDeathSaves(),
                health.getUserID()) > 0;
    }

    public boolean levelUpHealth(Health health){
        final String sql = "update health set " +
                "maxHP = ?, " +
                "curHP = ?, " +
                "totalHitDice = ? " +
                "where userID = ?;";
        return jdbcTemplate.update(sql,
                health.getMaxHP(),
                health.getCurHP(),
                health.getTotalHitDice(),
                health.getUserID()) > 0;
    }

    public boolean deleteHealth(String userID){
        final String sql = "delete from health where userID = ?;";
        return jdbcTemplate.update(sql, userID) > 0;
    }

    public void deleteAll(){
        final String sql = "delete from health;";
        jdbcTemplate.update(sql);
    }
}
