package com.migibert.kheo.resources;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.jongo.MongoCollection;

import com.codahale.metrics.annotation.Timed;
import com.migibert.kheo.core.Server;
import com.migibert.kheo.service.ServerService;

@Path("servers")
@Produces(MediaType.APPLICATION_JSON)
public class ServerResource {

	private ServerService service;

	public ServerResource(MongoCollection collection) {
		this.service = new ServerService(collection);
	}

	@GET
	@Timed
	public Response getServers() {
		return Response.status(Status.OK).entity(service.readAll()).build();
	}

	@GET
	@Timed
	@Path("/{hostname}")
	public Response getServer(@PathParam("hostname") String hostname) {
		Server server = service.read(hostname);
		if (server == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		return Response.status(Status.OK).entity(server).build();
	}

	@POST
	@Timed
	public Response createServer(Server server) {
		service.create(server);
		return Response.status(Status.CREATED).build();
	}

	@PUT
	@Timed
	@Path("/{hostname}")
	public Response updateServer(@PathParam("hostname") String hostname, Server server) {
		if(!hostname.equals(server.getHostname())) {
			throw new BadRequestException("Hostnames does not match.");
		}
		service.update(server);
		return Response.status(Status.NO_CONTENT).build();
	}

	@DELETE
	@Timed
	@Path("/{hostname}")
	public Response deleteServer(@PathParam("hostname") String hostname) {
		service.delete(hostname);
		return Response.status(Status.NO_CONTENT).build();
	}

}
