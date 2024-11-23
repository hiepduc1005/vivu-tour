package com.tour.vn.security;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties.Jwt;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JWTGenerator {
	
	@Value("${jwt.secret}")
	private String secreteKey;
	
	@Value("${jwt.expire}")
	private Long expireDate;
	
	@Value("${jwt.issuer}")
	private String issuer;
	
	
	public String gennerateToken(String email) {
		Algorithm algorithm = Algorithm.HMAC256(secreteKey);
		
		return JWT.create()
			.withSubject(email)
			.withIssuer(issuer)
			.withIssuedAt(new Date())
			.withExpiresAt(new Date(System.currentTimeMillis() + expireDate))
			.sign(algorithm);
	}
	
	public boolean verifyToken(String token) {
		Algorithm algorithm = Algorithm.HMAC256(secreteKey);
		try {
			JWTVerifier jwtVerifier = JWT.require(algorithm).withIssuer(issuer).build();
			jwtVerifier.verify(token);
			return true;
		}catch(Exception e) {
			throw new RuntimeException("Invalid or expired token!");
		}
	}
	
	public String getSubjectByToken(String token) {
		try {
			DecodedJWT decodedJWT = JWT.decode(token);
			return decodedJWT.getSubject();
		} catch (Exception e) {
			throw new RuntimeException("Invalid token!");
		}
	}
}
