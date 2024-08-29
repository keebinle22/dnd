package com.main.data;

import com.main.data.mapper.CharInfoMapper;
import com.main.model.CharInfo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class CharInfoRepository {
    private final JdbcTemplate jdbcTemplate;

    public CharInfoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<CharInfo> findAllCharInfo(){
        final String sql = "select * from charInfo limit 100;";
        return jdbcTemplate.query(sql, new CharInfoMapper());
    }

    public CharInfo findCharInfoById(String userID){
        String sql = "select * from charInfo where userID = ?;";
        return jdbcTemplate.query(sql, new CharInfoMapper(), userID).stream().findAny().orElse(null);
    }

    public CharInfo addCharInfo(CharInfo charInfo){
        final String sql = "insert into charInfo (userID, classType, levels, race, background, exp) " +
                "value (?,?,?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connections -> {
            PreparedStatement ps = connections.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, charInfo.getUserID());
            ps.setString(2, charInfo.getClassType());
            ps.setInt(3, charInfo.getLevel());
            ps.setString(4, charInfo.getRace());
            ps.setString(5, charInfo.getBackground());
            ps.setInt(6, charInfo.getExp());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0){
            return null;
        }

        return charInfo;
    }

    public boolean updateCharInfo(CharInfo charInfo){
        final String sql = "update charInfo set " +
                "classType = ?, " +
                "levels = ?, " +
                "race = ?, " +
                "background = ?," +
                "exp = ? " +
                "where userID = ?;";
        return jdbcTemplate.update(sql, charInfo.getClassType(), charInfo.getLevel(), charInfo.getRace(),
                charInfo.getBackground(), charInfo.getExp(), charInfo.getUserID()) > 0;
    }

    public boolean deleteCharInfo(String userID){
        final String sql = "delete from charInfo where userID = ?;";
        return jdbcTemplate.update(sql, userID) > 0;
    }

    public void deleteAll(){
        final String sql = "delete from charInfo;";
        jdbcTemplate.update(sql);
    }
}
