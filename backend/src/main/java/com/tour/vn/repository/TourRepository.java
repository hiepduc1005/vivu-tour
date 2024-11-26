package com.tour.vn.repository;

import com.tour.vn.entity.Location;
import com.tour.vn.entity.Tour;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {

    List<Tour> findByLocation(Location location);

    List<Tour> findByLocationStart(Location locationStart);

    List<Tour> findByStartDateAfter(LocalDateTime startDate);

    @Query("SELECT t FROM Tour t WHERE t.name LIKE %:searchKeyword% OR t.description LIKE %:searchKeyword%")
    List<Tour> searchTours(@Param("searchKeyword") String searchKeyword);    
    List<Tour> findByStartDateAndLocation(LocalDateTime startDate, Location location);

}
