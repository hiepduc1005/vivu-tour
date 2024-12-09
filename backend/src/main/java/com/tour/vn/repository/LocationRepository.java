package com.tour.vn.repository;

import com.tour.vn.entity.Location;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    // Bạn có thể thêm các phương thức tuỳ chỉnh nếu cần.
	
	@Query("SELECT l FROM Location l WHERE l.createdAt BETWEEN :startOfDay AND :endOfDay")
    List<Location> findLocationsToday(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);
}
