package com.tour.vn.dto;

import com.tour.vn.entity.Location;

import java.time.LocalDateTime;
import java.util.List;

public class TourResponse {
    private Long id;
    private String name;
    private String description;
    private LocationResponse startLocation;
    private LocationResponse endLocation;
    private int availableSlots;
    private double pricePerPerson;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<String> images; // Thêm ảnh
    private List<ScheduleResponse> schedules;
    private List<ReviewResponse> reviews;
    private double averageRatting;
    private String ratingDescription;

    
    
	public String getRatingDescription() {
		return ratingDescription;
	}
	public void setRatingDescription(String ratingDescription) {
		this.ratingDescription = ratingDescription;
	}
	public double getAverageRatting() {
		return averageRatting;
	}
	public void setAverageRatting(double averageRatting) {
		this.averageRatting = averageRatting;
	}
	public List<ReviewResponse> getReviews() {
		return reviews;
	}
	public void setReviews(List<ReviewResponse> reviews) {
		this.reviews = reviews;
	}
	public List<ScheduleResponse> getSchedules() {
		return schedules;
	}
	public void setSchedules(List<ScheduleResponse> schedules) {
		this.schedules = schedules;
	}
	public List<String> getImages() {
		return images;
	}
	public void setImages(List<String> images) {
		this.images = images;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
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
	public LocationResponse getStartLocation() {
		return startLocation;
	}
	public void setStartLocation(LocationResponse startLocation) {
		this.startLocation = startLocation;
	}
	public LocationResponse getEndLocation() {
		return endLocation;
	}
	public void setEndLocation(LocationResponse endLocation) {
		this.endLocation = endLocation;
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
