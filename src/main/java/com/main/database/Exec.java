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

    public Exec(ResultSet set) {
        this.set = set;
    }
    
    public ResultSet afterExecution() {
        return set;
    }
    
}
