package com.tour.vn.dto;

import com.tour.vn.entity.BookingStatus;

public class BookingUpdate {
	private int numPeople;
	private String additionalRequest;
	private BookingStatus status;
	private String email;
	private String username;
	private String phone;
	
	
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAdditionalRequest() {
		return additionalRequest;
	}
	public void setAdditionalRequest(String additionalRequest) {
		this.additionalRequest = additionalRequest;
	}
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
