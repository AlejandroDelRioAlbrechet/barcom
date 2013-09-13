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
    
    @JsonProperty("registaration")
    private String registaration;
    
    @JsonProperty("roleId")
    private int roleId;
    
    @JsonProperty("fatherName")
    private String fatherName;
    
    @JsonProperty("passportNumber")
    private String passportNumber;
    
    @JsonProperty("homePhoneNumber")
    private String homePhoneNumber;
    
    @JsonProperty("identationCode")
    private int identationCode;
    
    @JsonProperty("workPhoneNumber")
    private String workPhoneNumber;
    
    @JsonProperty("department")
    private String department;
    
    @JsonProperty("director")
    private String director;
    
    @JsonProperty("schludeOfWork")
    private String schludeOfWork;
    
    @JsonProperty("startDate")
    private String startDate;
    
    @JsonProperty("dateOfFormalArrangment")
    private String dateOfFormalArrangment;
    
    @JsonProperty("birthDate")
    private String birthDate;

    @JsonProperty("birthDate")
    private String imagePath; 
    
    public User(int id, String login, String password, String firstName, String lastName, String email, String phoneNumber, String adress, String registaration, int roleId, String fatherName, String passportNumber, String homePhoneNumber, int identationCode, String workPhoneNumber, String department, String director, String schludeOfWork, String startDate, String dateOfFormalArrangment, String birthDate) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.adress = adress;
        this.registaration = registaration;
        this.roleId = roleId;
        this.fatherName = fatherName;
        this.passportNumber = passportNumber;
        this.homePhoneNumber = homePhoneNumber;
        this.identationCode = identationCode;
        this.workPhoneNumber = workPhoneNumber;
        this.department = department;
        this.director = director;
        this.schludeOfWork = schludeOfWork;
        this.startDate = startDate;
        this.dateOfFormalArrangment = dateOfFormalArrangment;
        this.birthDate = birthDate;
    }
    
    public User() {
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
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

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getPassportNumber() {
        return passportNumber;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public String getHomePhoneNumber() {
        return homePhoneNumber;
    }

    public void setHomePhoneNumber(String homePhoneNumber) {
        this.homePhoneNumber = homePhoneNumber;
    }

    public int getIdentationCode() {
        return identationCode;
    }

    public void setIdentationCode(int identationCode) {
        this.identationCode = identationCode;
    }

    public String getWorkPhoneNumber() {
        return workPhoneNumber;
    }

    public void setWorkPhoneNumber(String workPhoneNumber) {
        this.workPhoneNumber = workPhoneNumber;
    }

    public String getDepartment() {
        return department;
    }

    public String getRegistaration() {
        return registaration;
    }

    public void setRegistaration(String registaration) {
        this.registaration = registaration;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getSchludeOfWork() {
        return schludeOfWork;
    }

    public void setSchludeOfWork(String schludeOfWork) {
        this.schludeOfWork = schludeOfWork;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getDateOfFormalArrangment() {
        return dateOfFormalArrangment;
    }

    public void setDateOfFormalArrangment(String dateOfFormalArrangment) {
        this.dateOfFormalArrangment = dateOfFormalArrangment;
    }

    @Override
    public String toString() {
        return "User{" + "id=" + id + ", login=" + login + ", password=" + password + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", phoneNumber=" + phoneNumber + ", adress=" + adress + ", registaration=" + registaration + ", roleId=" + roleId + ", fatherName=" + fatherName + ", passportNumber=" + passportNumber + ", homePhoneNumber=" + homePhoneNumber + ", identationCode=" + identationCode + ", workPhoneNumber=" + workPhoneNumber + ", department=" + department + ", director=" + director + ", schludeOfWork=" + schludeOfWork + ", startDate=" + startDate + ", dateOfFormalArrangment=" + dateOfFormalArrangment + ", birthDate=" + birthDate + '}';
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + this.id;
        hash = 29 * hash + (this.login != null ? this.login.hashCode() : 0);
        hash = 29 * hash + (this.password != null ? this.password.hashCode() : 0);
        hash = 29 * hash + (this.firstName != null ? this.firstName.hashCode() : 0);
        hash = 29 * hash + (this.lastName != null ? this.lastName.hashCode() : 0);
        hash = 29 * hash + (this.email != null ? this.email.hashCode() : 0);
        hash = 29 * hash + (this.phoneNumber != null ? this.phoneNumber.hashCode() : 0);
        hash = 29 * hash + (this.adress != null ? this.adress.hashCode() : 0);
        hash = 29 * hash + (this.registaration != null ? this.registaration.hashCode() : 0);
        hash = 29 * hash + this.roleId;
        hash = 29 * hash + (this.fatherName != null ? this.fatherName.hashCode() : 0);
        hash = 29 * hash + (this.passportNumber != null ? this.passportNumber.hashCode() : 0);
        hash = 29 * hash + (this.homePhoneNumber != null ? this.homePhoneNumber.hashCode() : 0);
        hash = 29 * hash + this.identationCode;
        hash = 29 * hash + (this.workPhoneNumber != null ? this.workPhoneNumber.hashCode() : 0);
        hash = 29 * hash + (this.department != null ? this.department.hashCode() : 0);
        hash = 29 * hash + (this.director != null ? this.director.hashCode() : 0);
        hash = 29 * hash + (this.schludeOfWork != null ? this.schludeOfWork.hashCode() : 0);
        hash = 29 * hash + (this.startDate != null ? this.startDate.hashCode() : 0);
        hash = 29 * hash + (this.dateOfFormalArrangment != null ? this.dateOfFormalArrangment.hashCode() : 0);
        hash = 29 * hash + (this.birthDate != null ? this.birthDate.hashCode() : 0);
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
        if ((this.registaration == null) ? (other.registaration != null) : !this.registaration.equals(other.registaration)) {
            return false;
        }
        if (this.roleId != other.roleId) {
            return false;
        }
        if ((this.fatherName == null) ? (other.fatherName != null) : !this.fatherName.equals(other.fatherName)) {
            return false;
        }
        if ((this.passportNumber == null) ? (other.passportNumber != null) : !this.passportNumber.equals(other.passportNumber)) {
            return false;
        }
        if ((this.homePhoneNumber == null) ? (other.homePhoneNumber != null) : !this.homePhoneNumber.equals(other.homePhoneNumber)) {
            return false;
        }
        if (this.identationCode != other.identationCode) {
            return false;
        }
        if ((this.workPhoneNumber == null) ? (other.workPhoneNumber != null) : !this.workPhoneNumber.equals(other.workPhoneNumber)) {
            return false;
        }
        if ((this.department == null) ? (other.department != null) : !this.department.equals(other.department)) {
            return false;
        }
        if ((this.director == null) ? (other.director != null) : !this.director.equals(other.director)) {
            return false;
        }
        if ((this.schludeOfWork == null) ? (other.schludeOfWork != null) : !this.schludeOfWork.equals(other.schludeOfWork)) {
            return false;
        }
        if (this.startDate != other.startDate && (this.startDate == null || !this.startDate.equals(other.startDate))) {
            return false;
        }
        if (this.dateOfFormalArrangment != other.dateOfFormalArrangment && (this.dateOfFormalArrangment == null || !this.dateOfFormalArrangment.equals(other.dateOfFormalArrangment))) {
            return false;
        }
        if (this.birthDate != other.birthDate && (this.birthDate == null || !this.birthDate.equals(other.birthDate))) {
            return false;
        }
        return true;
    }

}
