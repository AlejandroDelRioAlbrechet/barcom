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
        String[] params = new String[]{
            newUser.getLogin(),
            newUser.getPassword(),
            newUser.getFirstName(),
            newUser.getLastName(),
            newUser.getEmail(),
            newUser.getPhoneNumber(),
            newUser.getRegistaration(),
            newUser.getAdress(),
            "wery",
            newUser.getFatherName(),
            newUser.getPassportNumber(),
            newUser.getHomePhoneNumber(),
            "" + newUser.getIdentationCode(),
            newUser.getWorkPhoneNumber(),
            "" + newUser.getDepartmentId(),
            newUser.getDirector(),
            newUser.getSchludeOfWork(),
            newUser.getStartDate(),
            newUser.getDateOfFormalArrangment(),
            newUser.getBirthDate()
        };
        String query = "INSERT INTO barcom_users (login, password, first_name, "
                + "last_name, email, phone_number, registration, adress, "
                + "module_access, father_name, passport_number, home_phone_number, "
                + "indentation_code, work_phone_number, department_id, director, "
                + "schlude_of_work, start_date_of_work, "
                + "date_of_formal_arrangement, birth_date) "
                + "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?);";

        newUser.setId(MysqlDataBase.getInstance().insert(query, params).afterInsert());
        return newUser;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAllUsers() {
        ResultSet result = MysqlDataBase.getInstance().select("SELECT barcom_users.id, barcom_users.login, barcom_users.password, barcom_users.first_name, \n"
                + "barcom_users.last_name, barcom_users.email, barcom_users.phone_number, barcom_users.registration,\n"
                + "barcom_users.adress, barcom_users.module_access, barcom_users.father_name, barcom_users.passport_number, \n"
                + "barcom_users.home_phone_number, barcom_users.indentation_code, barcom_users.work_phone_number, \n"
                + "departments.name, barcom_users.director, barcom_users.schlude_of_work, barcom_users.start_date_of_work,\n"
                + "barcom_users.date_of_formal_arrangement, barcom_users.birth_date, barcom_users.image_path, barcom_users.department_id \n"
                + "FROM barcom_users INNER JOIN departments on barcom_users.department_id = departments.id;").afterExecution();
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
        if (updatedUser != null) {
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
                    + "', `department_id`='" + updatedUser.getDepartmentId()
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
