package com.tour.vn.repository;

import com.tour.vn.entity.Role;
import com.tour.vn.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name); // Tìm role theo tên
    
    @Query("SELECT r FROM Role r JOIN r.users u WHERE u.email = :email")
    Optional<Role> findByUserEmail(String email);    
    
    Optional<Role> findByUsers(User user);


}
