/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.utils;

import com.main.entities.User;
import java.math.BigInteger;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author AliekhandroDelRio
 */
public class Utils {

    public static User fillUserFromResultSet(ResultSet result) {
        User user = new User();
        try {
            user.setId(result.getInt(1)); //id
            user.setLogin(result.getString(2)); //login
            user.setPassword(result.getString(3)); //password    
            user.setFirstName(result.getString(4)); // firstName
            user.setLastName(result.getString(5)); // lastName
            user.setEmail(result.getString(6)); //email
            user.setPhoneNumber(result.getString(7));//phoneNumber
            user.setAdress(result.getString(9));// adress 
            user.setRegistaration(result.getString(8));// registration 
            user.setRoleId(result.getInt(10)); // role_id
            user.setFatherName(result.getString(11)); // fatherName
            user.setPassportNumber(result.getString(12));// passportNumber 
            user.setHomePhoneNumber(result.getString(13));// homePhoneNumber 
            user.setIdentationCode(result.getInt(14)); // identationCode
            user.setWorkPhoneNumber(result.getString(15)); //workPhoneNumber
            user.setDepartment(result.getString(16));//department 
            user.setDirector(result.getString(17));//director 
            user.setSchludeOfWork(result.getString(18));//schludeOfWork 
            user.setStartDate(result.getString(19)); //startDate
            user.setDateOfFormalArrangment(result.getString(20));//dateOfFormalArrangment
            user.setBirthDate(result.getString(21));
            user.setImagePath(result.getString(22));
        } catch (SQLException ex) {
            Logger.getLogger(Constants.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            return user;
        }
    }
}
