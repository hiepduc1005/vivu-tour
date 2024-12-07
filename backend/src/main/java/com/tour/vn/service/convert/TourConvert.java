package com.tour.vn.service.convert;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tour.vn.dto.ScheduleResponse;
import com.tour.vn.dto.TourCreate;
import com.tour.vn.dto.TourResponse;
import com.tour.vn.dto.TourUpdate;
import com.tour.vn.entity.Location;
import com.tour.vn.entity.Schedule;
import com.tour.vn.entity.Tour;
import com.tour.vn.service.LocationService;

@Service
public class TourConvert {
	
	@Autowired
	public LocationService locationService;
	
	@Autowired
	public ScheduleConvert scheduleConvert;
	
	public Tour tourCreateConvertToTour(TourCreate dto) {
	    if (dto == null) return null;

	    Tour tour = new Tour();
	    tour.setName(dto.getName());
	    tour.setDescription(dto.getDescription());
	    tour.setAvailableSlots(dto.getAvailableSlots());
	    tour.setPrices(dto.getPricePerPerson());
	    tour.setStartDate(dto.getStartDate());
	    tour.setEndDate(dto.getEndDate());

	    // Lấy start và end location, xử lý lỗi nếu không tìm thấy
	    Location startLocation = locationService.getLocationById(dto.getStartLocationId());
	    if (startLocation == null) throw new IllegalArgumentException("Start location not found");
	    Location endLocation = locationService.getLocationById(dto.getEndLocationId());
	    if (endLocation == null) throw new IllegalArgumentException("End location not found");

	    tour.setLocationStart(startLocation);
	    tour.setLocation(endLocation);

	    // Xử lý danh sách schedule, nếu null thì gán danh sách rỗng
	    List<Schedule> schedules = dto.getSchedule() != null
	        ? dto.getSchedule().stream()
	              .map(schedule -> scheduleConvert.scheduleCreateConvertToSchedule(schedule, tour))
	              .collect(Collectors.toList())
	        : Collections.emptyList();
	    tour.setSchedules(schedules);

	    return tour;
	}

	
	public Tour tourUpdateConvertToTour(TourUpdate tourUpdate, Tour existingTour) {
	    if (tourUpdate == null) return existingTour;

	    Location startLocation = locationService.getLocationById(tourUpdate.getStartLocationId());
	    if (startLocation == null) throw new IllegalArgumentException("Start location not found");
	    Location endLocation = locationService.getLocationById(tourUpdate.getEndLocationId());
	    if (endLocation == null) throw new IllegalArgumentException("End location not found");

	    existingTour.setName(tourUpdate.getName());
	    existingTour.setDescription(tourUpdate.getDescription());
	    existingTour.setLocationStart(startLocation);
	    existingTour.setLocation(endLocation);
	    existingTour.setAvailableSlots(tourUpdate.getAvailableSlots());
	    existingTour.setPrices(tourUpdate.getPricePerPerson());
	    existingTour.setStartDate(tourUpdate.getStartDate());
	    existingTour.setEndDate(tourUpdate.getEndDate());
	    existingTour.setImages(tourUpdate.getImages());

	    // Xử lý danh sách schedule
	    List<Schedule> schedules = tourUpdate.getScheduleUpdate() != null
	        ? tourUpdate.getScheduleUpdate().stream()
	              .map(schedule -> scheduleConvert.scheduleUpdateConvertToSchedule(schedule, existingTour))
	              .collect(Collectors.toList())
	        : Collections.emptyList();
	    
	    existingTour.setSchedules(schedules);
	    
	    List<Schedule> schedulesCreate = tourUpdate.getScheduleCreate() != null
		        ? tourUpdate.getScheduleCreate().stream()
		              .map(schedule -> scheduleConvert.scheduleCreateConvertToSchedule(schedule, existingTour))
		              .collect(Collectors.toList())
		        : Collections.emptyList();
	    
		existingTour.getSchedules().addAll(schedulesCreate);

	    return existingTour;
	}
	
	public TourResponse tourConvertToTourResponse(Tour tour) {
	    if (tour == null) return null;

	    TourResponse response = new TourResponse();
	    response.setId(tour.getId());
	    response.setName(tour.getName());
	    response.setDescription(tour.getDescription());
	    response.setAvailableSlots(tour.getAvailableSlots());
	    response.setPricePerPerson(tour.getPrices());
	    response.setStartDate(tour.getStartDate());
	    response.setEndDate(tour.getEndDate());
	    response.setStartLocation(tour.getLocationStart());
	    response.setEndLocation(tour.getLocation());
	    response.setImages(tour.getImages());

	    // Xử lý danh sách schedule, tránh null
	    List<ScheduleResponse> scheduleResponses = tour.getSchedules() != null
	        ? tour.getSchedules().stream()
	              .map(schedule -> scheduleConvert.scheduleConvertToScheduleResponse(schedule))
	              .collect(Collectors.toList())
	        : Collections.emptyList();
	    response.setSchedules(scheduleResponses);

	    return response;
	}
	
	

}
