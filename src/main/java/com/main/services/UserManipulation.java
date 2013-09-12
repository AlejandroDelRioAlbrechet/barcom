/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.services;

import com.main.database.MysqlDataBase;
import com.main.entities.User;
import com.main.utils.Utils;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author AliekhandroDelRio
 */
@Path("/user")
public class UserManipulation {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User createUser(User newUser) {
        String query = "INSERT INTO `barcom_users` (`login`, `password`, `first_name`, "
                + "`last_name`, `email`, `phone_number`, `registration`, `adress`,"
                + "`role_id`, `father_name`, `passport_number`, `home_phone_number`, "
                + "`indentation_code`, `work_phone_number`, `department`, `director`, "
                + "`schlude_of_work`, `start_date_of_work`, "
                + "`date_of_formal_arrangement`, `birth_date`) "
                + "VALUES ('" + newUser.getLogin() 
                + "', '" + newUser.getPassword() 
                + "', '" + newUser.getFirstName() 
                + "', '" + newUser.getLastName() 
                + "', " + "'" + newUser.getEmail() 
                + "', '" + newUser.getPhoneNumber() 
                + "', '" + newUser.getRegistaration() 
                + "', '" + newUser.getAdress() 
                + "', 1, '" + newUser.getFatherName() 
                + "', '" + newUser.getPassportNumber() 
                + "', '" + newUser.getHomePhoneNumber() 
                + "', " + newUser.getIdentationCode() 
                + ", '" + newUser.getWorkPhoneNumber() 
                + "', '" + newUser.getDepartment() 
                + "', '" + newUser.getDirector() 
                + "', " + "'" + newUser.getSchludeOfWork() 
                + "', '" + newUser.getStartDate() 
                + "', '" + newUser.getDateOfFormalArrangment() 
                + "', '" + newUser.getBirthDate() + "');";

        MysqlDataBase.getInstance().insert(query);
        return newUser;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAllUsers() {
        ResultSet result = MysqlDataBase.getInstance().select("SELECT * FROM barcom_users;").afterExecution();
        List<User> users = new ArrayList<User>();
        try {
            while (result.next()) {
                users.add(Utils.fillUserFromResultSet(result));
            }
        } catch (SQLException ex) {
            Logger.getLogger(UserManipulation.class.getName()).log(Level.SEVERE, null, ex);
        }
        return users;
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{userId}")
    public User updateUser(User updatedUser, @PathParam("userId") String userId) {
        if ( updatedUser != null ) 
        {
            String query = "UPDATE `barcom_users` SET "
                + "`login`='" + updatedUser.getLogin() 
                + "', `password`='" + updatedUser.getPassword() 
                + "', `first_name`='" + updatedUser.getFirstName() 
                + "', `last_name`='" + updatedUser.getLastName() 
                + "', `email`='" + updatedUser.getEmail() 
                + "', `phone_number`='" + updatedUser.getPhoneNumber() 
                + "', `registration`='" + updatedUser.getRegistaration() 
                + "', `adress`='" + updatedUser.getAdress() 
                + "', `father_name`='" + updatedUser.getFatherName() 
                + "', `passport_number`='" + updatedUser.getPassportNumber() 
                + "', `home_phone_number`='" + updatedUser.getHomePhoneNumber() 
                + "', `indentation_code`=" + updatedUser.getIdentationCode() 
                + ", `work_phone_number`='" + updatedUser.getWorkPhoneNumber() 
                + "', `department`='" + updatedUser.getDepartment() 
                + "', `director`='" + updatedUser.getDirector() 
                + "', `schlude_of_work`='" + updatedUser.getSchludeOfWork() 
                + "', `start_date_of_work`='" + updatedUser.getStartDate() 
                + "', `date_of_formal_arrangement`='" + updatedUser.getDateOfFormalArrangment() 
                + "', `birth_date`='" + updatedUser.getBirthDate() + "'"
                + " WHERE  `id`=" + userId + " LIMIT 1;";
            MysqlDataBase.getInstance().update(query);
        }
        return updatedUser;
    }

    @DELETE
    @Path("/{userId}")
    public Response removeUser(@PathParam("userId") String userId) {
        String query = "DELETE FROM `barcom_users` WHERE  `id`=" + userId + " LIMIT 1;";
        MysqlDataBase.getInstance().remove(query);
        return Response.status(200).entity("removed").build();
    }
}
