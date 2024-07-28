package com.main.data.mapper;

import com.main.model.Skills;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SkillsMapper implements RowMapper<Skills> {
    @Override
    public Skills mapRow(ResultSet resultSet, int i) throws SQLException {
        Skills skills = new Skills();

        skills.setSkillID(resultSet.getInt("skillID"));
        skills.setAcrobatics(resultSet.getInt("acrobatics"));
        skills.setAnimalHandling(resultSet.getInt("animalHandling"));
        skills.setArcana(resultSet.getInt("arcana"));
        skills.setAthletics(resultSet.getInt("athletics"));
        skills.setDeception(resultSet.getInt("deception"));
        skills.setHistory(resultSet.getInt("hist"));
        skills.setInsight(resultSet.getInt("insight"));
        skills.setIntimidation(resultSet.getInt("intimidation"));
        skills.setInvestigation(resultSet.getInt("investigation"));
        skills.setMedicine(resultSet.getInt("medicine"));
        skills.setNature(resultSet.getInt("nature"));
        skills.setPerception(resultSet.getInt("perception"));
        skills.setPerformance(resultSet.getInt("performance"));
        skills.setPersuasion(resultSet.getInt("persuasion"));
        skills.setReligion(resultSet.getInt("religion"));
        skills.setSleightOfHand(resultSet.getInt("sleightOfHand"));
        skills.setStealth(resultSet.getInt("stealth"));
        skills.setSurvival(resultSet.getInt("survival"));
        skills.setAsID(resultSet.getInt("asID"));

        return skills;
    }
}
