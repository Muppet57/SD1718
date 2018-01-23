package com.tracktivity.model;

public class User {
	
	private String name;
	private String surname;
	private String gender;
	private int age;
	private int height;
	private float weight;
	private String username;
	private String password;
	private String email;
	private String link;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public int getHeight() {
		return height;
	}
	public void setHeight(int height) {
		this.height = height;
	}
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public User() {
		super();
	}
	public User(String name, String surname, String gender, int age, int height, float weight, String username,
			String password, String email, String link) {
		super();
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.age = age;
		this.height = height;
		this.weight = weight;
		this.username = username;
		this.password = password;
		this.email = email;
		this.link = link;
	}
	
	
}
