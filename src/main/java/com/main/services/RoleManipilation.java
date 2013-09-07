/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.services;

import com.main.database.MysqlDataBase;
import com.main.entities.Role;
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
@Path("/role")
public class RoleManipilation {
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Role addRole(Role newRole) {
        String query = "INSERT INTO `roles` (`role_name`, `module_access`) VALUES "
                + "('" +newRole.getRoleName() + "', '" 
                + newRole.getRoleModuleAccess() + "');";
        MysqlDataBase.getInstance().insert(query);
        
        return newRole;
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{roleid}")
    public Role updateRole(@PathParam("roleid") String roleId, Role updateRole) {
        String query = "UPDATE `roles` SET `role_name`='" + updateRole.getRoleName() + "', `module_access`='" + updateRole.getRoleModuleAccess() + "' WHERE  `id`=" + roleId + " LIMIT 1;";
        MysqlDataBase.getInstance().update(query);
        return updateRole;
    }
    
    @DELETE
    @Path("/{roleid}")
    public Response removeRole(@PathParam("roleid") String roleId ) {
        String query = "DELETE FROM `roles` WHERE  `id`=" + roleId + " LIMIT 1;";
        MysqlDataBase.getInstance().remove(query);
        return Response.status(200).entity("removed").build();
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Role> getRoles() {
        ResultSet result = MysqlDataBase.getInstance().select("SELECT * FROM roles;").afterExecution();
        List<Role> roles = new ArrayList<Role>();
        try {
            while( result.next() ) {
                roles.add(new Role(result.getInt(1), result.getString(2), result.getString(3)));
            }
        } catch (SQLException ex) {
            Logger.getLogger(RoleManipilation.class.getName()).log(Level.SEVERE, null, ex);
        }
        return roles;
    }
    
}
