package com.tour.vn.controller;

import com.tour.vn.dto.UserAuth;
import com.tour.vn.dto.UserAuthResponse;
import com.tour.vn.dto.UserCreate;
import com.tour.vn.dto.UserResponse;
import com.tour.vn.dto.UserUpdate;
import com.tour.vn.entity.User;
import com.tour.vn.security.JWTGenerator;
import com.tour.vn.service.UserService;
import com.tour.vn.service.convert.UserConvert;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    
    private final UserConvert userConvert;
    
    private final JWTGenerator jwtGenerator;
    
    private final AuthenticationManager authenticationManager;

    public UserController(UserService userService,UserConvert userConvert,JWTGenerator jwtGenerator, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.userConvert = userConvert;
        this.jwtGenerator = jwtGenerator;
        this.authenticationManager = authenticationManager;
    }
    
    @PostMapping("authenticate")
    public ResponseEntity<UserAuthResponse> authenticateUser(@RequestBody UserAuth userAuth) {
        try {
            // Xác thực người dùng
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    userAuth.getEmail(),
                    userAuth.getPassword()
                )
            );

            String email = authentication.getName();

            String token = jwtGenerator.gennerateToken(email);

            return ResponseEntity.ok(new UserAuthResponse(token));
        } catch (Exception ex) {
            throw new RuntimeException("Authenticate failed!", ex);
        }
    }


    // Tạo người dùng mới
    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody UserCreate userCreate) {
        User user = userConvert.convertToUserCreate(userCreate);
        User createdUser = userService.createUser(user);
        UserResponse response = new UserResponse(createdUser);
        return ResponseEntity.ok(response);
    }

    // Lấy thông tin người dùng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        UserResponse response = new UserResponse(user);
        return ResponseEntity.ok(response);
    }

    // Lấy danh sách tất cả người dùng
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserResponse> responses = users.stream()
                .map(UserResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    // Cập nhật thông tin người dùng
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UserUpdate userUpdate) {
        User existingUser = userService.getUserById(id);
        userConvert.convertToUserUpdate(existingUser, userUpdate);
        User updatedUser = userService.updateUser(id, existingUser);
        UserResponse response = new UserResponse(updatedUser);
        return ResponseEntity.ok(response);
    }

    // Xóa người dùng
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Lấy thông tin người dùng theo email
    @GetMapping("/email")
    public ResponseEntity<UserResponse> getUserByEmail(@RequestParam String email) {
        User user = userService.getUserByEmail(email);
        UserResponse response = new UserResponse(user);
        return ResponseEntity.ok(response);
    }
    
    
}
