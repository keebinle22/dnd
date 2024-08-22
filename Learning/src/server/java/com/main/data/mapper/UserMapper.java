package com.main.data.mapper;

import com.main.model.Role;
import com.main.model.RolesEnum;
import com.main.model.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User> {
    @Override
    public User mapRow(ResultSet rs, int i) throws SQLException{
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("pw"));
        user.setRole(new Role(
                rs.getInt("role_id"),
                RolesEnum.valueOf(rs.getString("role_type")),
                rs.getString("role_description")
                )
        );
        return user;
    }
}

