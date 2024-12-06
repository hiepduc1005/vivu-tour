package com.tour.vn.dto;

public class ScheduleResponse {
	private Long id;
	private Integer day;
	private String activity;
	private Long tourId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Integer getDay() {
		return day;
	}
	public void setDay(Integer day) {
		this.day = day;
	}
	public String getActivity() {
		return activity;
	}
	public void setActivity(String activity) {
		this.activity = activity;
	}
	public Long getTourId() {
		return tourId;
	}
	public void setTourId(Long tourId) {
		this.tourId = tourId;
	}
	
	
}
