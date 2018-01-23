package com.tracktivity.api;

import java.util.List;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import com.tracktivity.data.UserData;
import com.tracktivity.impl.ActivitiesManager;
import com.tracktivity.impl.UsersManager;
import com.tracktivity.model.Activity;
import com.tracktivity.model.User;

@Path("/activities")

public class ActivitiesResource {

	//GETS all activities
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Activity> getActivities(@QueryParam("intensity") String intensity) {
		ActivitiesManager am = ActivitiesManager.getInstance();		
		if (intensity!=null) {
			return am.getActivities(intensity);
		} 
		return am.getActivities();
	}
	
	@GET
	@Path("/xml")
	@Produces(MediaType.APPLICATION_XML)
	public List<Activity> getXMLActivities(@QueryParam("intensity") String intensity) {
		ActivitiesManager am = ActivitiesManager.getInstance();		
		if (intensity!=null) {
			return am.getActivities(intensity);
		} 
		return am.getActivities();
	}
	
	// GET a specific activity
	@Path("/{name}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Activity getActivity(@PathParam("name") String name) {
		
		ActivitiesManager am = ActivitiesManager.getInstance();		
		return am.getActivity(name);
	}
	
	// DELETE a specific activity
	@Path("/{name}")
	@DELETE	
	public Response removeActivity(@PathParam("name") String name,@FormParam("token") String token,@Context UriInfo uriInfo) {
		ActivitiesManager am = ActivitiesManager.getInstance();
		UsersManager um = UsersManager.getInstance();
		
		try {
			Jwts.parser().setSigningKey(um.getKey()).parseClaimsJws(token);
			am.removeActivity(name);
			return Response.ok().entity("Activity removed!").build();

		}
		catch(SignatureException e) {
			return Response.serverError().status(401).type("text/plain").entity("Invalid token!").build();
		}

		
	}
	
	public boolean getLoggedUser(String username)
	{
		UserData userData = UserData.getInstance();
		List<User> users = userData.getData();
		for (User user:users) {
	
			if(user.getUsername().equalsIgnoreCase(username))
			{
				return true;
			}
		}
		return false;
	}
	
	//Post a new activity
	@POST
	@Consumes("application/x-www-form-urlencoded")
	public Response insertActivity(
			@FormParam("name") String name,
			@FormParam("intensity") String intensity, 
			@FormParam("description") String description,
			@FormParam("met") float met,
			@FormParam("calories") int calories,
			@FormParam("link") String link,
			@FormParam("token") String token,
			@Context UriInfo uriInfo) {
		
		UsersManager um = UsersManager.getInstance();
		ActivitiesManager am = ActivitiesManager.getInstance();
		try {
			Jwts.parser().setSigningKey(um.getKey()).parseClaimsJws(token);
							am.createActivity(name, intensity,description,met,calories, link);
							UriBuilder builder = uriInfo.getAbsolutePathBuilder();	
							builder.path(name);
							return Response.created(builder.build()).build();
		}
		catch(SignatureException e){
			return Response.serverError().status(401).type("text/plain").entity("Invalid token!").build();
		}

		
		
	}
}
