package com.tour.vn.service.impl;

import com.tour.vn.entity.Booking;
import com.tour.vn.entity.BookingStatus;
import com.tour.vn.entity.PaymentStatus;
import com.tour.vn.entity.Tour;
import com.tour.vn.repository.BookingRepository;
import com.tour.vn.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    
    @Override
    public Booking createBooking(Booking booking) {
    	Tour tour = booking.getTour();
    	Double total = BigDecimal.valueOf(booking.getNumPeople()).multiply(BigDecimal.valueOf(tour.getPrices())).doubleValue();
    	booking.setTotalPrice(total);
    	booking.setStatus(BookingStatus.PENDING);
        return bookingRepository.save(booking);
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking updateBooking(Long id, Booking booking) {
        if (bookingRepository.existsById(id)) {
            booking.setId(id);
            return bookingRepository.save(booking);
        }
        return null;  // Hoặc throw exception nếu cần
    }

    @Override
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public List<Booking> findByStatus(BookingStatus status) {
        return bookingRepository.findByStatus(status);
    }

    @Override
    public List<Booking> findByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public List<Booking> findByTourId(Long tourId) {
        return bookingRepository.findByTourId(tourId);
    }

    @Override
    public double getTotalRevenueForTour(Long tourId) {
        return bookingRepository.findByTourId(tourId).stream()
                .mapToDouble(Booking::getTotalPrice)
                .sum();
    }

    @Override
    public List<Booking> findBookingsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return bookingRepository.findByBookingDateBetween(startDate, endDate);
    }

    @Override
    public long countBookingsByStatus(BookingStatus status) {
        return bookingRepository.countByStatus(status);
    }

    @Override
    public boolean isBookingPaid(Long bookingId) {
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        return booking.isPresent() && booking.get().getPayment() != null &&
                booking.get().getPayment().getStatus() == PaymentStatus.COMPLETED;
    }

    @Override
    public Optional<Booking> getLastBooking() {
        return bookingRepository.findTopByOrderByBookingDateDesc();
    }

	@Override
	@Transactional
	public List<Booking> getBookingsToday() {
		LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

		return bookingRepository.findBookingsToday(startOfDay, endOfDay);
	}

	@Override
	public List<Booking> getBookedBookingsToday() {
		BookingStatus bookedStatus = BookingStatus.COMPLETED;
		List<Booking> res = getBookingsToday().stream()
				.filter(booking -> booking.getStatus()  == bookedStatus)
				.collect(Collectors.toList());
		return res;
	}
}
