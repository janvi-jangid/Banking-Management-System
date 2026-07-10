package com.binarybrains.dao;

import com.binarybrains.config.DBConnection;
import com.binarybrains.model.User;
import com.binarybrains.util.PasswordUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {

    // LOGIN
    public User login(String username, String password) {

        String sql = "SELECT * FROM users WHERE username=? AND password=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, username);
            ps.setString(2, PasswordUtil.hashPassword(password));
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                User user = new User();

                user.setUserId(rs.getInt("user_id"));
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                user.setRole(rs.getString("role"));
                user.setCustomerId(rs.getInt("customer_id"));

                return user;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    // VIEW ALL USERS
    public List<User> getAllUsers() {

        List<User> users = new ArrayList<>();

        String sql = "SELECT * FROM users";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {

                User user = new User();

                user.setUserId(rs.getInt("user_id"));
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                user.setRole(rs.getString("role"));
                user.setCustomerId(rs.getInt("customer_id"));

                users.add(user);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return users;
    }

    // CREATE USER
    public boolean createUser(User user)
    {

        String sql = "INSERT INTO users(username,password,role,customer_id) VALUES(?,?,?,?)";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, user.getUsername());
            ps.setString(2, PasswordUtil.hashPassword(user.getPassword()));
            ps.setString(3, user.getRole());
            ps.setInt(4, user.getCustomerId());

            return ps.executeUpdate() > 0;

        } catch (java.sql.SQLIntegrityConstraintViolationException e) {
            System.out.println("❌ Username already exists.");
        }
        catch (Exception e) {
            System.out.println("❌ Error creating user.");
        }

        return false;
    }

    public boolean deleteUser(int userId){

        String sql = "DELETE FROM users WHERE user_id=?";

        try(Connection con = DBConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(sql)){

            ps.setInt(1,userId);

            return ps.executeUpdate()>0;

        }catch(Exception e){
            e.printStackTrace();
        }

        return false;


    }
    public boolean updateUser(User user) {

        String sql = "UPDATE users SET username=?, password=?, role=?, customer_id=? WHERE user_id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, user.getUsername());
            ps.setString(2, PasswordUtil.hashPassword(user.getPassword()));
            ps.setString(3, user.getRole());
            ps.setInt(4, user.getCustomerId());
            ps.setInt(5, user.getUserId());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    public User getUserById(int userId) {

        String sql = "SELECT * FROM users WHERE user_id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, userId);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                User user = new User();

                user.setUserId(rs.getInt("user_id"));
                user.setUsername(rs.getString("username"));
                user.setPassword(rs.getString("password"));
                user.setRole(rs.getString("role"));
                user.setCustomerId(rs.getInt("customer_id"));

                return user;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public boolean changePassword(int userId, String newPassword) {

        String sql = "UPDATE users SET password=? WHERE user_id=?";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, PasswordUtil.hashPassword(newPassword));
            ps.setInt(2, userId);

            return ps.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
}