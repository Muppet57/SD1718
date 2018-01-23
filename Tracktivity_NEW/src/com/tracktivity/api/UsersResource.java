package com.tracktivity.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
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
import com.tracktivity.impl.UsersManager;
import com.tracktivity.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Path("/users")

public class UsersResource {
	
	public boolean getAuth(String username, String password)
	{
		UserData userData = UserData.getInstance();
		List<User> users = userData.getData();
		for (User user:users) {
	
			if(user.getUsername().equalsIgnoreCase(username) &&
					user.getPassword().equals(password))
			{
				return true;
			}
		}
		return false;
	}
	
	// POST auth
		@Path("/auth")
		@POST	
		public Response auth(@FormParam("login") String login, @FormParam("pass") String pass) {
			
			if(getAuth(login,pass)) {
				UsersManager um = UsersManager.getInstance();	

				Map<String,Object> user = new HashMap<String,Object>();
				user.put("login", login);
				
				String newToken = Jwts.builder()				  
						  .setClaims(user)
						  .setIssuer("Tracktivity")			
						  .signWith(SignatureAlgorithm.HS256, um.getKey())				  
						  .compact();
				return Response.ok().entity(newToken).build();
			} else {
				return Response.serverError().status(401).type("text/plain").entity("Invalid User!").build();
			}
		}
	
	
	//GETS all users

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getUsers(@QueryParam("username") String username) {
		UsersManager um = UsersManager.getInstance();		
		if (username!=null) {
			return um.getUsers(username);
		} 
		return um.getUsers();
	}
	
	// GET a specific user by username
	@Path("/{username}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getUser(@PathParam("username") String username) {
		UsersManager um = UsersManager.getInstance();		
		return um.getUsers(username);
	}
	
	// DELETE a specific user
	@Path("/{username}")
	@DELETE	
	public Response removeUser(@PathParam("username") String username) {
		UsersManager um = UsersManager.getInstance();
		um.removeUser(username);
		
		return Response.ok().entity("User removed!").build();
	}
	
	@PUT
	@Path("/{oldname}")
	@Consumes("application/x-www-form-urlencoded")
	public Response updateUser(
			@PathParam("oldname") String oldname,
			@FormParam("name") String name,
			@FormParam("surname") String surname,
			@FormParam("gender") String gender,
			@FormParam("age") int age,
			@FormParam("height") int height,
			@FormParam("weight") float weight,
			@FormParam("username") String username,
			@FormParam("password") String password,
			@FormParam("email") String email,
			@FormParam("link") String link,
			@Context UriInfo uriInfo) {
		UsersManager um = UsersManager.getInstance();
		um.updateUser(oldname,name,surname,gender,age,height,weight,username,password,email,link);
		UriBuilder builder = uriInfo.getAbsolutePathBuilder();	
		builder.path(username);
		return Response.created(builder.build()).build();
	}
	
	//Post a new activity
	@POST
	@Consumes("application/x-www-form-urlencoded")
	public Response insertUser(
			@FormParam("name") String name,
			@FormParam("surname") String surname,
			@FormParam("gender") String gender,
			@FormParam("age") int age,
			@FormParam("height") int height,
			@FormParam("weight") float weight,
			@FormParam("username") String username,
			@FormParam("password") String password,
			@FormParam("email") String email,
			@FormParam("link") String link,
			@Context UriInfo uriInfo) {
		
		
		UsersManager um = UsersManager.getInstance();
		um.createUser(name,surname,gender,age,height,weight,username,password,email,link);
		UriBuilder builder = uriInfo.getAbsolutePathBuilder();	
		builder.path(username);
		return Response.created(builder.build()).build();
	}
}
