package com.main.data;

import com.main.data.mapper.RoleMapper;
import com.main.model.Role;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class RoleRepository {

    private final JdbcTemplate jdbcTemplate;

    public RoleRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Role> findAll(){
        String sql = "select * from dnd_role;";
        return jdbcTemplate.query(sql, new RoleMapper());
    }

    public Role findRole(String role){
        String sql = "select * from dnd_role where role_type = ?;";
        return jdbcTemplate.query(sql, new RoleMapper(), role).stream().findAny().orElse(null);
    }

    public Role addRole(Role role){
        final String sql = "insert into dnd_role (role_type, role_description) value (?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, role.getType().toString());
            ps.setString(2, role.getDescription());
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0){
            return null;
        }
        role.setRoleID(keyHolder.getKey().intValue());
        return role;
    }
}
