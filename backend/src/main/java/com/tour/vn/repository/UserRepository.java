package com.tour.vn.repository;

import com.tour.vn.entity.User;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email); // Tìm user theo email
   
    @Query("SELECT u FROM User u WHERE u.createdAt BETWEEN :startOfDay AND :endOfDay")
    List<User> findUsersCreatedToday(
            @Param("startOfDay") LocalDateTime startOfDay, 
            @Param("endOfDay") LocalDateTime endOfDay);
}
