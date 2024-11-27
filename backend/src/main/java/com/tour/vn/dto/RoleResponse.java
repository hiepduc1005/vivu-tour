package com.tour.vn.dto;

import com.tour.vn.entity.Role;

public class RoleResponse {
	private Long id;
	private String name;
	
	
	
	public RoleResponse(Role role) {
		this.id = role.getId();
		this.name = role.getName();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
