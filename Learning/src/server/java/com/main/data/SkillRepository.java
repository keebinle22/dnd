package com.main.data;

import com.main.data.mapper.SkillsMapper;
import com.main.model.Skills;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class SkillRepository {
    private final JdbcTemplate jdbcTemplate;

    public SkillRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Skills> findAllSkills(){
        final String sql = "select * from skills limit 100;";
        return jdbcTemplate.query(sql, new SkillsMapper());
    }

    public Skills findSkillById(int asID){
        final String sql = "select * from skills where asID = ?;";
        Skills result = jdbcTemplate.query(sql, new SkillsMapper(), asID).stream().findAny().orElse(null);
        return result;
    }

    public Skills addSkill(Skills skills){

        final String sql = "insert into skills (acrobatics, animalHandling, arcana, athletics, deception, hist, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival, asID)" +
                "value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

//        final String sql = "insert into skills (id, strength, dexterity, constitution, intelligence, wisdom, charisma, " +
//                "acrobatics, animalHandling, arcana, athletics, deception, hist, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion" +
//                "religion, sleightOfHand, stealth, survival) value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connections -> {
            PreparedStatement ps = connections.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, skills.getAcrobatics());
            ps.setInt(2, skills.getAnimalHandling());
            ps.setInt(3, skills.getArcana());
            ps.setInt(4, skills.getAthletics());
            ps.setInt(5, skills.getDeception());
            ps.setInt(6, skills.getHistory());
            ps.setInt(7, skills.getInsight());
            ps.setInt(8, skills.getIntimidation());
            ps.setInt(9, skills.getInvestigation());
            ps.setInt(10, skills.getMedicine());
            ps.setInt(11, skills.getNature());
            ps.setInt(12, skills.getPerception());
            ps.setInt(13, skills.getPerformance());
            ps.setInt(14, skills.getPersuasion());
            ps.setInt(15, skills.getReligion());
            ps.setInt(16, skills.getSleightOfHand());
            ps.setInt(17, skills.getStealth());
            ps.setInt(18, skills.getSurvival());
            ps.setInt(19, skills.getAsID());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0){
            return null;
        }

        skills.setSkillID(keyHolder.getKey().intValue());
        return skills;
    }

    public boolean updateSkill(Skills skills){
        final String sql = "update skills set " +
                "acrobatics = ?, " +
                "animalHandling = ?, " +
                "arcana = ?, " +
                "athletics = ?, " +
                "deception = ?, " +
                "hist = ?, " +
                "insight = ?, " +
                "intimidation = ?, " +
                "investigation = ?, " +
                "medicine = ?, " +
                "nature = ?, " +
                "perception = ?, " +
                "performance = ?, " +
                "persuasion = ?, " +
                "religion = ?, " +
                "sleightOfHand = ?, " +
                "stealth = ?, " +
                "survival = ? " +
                "where asID = ?;";

        return jdbcTemplate.update(sql,
                skills.getAcrobatics() ,skills.getAnimalHandling(),skills.getArcana(),skills.getAthletics(),skills.getDeception(),skills.getHistory(),skills.getInsight(),skills.getIntimidation(),
                skills.getInvestigation(), skills.getMedicine(),skills.getNature(),skills.getPerception(),skills.getPerformance(),skills.getPersuasion(),skills.getReligion(),skills.getSleightOfHand(),skills.getStealth(),
                skills.getSurvival(), skills.getAsID()) > 0;
    }
}
