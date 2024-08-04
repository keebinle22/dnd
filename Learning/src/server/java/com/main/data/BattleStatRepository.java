package com.main.data;

import com.main.data.mapper.BattleStatMapper;
import com.main.model.BattleStat;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class BattleStatRepository {
    private final JdbcTemplate jdbcTemplate;

    public BattleStatRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<BattleStat> findAllBS(){
        final String sql = "select * from battle_stat limit 100;";
        return jdbcTemplate.query(sql, new BattleStatMapper());
    }

    public BattleStat getBSByID(String userID){
        final String sql = "select * from battle_stat where userID = ?;";
        return jdbcTemplate.query(sql, new BattleStatMapper(), userID).stream().findAny().orElse(null);
    }

    public BattleStat addBS(BattleStat bs){
        final String sql = "insert into battle_stat (initiative, armor, defense, inspiration, profBonus, asSaveDC, speed, userID) value (?,?,?,?,?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, bs.getInitiative());
            ps.setInt(2, bs.getArmor());
            ps.setString(3, bs.getDefense());
            ps.setInt(4, bs.getInspiration());
            ps.setInt(5, bs.getProfBonus());
            ps.setInt(6, bs.getAsSaveDC());
            ps.setString(7, bs.getSpeed());
            ps.setString(8, bs.getUserID());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0){
            return null;
        }

        bs.setBsID(keyHolder.getKey().intValue());
        return bs;
    }

    public boolean editBS(BattleStat bs){
        final String sql = "update battle_stat set " +
                "initiative = ?, " +
                "armor = ?, " +
                "defense = ?, " +
                "inspiration = ?, " +
                "profBonus = ?, " +
                "asSaveDC = ?, " +
                "speed = ? " +
                "where userID = ?;";
        return jdbcTemplate.update(sql,
                bs.getInitiative(),
                bs.getArmor(),
                bs.getDefense(),
                bs.getInspiration(),
                bs.getProfBonus(),
                bs.getAsSaveDC(),
                bs.getSpeed(),
                bs.getUserID()) > 0;
    }

    public boolean deleteBS(String userID){
        final String sql = "delete from battle_stat where userID = ?;";
        return jdbcTemplate.update(sql, userID) > 0;
    }
}
