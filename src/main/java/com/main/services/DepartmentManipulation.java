/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.services;

import com.main.database.MysqlDataBase;
import com.main.entities.Department;
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
@Path("/department")
public class DepartmentManipulation {
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Department addDepartment(Department newDepartment) {
        String query = "INSERT INTO `departments` (`name`, `director`, `contact_info`) VALUES ( '" 
                + newDepartment.getName() + "', '" 
                + newDepartment.getDirector() + "', '" 
                + newDepartment.getContactInfo() + "');";
        MysqlDataBase.getInstance().insert(query);
        
        return newDepartment;
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{departmentId}")
    public Department updateRole(@PathParam("departmentId") String departmentId, Department updateDepartment) {
        String query = "UPDATE `departments` SET `name`='" + updateDepartment.getName() 
                + "', `director`='" + updateDepartment.getDirector() 
                + "', `contact_info`='" + updateDepartment.getContactInfo() 
                + "' WHERE  `id`=" + departmentId + " LIMIT 1;";
        MysqlDataBase.getInstance().update(query);
        return updateDepartment;
    }
    
    @DELETE
    @Path("/{{departmentId}}")
    public Response removeRole(@PathParam("{departmentId}") String departmentId ) {
        String query = "DELETE FROM `departments` WHERE  `id`=" + departmentId + " LIMIT 1;";
        MysqlDataBase.getInstance().remove(query);
        return Response.status(200).entity("removed").build();
    }
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Department> getDepartments() {
        ResultSet result = MysqlDataBase.getInstance().select("SELECT * FROM departments;").afterExecution();
        List<Department> departments = new ArrayList<Department>();
        try {
            while( result.next() ) {
                departments.add(new Department(result.getInt(1), result.getString(2), result.getString(3), result.getString(4)));
            }
        } catch (SQLException ex) {
            Logger.getLogger(DepartmentManipulation.class.getName()).log(Level.SEVERE, null, ex);
        }
        return departments;
    }
}
