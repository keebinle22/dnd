package com.main.data;

import com.main.data.mapper.BattleStatMapper;
import com.main.data.mapper.UserMapper;
import com.main.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<User> findAll(){
        String sql = "select * from dnd_user inner join dnd_role on dnd_user.role_id = dnd_role.role_id;";
        return jdbcTemplate.query(sql, new UserMapper());
    }

    public User findByUser(String username){
        String sql = "select * from dnd_user inner join dnd_role on dnd_user.role_id = dnd_role.role_id where dnd_user.username = ?;";
        return jdbcTemplate.query(sql, new UserMapper(), username).stream().findAny().orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }

    public User addUser(User user){
        final String sql = "insert into dnd_user (username, pw, role_id) value (?,?,?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            ps.setInt(3, user.getRole().getRoleID());
            return ps;
        }, keyHolder);
        if (rowsAffected <= 0){
            return null;
        }
        user.setId(keyHolder.getKey().intValue());
        return user;
    }

}
