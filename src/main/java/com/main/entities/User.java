/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.entities;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 *
 * @author AliekhandroDelRio
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

    @JsonProperty("id")
    private int id;
    
    @JsonProperty("login")
    private String login;
    
    @JsonProperty("password")
    private String password;
    
    @JsonProperty("firstName")
    private String firstName;
    
    @JsonProperty("lastName")
    private String lastName;
    
    @JsonProperty("email")
    private String email;
    
    @JsonProperty("phoneNumber")
    private String phoneNumber;
    
    @JsonProperty("adress")
    private String adress;
    
    @JsonProperty("roleId")
    private int roleId;

    public User(int id, String login, String password, String firstName, String lastName, String email, String phoneNumber, String adress, int role_id) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.adress = adress;
        this.roleId = role_id;
    }

    public User() {
    }

    public int getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getAdress() {
        return adress;
    }

    public int getRoleId() {
        return roleId;
    }

    @Override
    public String toString() {
        return "User{" + "id=" + id + ", login=" + login + ", password=" + password + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", phoneNumber=" + phoneNumber + ", adress=" + adress + ", roleId=" + roleId + '}';
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 53 * hash + this.id;
        hash = 53 * hash + (this.login != null ? this.login.hashCode() : 0);
        hash = 53 * hash + (this.password != null ? this.password.hashCode() : 0);
        hash = 53 * hash + (this.firstName != null ? this.firstName.hashCode() : 0);
        hash = 53 * hash + (this.lastName != null ? this.lastName.hashCode() : 0);
        hash = 53 * hash + (this.email != null ? this.email.hashCode() : 0);
        hash = 53 * hash + (this.phoneNumber != null ? this.phoneNumber.hashCode() : 0);
        hash = 53 * hash + (this.adress != null ? this.adress.hashCode() : 0);
        hash = 53 * hash + this.roleId;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final User other = (User) obj;
        if (this.id != other.id) {
            return false;
        }
        if ((this.login == null) ? (other.login != null) : !this.login.equals(other.login)) {
            return false;
        }
        if ((this.password == null) ? (other.password != null) : !this.password.equals(other.password)) {
            return false;
        }
        if ((this.firstName == null) ? (other.firstName != null) : !this.firstName.equals(other.firstName)) {
            return false;
        }
        if ((this.lastName == null) ? (other.lastName != null) : !this.lastName.equals(other.lastName)) {
            return false;
        }
        if ((this.email == null) ? (other.email != null) : !this.email.equals(other.email)) {
            return false;
        }
        if ((this.phoneNumber == null) ? (other.phoneNumber != null) : !this.phoneNumber.equals(other.phoneNumber)) {
            return false;
        }
        if ((this.adress == null) ? (other.adress != null) : !this.adress.equals(other.adress)) {
            return false;
        }
        if (this.roleId != other.roleId) {
            return false;
        }
        return true;
    }
}
