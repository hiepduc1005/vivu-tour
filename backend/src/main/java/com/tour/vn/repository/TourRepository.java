package com.tour.vn.repository;

import com.tour.vn.entity.Location;
import com.tour.vn.entity.Tour;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {

    Page<Tour> findAll(Pageable pageable);

    List<Tour> findByLocation(Location location);

    List<Tour> findByLocationStart(Location locationStart);

    List<Tour> findByStartDateAfter(LocalDateTime startDate);

    @Query("SELECT t FROM Tour t WHERE t.name LIKE %:searchKeyword% OR t.description LIKE %:searchKeyword%")
    Page<Tour> searchTours(@Param("searchKeyword") String searchKeyword,Pageable pageable);    
    List<Tour> findByStartDateAndLocation(LocalDateTime startDate, Location location);

    @Query("SELECT t FROM Tour t WHERE (t.name LIKE %:keyword% OR t.description LIKE %:keyword%) AND t.location = :location")
    Page<Tour> findByKeywordAndLocation(@Param("keyword") String keyword, @Param("location") Location location, Pageable pageable);
}
