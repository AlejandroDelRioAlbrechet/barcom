/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author AliekhandroDelRio
 */
public class MysqlDataBase implements IDBModel {

    private static MysqlDataBase instance = null;

    private MysqlDataBase() {
    }

    public static MysqlDataBase getInstance() {
        if (instance == null) {
            instance = new MysqlDataBase();
        }
        return instance;
    }
    
    private Connection createConnection() {
        try {
            Properties prop = new Properties();
            prop.setProperty("user", "root");
            prop.setProperty("password", "");
            prop.put("useUnicode", "false");
            prop.put("characterEncoding", "UTF-8");
            Class.forName("com.mysql.jdbc.Driver").newInstance();
            Connection mySqlConnection = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/barcom", prop);
            return mySqlConnection;
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(MysqlDataBase.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            Logger.getLogger(MysqlDataBase.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(MysqlDataBase.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(MysqlDataBase.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    @Override
    public Executable select(String query) {
        try {
            ResultSet rs = createConnection().createStatement().executeQuery(query);
            return new Exec(rs);
        } catch (Exception e) {
            Logger.getLogger(MysqlDataBase.class.getName()).log(Level.SEVERE, null, e);
            return null;
        } 
    }

    @Override
    public Executable insert(String query) {
        try {
            ResultSet rs = createConnection().createStatement().executeQuery(query);
            return new Exec(rs);
        } catch (SQLException ex) {
            Logger.getLogger(MysqlDataBase.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    @Override
    public Executable update(String query) {
        try {
            ResultSet rs = createConnection().createStatement().executeQuery(query);
            return new Exec(rs);
        } catch (SQLException ex) {
            Logger.getLogger(MysqlDataBase.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    @Override
    public Executable remove(String query) {
        try {
            ResultSet rs = createConnection().createStatement().executeQuery(query);
            return new Exec(rs);
        } catch (SQLException ex) {
            Logger.getLogger(MysqlDataBase.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
}
