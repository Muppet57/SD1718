package com.tracktivity.impl;

import java.util.List;

import com.tracktivity.model.Activity;

public interface IActivity {
	public List<Activity> getActivities();
	public List<Activity> getActivities(String intensity);
	public Activity getActivity(String name);
	public void createActivity(String name,String intensity, String description, float met,int calories, String link);
	public void removeActivity(String name);
}
