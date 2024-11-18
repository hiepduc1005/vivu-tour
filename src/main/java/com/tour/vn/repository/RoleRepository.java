package com.tour.vn.repository;

import com.tour.vn.entity.Role;
import com.tour.vn.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name); // Tìm role theo tên
    
    Optional<Role> findByUserEmail(String email);
    
    Optional<Role> findByUser(User user);


}
