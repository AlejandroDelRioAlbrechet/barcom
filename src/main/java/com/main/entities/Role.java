/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.entities;

/**
 *
 * @author AliekhandroDelRio
 */
public class Role {
    
    private int id;
    private String roleName;
    private String roleModuleAccess;
    
    public Role(int id, String roleName, String roleModuleAccess) {
        this.id = id;
        this.roleName = roleName;
        this.roleModuleAccess = roleModuleAccess;
    }

    public Role() {
    }

    public String getRoleModuleAccess() {
        return roleModuleAccess;
    }

    public void setRoleModuleAccess(String roleModuleAccess) {
        this.roleModuleAccess = roleModuleAccess;
    }

    public int getId() {
        return id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public String toString() {
        return "Role{" + "id=" + id + ", roleName=" + roleName + ", roleModuleAccess=" + roleModuleAccess + '}';
    }
    
}
