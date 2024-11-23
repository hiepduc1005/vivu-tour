package com.tour.vn.security;

import java.io.IOException;import java.net.http.HttpHeaders;

import org.apache.tomcat.util.http.parser.HttpHeaderParser.HeaderParsePosition;
import org.apache.tomcat.util.http.parser.HttpHeaderParser.HeaderParseStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.HeaderParams;
import com.tour.vn.entity.User;
import com.tour.vn.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTFilterChain extends OncePerRequestFilter{

	@Autowired
	private JWTGenerator jwtGenerator;
	
	@Autowired
	private UserService userService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String token = getTokenByRequest(request);
		
		if(StringUtils.hasText(token) && jwtGenerator.verifyToken(token)) {
			String email = jwtGenerator.getSubjectByToken(token);
			User user = userService.getUserByEmail(email);
			
			SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(email, user));
		}
		
		filterChain.doFilter(request, response);
	}
	
	private String getTokenByRequest(HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");
		String token = authHeader.substring(7);
		
		return token;
	}

}
