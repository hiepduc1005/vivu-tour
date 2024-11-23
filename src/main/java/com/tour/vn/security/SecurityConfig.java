package com.tour.vn.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	 @Bean
	 public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
	        return authenticationConfiguration.getAuthenticationManager();
	 }
	
	 @Bean
	 public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	 	 http.csrf(csrf -> csrf.disable())
		 	 .authorizeHttpRequests(auth -> auth
		             .requestMatchers(HttpMethod.GET, "/api/v1/tours/**").permitAll() // Public endpoints
		             .requestMatchers(HttpMethod.POST, "/api/v1/tours").authenticated() // Yêu cầu đăng nhập
		             .requestMatchers(HttpMethod.PUT, "/api/v1/tours/**").authenticated()
		             .requestMatchers(HttpMethod.DELETE, "/api/v1/tours/**").authenticated()
		             .requestMatchers("/api/v1/users/**").authenticated()
		             .requestMatchers("/api/v1/bookings/**").authenticated()// User endpoints yêu cầu xác thực
		             .anyRequest().denyAll() // Các yêu cầu khác bị từ chối
		         )
		 	 .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		 			 );
	 	 
	 	 return http.build();
	 }
		
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(@NonNull CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedMethods("*")
						.allowCredentials(true)
						.allowedOriginPatterns("*");
			}
		};
	}


}
