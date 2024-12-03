package com.tour.vn.service.convert;

import java.util.Collections;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tour.vn.dto.UserCreate;
import com.tour.vn.dto.UserUpdate;
import com.tour.vn.entity.User;
import com.tour.vn.service.RoleService;

@Service
public class UserConvert {
	
	@Autowired
	public RoleService roleService;

    // Chuyển từ UserCreate sang User Entity
    public User convertToUserCreate(UserCreate userCreate) {
        User user = new User();
        user.setName(userCreate.getName());
        user.setEmail(userCreate.getEmail());
        user.setPassword(userCreate.getPassword());
        return user;
    }

   

    // Chuyển UserUpdate DTO sang User Entity
    public User convertToUserUpdate(User existUser, UserUpdate userUpdate) {
    	existUser.setName(userUpdate.getName());
    	existUser.setEmail(userUpdate.getEmail());
    	existUser.setPhone(userUpdate.getPhone());
    	if (userUpdate.getRoleIds() != null) {
        	existUser.setRoles(userUpdate.getRoleIds().stream().map(roleId ->  roleService.getRoleById(roleId)).collect(Collectors.toList()));

    	}
        
    	return existUser;
    }
    


   
}
