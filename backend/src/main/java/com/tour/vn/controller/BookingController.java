package com.tour.vn.controller;

import com.tour.vn.dto.BookingCreate;
import com.tour.vn.dto.BookingResponse;
import com.tour.vn.dto.BookingUpdate;
import com.tour.vn.entity.Booking;
import com.tour.vn.entity.BookingStatus;
import com.tour.vn.service.BookingService;
import com.tour.vn.service.convert.BookingConvert;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/bookings")
public class BookingController {

    private final BookingService bookingService;
    
    @Autowired
    private BookingConvert bookingConvert;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Create a new booking
    @PostMapping("/create")
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingCreate bookingCreate) {
    	Booking createdBooking = bookingConvert.bookingCreateConvertToBooking(bookingCreate);
        createdBooking = bookingService.createBooking(createdBooking);
        
        BookingResponse bookingResponse = bookingConvert.bookingConvertToBookingResponse(createdBooking);
        return ResponseEntity.ok(bookingResponse);
    }

    // Get a booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        
        BookingResponse bookingResponse = bookingConvert.bookingConvertToBookingResponse(booking);

        return ResponseEntity.ok(bookingResponse);
    }

    // Get all bookings
    @GetMapping
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        
	    List<BookingResponse> bookingResponses =  bookings.stream()
	        .map(booking -> bookingConvert.bookingConvertToBookingResponse(booking)).collect(Collectors.toList());
        return ResponseEntity.ok(bookingResponses);
    }
    
    @GetMapping("/today")
    public ResponseEntity<List<BookingResponse>>  getBookingsToday() {
    	List<Booking> bookings = bookingService.getBookingsToday();
    	List<BookingResponse> bookingResponses =  bookings.stream()
    	        .map(booking -> bookingConvert.bookingConvertToBookingResponse(booking)).collect(Collectors.toList());
    	return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/today/booked")
    public ResponseEntity<List<BookingResponse>> getBookedBookingsToday() {
    	List<Booking> bookings = bookingService.getBookedBookingsToday();
    	List<BookingResponse> bookingResponses =  bookings.stream()
    	        .map(booking -> bookingConvert.bookingConvertToBookingResponse(booking)).collect(Collectors.toList());
    	return ResponseEntity.ok(bookingResponses);
    }

    // Update a booking
    @PutMapping("/{id}")
    public ResponseEntity<BookingResponse> updateBooking(@PathVariable Long id, @RequestBody BookingUpdate bookingUpdate) {
    	Booking existedBooking = bookingService.getBookingById(id);
    	existedBooking = bookingConvert.bookingUpdateConvertToBooking(existedBooking, bookingUpdate);
        Booking updatedBooking = bookingService.updateBooking(id, existedBooking);
        
        BookingResponse response = bookingConvert.bookingConvertToBookingResponse(updatedBooking);
        return ResponseEntity.ok(response);
    }

    // Delete a booking
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok().build();
    }

    // Find bookings by status
    @GetMapping("/status/{statusString}")
    public ResponseEntity<List<BookingResponse>> findBookingsByStatus(@PathVariable String statusString) {
        List<Booking> bookings = bookingService.findByStatus(BookingStatus.valueOf(statusString));
        
        List<BookingResponse> bookingResponses =  bookings.stream()
    	        .map(booking -> bookingConvert.bookingConvertToBookingResponse(booking)).collect(Collectors.toList());
        return ResponseEntity.ok(bookingResponses);
    }

    // Find bookings by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingResponse>> findByUserId(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.findByUserId(userId);
        
        List<BookingResponse> bookingResponses =  bookings.stream()
    	        .map(booking -> bookingConvert.bookingConvertToBookingResponse(booking)).collect(Collectors.toList());
        return ResponseEntity.ok(bookingResponses);
    }

    // Find bookings by tour ID
    @GetMapping("/tour/{tourId}")
    public ResponseEntity<List<BookingResponse>> findByTourId(@PathVariable Long tourId) {
        List<Booking> bookings = bookingService.findByTourId(tourId);
        
        List<BookingResponse> bookingResponses =  bookings.stream()
    	        .map(booking -> bookingConvert.bookingConvertToBookingResponse(booking)).collect(Collectors.toList());
        return ResponseEntity.ok(bookingResponses);
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
    public ResponseEntity<Long> countBookingsByStatus(@PathVariable String statusString) {
        long count = bookingService.countBookingsByStatus(BookingStatus.valueOf(statusString));
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
    public ResponseEntity<BookingResponse> getLastBooking() {
        Optional<Booking> lastBooking = bookingService.getLastBooking();
        
        BookingResponse bookingResponse = bookingConvert.bookingConvertToBookingResponse(lastBooking.get());
        return ResponseEntity.ok(bookingResponse);
    }
}
