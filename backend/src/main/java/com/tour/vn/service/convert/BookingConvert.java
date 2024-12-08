package com.tour.vn.service.convert;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tour.vn.dto.BookingCreate;
import com.tour.vn.dto.BookingResponse;
import com.tour.vn.dto.BookingUpdate;
import com.tour.vn.entity.Booking;
import com.tour.vn.entity.BookingStatus;
import com.tour.vn.entity.User;
import com.tour.vn.service.TourService;
import com.tour.vn.service.UserService;

@Service
public class BookingConvert {
	
	@Autowired
	private TourService tourService;
	
	@Autowired
	private UserService userService;
	
	public Booking bookingCreateConvertToBooking(BookingCreate bookingCreate) {
        Booking booking = new Booking();
		if(bookingCreate.getUserId() != null) {
			User user = userService.getUserById(bookingCreate.getUserId());
	        booking.setUser(user);
		}
        booking.setBookingDate(bookingCreate.getBookingDate());
        booking.setEmail(bookingCreate.getEmail());
        booking.setPhone(bookingCreate.getPhone());
        booking.setUsername(bookingCreate.getUsername());
        booking.setTour(tourService.getTourById(bookingCreate.getTourId()).get());
        booking.setNumPeople(bookingCreate.getNumPeople());
        booking.setAdditionalRequest(bookingCreate.getAdditionalRequest());
        booking.setStatus(BookingStatus.PENDING); // Đặt mặc định là PENDING
        return booking;
    }

    // Phương thức chuyển đổi BookingUpdate thành Booking (cập nhật Booking hiện tại)
    public Booking bookingUpdateConvertToBooking(Booking booking, BookingUpdate bookingUpdate) {
        booking.setNumPeople(bookingUpdate.getNumPeople());
        booking.setAdditionalRequest(bookingUpdate.getAdditionalRequest());
        booking.setStatus(bookingUpdate.getStatus());
        booking.setPhone(bookingUpdate.getPhone());
        booking.setEmail(bookingUpdate.getEmail());
        booking.setUsername(bookingUpdate.getUsername());
        return booking;
    }

    // Phương thức chuyển đổi Booking thành BookingResponse
    public BookingResponse bookingConvertToBookingResponse(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setTotalPrice(booking.getTotalPrice());
        response.setEmail(booking.getEmail());
        response.setPhone(booking.getPhone());
        response.setUsername(booking.getUsername());
        response.setTourId(booking.getTour().getId());
        response.setNumPeople(booking.getNumPeople());
        response.setAdditionalRequest(booking.getAdditionalRequest());
        response.setStatus(booking.getStatus());
        response.setCreatedAt(booking.getCreatedAt());
        response.setUpdatedAt(booking.getUpdatedAt());
        return response;
    }
}
