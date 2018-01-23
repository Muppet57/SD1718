package com.tracktivity.impl;

import java.util.List;

import com.tracktivity.model.User;

public interface IUser {
	public List<User> getUsers();
	public List<User> getUsers(String param);
	public void updateUser(String oldname,String name,String surname,String gender,int age,int height,float weight,String username,String password,String email,String link);

	public void createUser(String name,String surname,String gender,int age,int height,float weight,String username,String password,String email,String link);
	public void removeUser(String username);
}
