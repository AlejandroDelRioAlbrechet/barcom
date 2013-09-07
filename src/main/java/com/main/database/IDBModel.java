/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.database;

/**
 *
 * @author AliekhandroDelRio
 */
public interface IDBModel {
    
    Executable select(String query);
    
    Executable insert(String query);
    
    Executable update(String query);
    
    Executable remove(String query);
    
}
