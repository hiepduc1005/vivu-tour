package com.tour.vn.dto;

import com.tour.vn.entity.BookingStatus;

public class BookingUpdate {
	private int numPeople;
	private BookingStatus status;
	
	public int getNumPeople() {
		return numPeople;
	}
	public void setNumPeople(int numPeople) {
		this.numPeople = numPeople;
	}
	public BookingStatus getStatus() {
		return status;
	}
	public void setStatus(BookingStatus status) {
		this.status = status;
	}
	 
	 
}
