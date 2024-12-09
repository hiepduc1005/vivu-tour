package com.tour.vn.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tour.vn.dto.RoleResponse;
import com.tour.vn.entity.Role;
import com.tour.vn.service.RoleService;

@RestController
@RequestMapping("api/v1/role")
public class RoleController {

	@Autowired
	private RoleService roleService;
	
	@GetMapping
	public ResponseEntity<List<RoleResponse>> getAllRole(){
		List<Role> roles = roleService.getAllRoles();
		List<RoleResponse> roleResponses = roles.stream()
			.map(role -> new RoleResponse(role))
			.collect(Collectors.toList());
		
		return ResponseEntity.ok(roleResponses);
	}
}
