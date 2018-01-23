package com.tracktivity.data;

import java.util.ArrayList;
import java.util.List;

import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.Document;
import com.mongodb.MongoCredential;
import com.mongodb.client.MongoCursor;

import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.tracktivity.model.Activity;
import static com.mongodb.client.model.Filters.*;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

public class ActivityData {
	
	static ActivityData ad = null;
	static MongoCollection<Activity> colActivity;
	
	public static ActivityData getInstance() {
		if(ad == null) {
			ad = new ActivityData();			
			
			CodecRegistry pojoCodecRegistry = fromRegistries(MongoClient.getDefaultCodecRegistry(), fromProviders(PojoCodecProvider.builder().automatic(true).build()));
			MongoClient mongoClient = new MongoClient("localhost", MongoClientOptions.builder().codecRegistry(pojoCodecRegistry).build());
			MongoDatabase dbActivity = mongoClient.getDatabase("Tracktivity");
			colActivity = dbActivity.getCollection("Activities", Activity.class);
		}
		return ad;
	}
	
	
	public void insertData(Activity activity) {
		if(colActivity.find(eq("name", activity.getName())).first() == null) {
			
			colActivity.insertOne(activity);
		}
	}	
	
	public List<Activity> getData() {
		List<Activity> activities = new ArrayList<Activity>();
		
		Block<Activity> block = new Block<Activity>() {
			@Override
		    public void apply(final Activity activity) {
		    	activities.add(activity);
		    }
		};
		colActivity.find().forEach(block);
		
		
		return activities;
	}
	
	public List<Activity> getData(String intensity) {		
		final List<Activity> activities = new ArrayList<Activity>();
		Block<Activity> printBlock = new Block<Activity>() {
		    public void apply(final Activity activity) {
		    	activities.add(activity);
		    }
		};
		colActivity.find(eq("intensity",intensity)).forEach(printBlock);;		
		return activities;
	}
	
	public void removeData(String name) {
		colActivity.deleteOne(eq("name", name));		
	}
	 
}
