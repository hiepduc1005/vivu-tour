package com.tour.vn.security;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tour.vn.entity.User;
import com.tour.vn.service.UserService;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userService.getUserByEmail(username); 
		 if (user == null) {
	            throw new UsernameNotFoundException("User not found with username: " + username);
	     }
		
		 
		return new org.springframework.security.core.userdetails.User(
					user.getEmail(),
					user.getPassword(),
					getAuthorities(user)
				);
	}
	
	 private List<SimpleGrantedAuthority> getAuthorities(User user) {
	        return user.getRoles()
	                .stream()
	                .map(role -> new SimpleGrantedAuthority(role.getName()))
	                .collect(Collectors.toList());
	    }

}
