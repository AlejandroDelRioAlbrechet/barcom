/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.services;

import com.main.database.MysqlDataBase;
import com.main.entities.User;
import com.main.utils.Utils;
import java.io.File;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.CookieParam;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author AliekhandroDelRio
 */
@Path("/login")
public class LoginManipulation {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(com.main.entities.Login login) throws IOException {
        if (testCreadentials(login.getLogin(), login.getPassword())) {
            User _user = getUser(login.getLogin());
            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(new File("c:\\user.json"), _user);

            String cookieString = new StringBuilder("login:")
                    .append(_user.getLogin())
                    .append("|password:")
                    .append(Base64.encodeBase64String(StringUtils.getBytesUtf8(_user.getPassword())))
                    .toString();
            NewCookie cookie = new NewCookie("barcom", cookieString);

            return Response.status(201).entity(mapper.writeValueAsString(_user)).cookie(cookie).build();
        } else {
            return Response.status(401).entity("Not found").build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public User getUserO(@CookieParam("barcom") String cookie) {
        if (cookie == null || cookie.isEmpty()) {
            return null;
        }

        String[] strings = cookie.split("\\|");
        String login = strings[ 0].substring(strings[ 0].indexOf(":") + 1, strings[ 0].length());
        String password = StringUtils.newStringUtf8(Base64.decodeBase64(strings[ 1].substring(strings[ 1].indexOf(":") + 1, strings[ 1].length())));

        User user = getUser(login);

        return user != null && user.getPassword().equals(password) ? user : null;
    }

    @DELETE
    public Response logout() {
        NewCookie cookie = new NewCookie("barcom", "");
        return Response.status(201).cookie(cookie).build();
    }

    private User getUser(String login) {
        try {
            String query = "SELECT barcom_users.id, barcom_users.login, barcom_users.password, barcom_users.first_name, \n"
                    + "barcom_users.last_name, barcom_users.email, barcom_users.phone_number, barcom_users.registration,\n"
                    + "barcom_users.adress, barcom_users.module_access, barcom_users.father_name, barcom_users.passport_number, \n"
                    + "barcom_users.home_phone_number, barcom_users.indentation_code, barcom_users.work_phone_number, \n"
                    + "departments.name, barcom_users.director, barcom_users.schlude_of_work, barcom_users.start_date_of_work,\n"
                    + "barcom_users.date_of_formal_arrangement, barcom_users.birth_date, barcom_users.image_path, barcom_users.department_id \n"
                    + "FROM barcom_users INNER JOIN departments on barcom_users.department_id = departments.id WHERE `login`='" + login + "'  LIMIT 1;";
            ResultSet result = MysqlDataBase.getInstance().select(query).afterExecution();
            User user = null;
            if (result.next()) {
                user = Utils.fillUserFromResultSet(result);
            }
            return user;
        } catch (SQLException ex) {
            Logger.getLogger(com.main.entities.Login.class.getName()).log(Level.SEVERE, null, ex);
        }

        return null;
    }

    private boolean testCreadentials(String email, String password) {
        User user = getUser(email);
        return user != null ? user.getPassword().equals(password) : false;
    }
    
}
