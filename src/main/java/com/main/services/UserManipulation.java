/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.services;

import com.main.database.MysqlDataBase;
import com.main.entities.Login;
import com.main.entities.User;
import java.io.File;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.CookieParam;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.StringUtils;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.ObjectMapper;

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
        String query = "INSERT INTO `barcom_users` (`login`, `password`, `first_name`, `last_name`, `email`, `phone_number`, `adress`, `role_id`) VALUES "
                + "('" + newUser.getLogin() + "',"
                + " '" + newUser.getPassword() + "',"
                + " '" + newUser.getFirstName() + "',"
                + " '" + newUser.getLastName() + "',"
                + " '" + newUser.getEmail() + "',"
                + " '" + newUser.getPhoneNumber() + "',"
                + " '" + newUser.getAdress() + "',"
                + " " + newUser.getRoleId() + ");";

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
                users.add(new User(result.getInt(1),
                        result.getString(2),
                        result.getString(3),
                        result.getString(4),
                        result.getString(5),
                        result.getString(6),
                        result.getString(7),
                        result.getString(8),
                        result.getInt(9)));
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
            String query = "UPDATE `barcom_users` SET `login`='" + updatedUser.getLogin()
                    + "', `password`='" + updatedUser.getPassword()
                    + "', `first_name`='" + updatedUser.getFirstName()
                    + "', `last_name`='" + updatedUser.getLastName()
                    + "', `email`='" + updatedUser.getEmail()
                    + "', `phone_number`='" + updatedUser.getPhoneNumber()
                    + "', `adress`='" + updatedUser.getAdress()
                    + "', `role_id`=" + updatedUser.getRoleId()
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
