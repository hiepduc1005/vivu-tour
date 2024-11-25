package com.tour.vn.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTFilterChain extends OncePerRequestFilter{

	@Autowired
	private JWTGenerator jwtGenerator;
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String token = getTokenByRequest(request);
		
		if(StringUtils.hasText(token) && jwtGenerator.verifyToken(token)) {
			String email = jwtGenerator.getSubjectByToken(token);
			UserDetails user = customUserDetailsService.loadUserByUsername(email);
			
			SecurityContextHolder.getContext().setAuthentication(
					new UsernamePasswordAuthenticationToken(email, null,user.getAuthorities())
					);
		}
		
		filterChain.doFilter(request, response);
	}
	
	private String getTokenByRequest(HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");
		if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
	            return authHeader.substring(7); 
	        }

	   return null; 
	}

}
