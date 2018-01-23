package com.tracktivity.model;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="activity")
public class Activity {
	
	private String name;
	private String intensity;
	private String description;
	private float met;
	private int calories;
	private String link;
	
	
	
	
	public Activity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Activity(String name, String intensity, String description, float met, int calories, String link) {
		super();
		this.name = name;
		this.intensity = intensity;
		this.description = description;
		this.met = met;
		this.calories = calories;
		this.link = link;
	}
	@XmlElement
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	@XmlAttribute
	public String getIntensity() {
		return intensity;
	}
	public void setIntensity(String intensity) {
		this.intensity = intensity;
	}
	@XmlElement
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@XmlElement
	public float getMet() {
		return met;
	}
	
	public void setMet(float met) {
		this.met = met;
	}
	@XmlElement
	public int getCalories() {
		return calories;
	}
	public void setCalories(int calories) {
		this.calories = calories;
	}
	@XmlAttribute
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
}
