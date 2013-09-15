/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.database;

import java.sql.ResultSet;

/**
 *
 * @author AliekhandroDelRio
 */
public class Exec implements Executable {
    
    private ResultSet set;
    private int id;
    
    public Exec(ResultSet set) {
        this.set = set;
    }

    public Exec(int id) {
        this.id = id;
    }
    
    @Override
    public int afterInsert() {
        return this.id;
    }
     
    @Override
    public ResultSet afterExecution() {
        return set;
    }
    
}
