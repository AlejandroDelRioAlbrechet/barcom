/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.entities;


/**
 *
 * @author AliekhandroDelRio
 */
public class Department {
    
    private int id;
    private String name;
    private String director;
    private String  contactInfo;

    public Department(int id, String name, String director, String contactInfo) {
        this.id = id;
        this.name = name;
        this.director = director;
        this.contactInfo = contactInfo;
    }

    public Department() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    @Override
    public String toString() {
        return "Department{" + "id=" + id + ", name=" + name + ", director=" + director + ", contactInfo=" + contactInfo + '}';
    }
    
}
