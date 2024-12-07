package com.tour.vn.dto;

public class BookingCreate {
	private String email;
	private String phone;
	private String username;
    private Long tourId;
    private int numPeople;
    private String additionalRequest; 
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getAdditionalRequest() {
		return additionalRequest;
	}
	public void setAdditionalRequest(String additionalRequest) {
		this.additionalRequest = additionalRequest;
	}
	public Long getTourId() {
		return tourId;
	}
	public void setTourId(Long tourId) {
		this.tourId = tourId;
	}
	public int getNumPeople() {
		return numPeople;
	}
	public void setNumPeople(int numPeople) {
		this.numPeople = numPeople;
	}
    
    
}
