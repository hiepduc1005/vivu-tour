package com.tour.vn.controller;

import com.tour.vn.entity.Booking;
import com.tour.vn.entity.BookingStatus;
import com.tour.vn.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Create a new booking
    @PostMapping("/create")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking createdBooking = bookingService.createBooking(booking);
        return ResponseEntity.ok(createdBooking);
    }

    // Get a booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }

    // Get all bookings
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    // Update a booking
    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        Booking updatedBooking = bookingService.updateBooking(id, booking);
        return ResponseEntity.ok(updatedBooking);
    }

    // Delete a booking
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }

    // Find bookings by status
    @GetMapping("/status")
    public ResponseEntity<List<Booking>> findBookingsByStatus(@RequestParam BookingStatus status) {
        List<Booking> bookings = bookingService.findByStatus(status);
        return ResponseEntity.ok(bookings);
    }

    // Find bookings by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> findByUserId(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.findByUserId(userId);
        return ResponseEntity.ok(bookings);
    }

    // Find bookings by tour ID
    @GetMapping("/tour/{tourId}")
    public ResponseEntity<List<Booking>> findByTourId(@PathVariable Long tourId) {
        List<Booking> bookings = bookingService.findByTourId(tourId);
        return ResponseEntity.ok(bookings);
    }

    // Get total revenue for a specific tour
    @GetMapping("/tour/{tourId}/revenue")
    public ResponseEntity<Double> getTotalRevenueForTour(@PathVariable Long tourId) {
        double revenue = bookingService.getTotalRevenueForTour(tourId);
        return ResponseEntity.ok(revenue);
    }

    // Find bookings by date range
    @GetMapping("/date-range")
    public ResponseEntity<List<Booking>> findBookingsByDateRange(
            @RequestParam String startDate, @RequestParam String endDate) {
        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);
        List<Booking> bookings = bookingService.findBookingsByDateRange(start, end);
        return ResponseEntity.ok(bookings);
    }

    // Count bookings by status
    @GetMapping("/count-by-status")
    public ResponseEntity<Long> countBookingsByStatus(@RequestParam BookingStatus status) {
        long count = bookingService.countBookingsByStatus(status);
        return ResponseEntity.ok(count);
    }

    // Check if a booking is paid
    @GetMapping("/{id}/is-paid")
    public ResponseEntity<Boolean> isBookingPaid(@PathVariable Long id) {
        boolean isPaid = bookingService.isBookingPaid(id);
        return ResponseEntity.ok(isPaid);
    }

    // Get the last booking
    @GetMapping("/last")
    public ResponseEntity<Optional<Booking>> getLastBooking() {
        Optional<Booking> lastBooking = bookingService.getLastBooking();
        return ResponseEntity.ok(lastBooking);
    }
}
