package com.main.data.mapper;

import com.main.model.Role;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RoleMapper implements RowMapper<Role> {
    @Override
    public Role mapRow(ResultSet rs, int i) throws SQLException{
        Role role = new Role();
        role.setRoleID(rs.getInt("role_id"));
        role.setType(rs.getString("role_type"));
        role.setDescription(rs.getString("role_description"));
        return role;
    }
}
