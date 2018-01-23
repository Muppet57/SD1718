package com.tracktivity.impl;

import java.security.Key;
import java.util.ArrayList;
import java.util.List;


import com.tracktivity.data.UserData;
import com.tracktivity.model.User;

import io.jsonwebtoken.impl.crypto.MacProvider;

public class UsersManager implements IUser{
	
	static List<User> users = new ArrayList<User>();
	

	static UsersManager um = null;
	
	static Key key;

	public static UsersManager getInstance() {
		if(um == null) {
			um = new UsersManager();	
			key = MacProvider.generateKey();

		}
		return um;
	}
	
	public Key getKey() {
		return key;
	}
	

	//GET todos os Users
	public List<User> getUsers() {
		UserData userdata = UserData.getInstance();				
		return userdata.getData();
	}

	//GET todos os users com um determinado parametro Exemplo : Age,Height,Weight,Sex ou u utilizador pois o username é unico
	public List<User> getUsers(String param) {
		UserData userdata = UserData.getInstance();				
		return userdata.getData(param);
	}	

	//DELETE Remover Utilizador
	public void removeUser(String username) {
		UserData userdata = UserData.getInstance();				
		userdata.removeData(username);
	}

	//POST Adicionar Utilizador
	public void createUser(String name, String surname, String gender, int age, int height, float weight,
			String username, String password, String email, String link) {
		UserData userdata = UserData.getInstance();
		userdata.insertData(new User(name,surname,gender,age,height,weight,username,password,email,link));		
	}
	
	public void updateUser(String oldname, String name, String surname, String gender, int age, int height, float weight,
			String username, String password, String email, String link) {
		UserData userdata = UserData.getInstance();
		userdata.updateData(new User(name,surname,gender,age,height,weight,oldname,password,email,link),new User(name,surname,gender,age,height,weight,username,password,email,link));		
	}
	
}
