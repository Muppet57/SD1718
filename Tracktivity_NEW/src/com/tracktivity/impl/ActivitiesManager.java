package com.tracktivity.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.tracktivity.data.ActivityData;
import com.tracktivity.model.Activity;




public class ActivitiesManager implements IActivity{
	
	static List<Activity> activities = new ArrayList<Activity>();
	static ActivitiesManager am = null;

	public static ActivitiesManager getInstance() {
		if(am == null) {
			am = new ActivitiesManager();	
		}
		return am;
	}

	//GET todas as Atividades
	public List<Activity> getActivities() {
		ActivityData activitydata = ActivityData.getInstance();				
		return activitydata.getData();
	}

	//GET todas Atividades de uma intensidade
	public List<Activity> getActivities(String intensity) {
		ActivityData activitydata = ActivityData.getInstance();				
		return activitydata.getData(intensity);
	}	
	//GET Atividade por nome
	public Activity getActivity(String name) {
		for (Iterator<Activity> iterator = activities.iterator(); iterator.hasNext();) {
			Activity activity = (Activity) iterator.next();
			if(activity.getName().equals(name))
				return activity;
		}
		return null;
	}
	//POST Adicionar Atividade
	public void createActivity(String name,String intensity, String description, float met,int calories, String link) {		
		ActivityData activitydata = ActivityData.getInstance();
		activitydata.insertData(new Activity(name, intensity, description, met,calories,link));		
	}
	//Remover Atividade
	public void removeActivity(String name) {
		ActivityData activitydata = ActivityData.getInstance();				
		activitydata.removeData(name);
	}
	
}
