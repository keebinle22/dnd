package com.main.data;

import com.main.data.mapper.AbilityScoreMapper;
import com.main.model.AbilityScores;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class AbilityScoreRepository {
    private final JdbcTemplate jdbcTemplate;

    public AbilityScoreRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<AbilityScores> findAllAS(){
        //limit until we develop a paging solution
        final String sql = "select * from ability_score limit 100;";
        return jdbcTemplate.query(sql, new AbilityScoreMapper());
    }

    public AbilityScores getASById(String userID){
        final String sql = "select * from ability_score where userID = ?;";

        AbilityScores result = jdbcTemplate.query(sql, new AbilityScoreMapper(), userID).stream().findAny().orElse(null);

        return result;
    }

    /**
     * Add AbilityScores to ability_score table
     * @param as (AbilityScores class)
     * @return AbilityScores
     */
    public AbilityScores addAS(AbilityScores as){
        final String sql = "insert into ability_score (strength, dexterity, constitution, intelligence, wisdom, charisma, userID) value (?,?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connections -> {
            PreparedStatement ps = connections.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, as.getStrength());
            ps.setInt(2, as.getDexterity());
            ps.setInt(3, as.getConstitution());
            ps.setInt(4, as.getIntelligence());
            ps.setInt(5, as.getWisdom());
            ps.setInt(6, as.getCharisma());
            ps.setString(7, as.getUserID());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0 ){
            return null;
        }

        as.setAsID(keyHolder.getKey().intValue());

        return as;
    }

    /**
     * Edits AbilityScore in ability_score table
     * @param as (AbiltyScores class)
     * @return result is pass or fail for updating ability_score table
     */
    public boolean editAS(AbilityScores as){
        final String sql = "update ability_score set " +
                "strength = ?," +
                "dexterity = ?," +
                "constitution = ?," +
                "intelligence = ?," +
                "wisdom = ?," +
                "charisma = ?" +
                " where userID = ?;";

        return jdbcTemplate.update(sql, as.getStrength(), as.getDexterity(), as.getConstitution(), as.getIntelligence(), as.getWisdom(), as.getCharisma(), as.getUserID()) > 0;
    }

    public boolean deleteAS(String userID){
        final String sql = "delete from ability_score where userID = ?;";
        return jdbcTemplate.update(sql, userID) > 0;
    }
}
