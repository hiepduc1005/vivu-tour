package com.tour.vn.service;

import com.tour.vn.entity.Booking;
import com.tour.vn.entity.BookingStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BookingService {
    Booking createBooking(Booking booking);
    Booking getBookingById(Long id);
    List<Booking> getAllBookings();
    Booking updateBooking(Long id, Booking booking);
    void deleteBooking(Long id);
    List<Booking> findByStatus(BookingStatus status);
    List<Booking> findByUserId(Long userId);


    List<Booking> findByTourId(Long tourId);
    double getTotalRevenueForTour(Long tourId);
    List<Booking> findBookingsByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    long countBookingsByStatus(BookingStatus status);
    boolean isBookingPaid(Long bookingId);
    Optional<Booking> getLastBooking();
    
    List<Booking> getBookingsToday();
    List<Booking> getBookedBookingsToday();

}
