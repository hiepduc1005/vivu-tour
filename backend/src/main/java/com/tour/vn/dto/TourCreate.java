package com.tour.vn.dto;

import java.time.LocalDateTime;
import java.util.List;


public class TourCreate {	
	private String name;
    private String description;
    private Long startLocationId;
    private Long endLocationId;
    private int availableSlots;
    private double pricePerPerson;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
 
    
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Long getStartLocationId() {
		return startLocationId;
	}
	public void setStartLocationId(Long startLocationId) {
		this.startLocationId = startLocationId;
	}
	public Long getEndLocationId() {
		return endLocationId;
	}
	public void setEndLocationId(Long endLocationId) {
		this.endLocationId = endLocationId;
	}
	public int getAvailableSlots() {
		return availableSlots;
	}
	public void setAvailableSlots(int availableSlots) {
		this.availableSlots = availableSlots;
	}
	public double getPricePerPerson() {
		return pricePerPerson;
	}
	public void setPricePerPerson(double pricePerPerson) {
		this.pricePerPerson = pricePerPerson;
	}
	public LocalDateTime getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}
	public LocalDateTime getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
	}
    
    

}
