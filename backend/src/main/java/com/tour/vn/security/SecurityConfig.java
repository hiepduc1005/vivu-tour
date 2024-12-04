package com.tour.vn.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	public CustomUserDetailsService customUserDetailsService;
	
	

	public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
		this.customUserDetailsService = customUserDetailsService;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	 @Bean
	 public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
	        return authenticationConfiguration.getAuthenticationManager();
	 }
	 
	 @Bean
	 public JWTFilterChain jwtFilterChain() {
		 return new JWTFilterChain();
	 }
	
	 @Bean
	 public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	 	 http.csrf(csrf -> csrf.disable())
		 	 .authorizeHttpRequests(auth -> auth
//		             .requestMatchers(HttpMethod.GET, "/api/v1/tours/**").permitAll() // Public endpoints
//		             .requestMatchers(HttpMethod.GET, "/api/v1/reviews/**").permitAll() // Xem danh sách reviews công khai
//
//		             .requestMatchers(HttpMethod.POST, "/api/v1/tours").authenticated() // Yêu cầu đăng nhập
//		             .requestMatchers(HttpMethod.PUT, "/api/v1/tours/**").authenticated()
//		             .requestMatchers(HttpMethod.DELETE, "/api/v1/tours/**").authenticated()
//		             
//		             .requestMatchers(HttpMethod.POST, "/api/v1/reviews").authenticated() // Viết review yêu cầu đăng nhập
//		             .requestMatchers(HttpMethod.DELETE, "/api/v1/reviews/**").authenticated() // Xóa review yêu cầu đăng nhập
//		             .requestMatchers("/api/v1/users/**").authenticated()
//		             .requestMatchers("/api/v1/bookings/**").authenticated()
//		             .anyRequest().denyAll() // Các yêu cầu khác bị từ chối
		 			 .anyRequest().permitAll()
		         )
		 	 .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		 			 );
	 	 http.addFilterBefore(jwtFilterChain(), UsernamePasswordAuthenticationFilter.class);
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
