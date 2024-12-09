package com.tour.vn.repository;

import com.tour.vn.entity.Booking;
import com.tour.vn.entity.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStatus(BookingStatus status);
    List<Booking> findByUserId(Long userId);
    List<Booking> findByTourId(Long tourId);
    List<Booking> findByBookingDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    long countByStatus(BookingStatus status);
    Optional<Booking> findTopByOrderByBookingDateDesc();
    
    @Query("SELECT b FROM Booking b WHERE b.createdAt BETWEEN :startOfDay AND :endOfDay")
    List<Booking> findBookingsToday(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);
}
