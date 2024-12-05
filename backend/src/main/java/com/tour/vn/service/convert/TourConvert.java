package com.tour.vn.service.convert;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tour.vn.dto.TourCreate;
import com.tour.vn.dto.TourResponse;
import com.tour.vn.dto.TourUpdate;
import com.tour.vn.entity.Location;
import com.tour.vn.entity.Tour;
import com.tour.vn.service.LocationService;

@Service
public class TourConvert {
	
	@Autowired
	public LocationService locationService;
	
	
	public Tour tourCreateConvertToTour(TourCreate dto) {
		  if (dto == null) return null;
	        
	        Tour tour = new Tour();
	        tour.setName(dto.getName());
	        tour.setDescription(dto.getDescription());
	        tour.setAvailableSlots(dto.getAvailableSlots());
	        tour.setPrices(dto.getPricePerPerson());
	        tour.setStartDate(dto.getStartDate());
	        tour.setEndDate(dto.getEndDate());
	        
	        Location startLocation = locationService.getLocationById(dto.getStartLocationId());
	        Location endLocation = locationService.getLocationById(dto.getEndLocationId());
	        
	        tour.setLocationStart(startLocation);

	        tour.setLocation(endLocation);

	        
	        return tour;
	}
	
	public Tour tourUpdateConvertToTour(TourUpdate tourUpdate, Tour existingTour) {
        if (tourUpdate == null) return null;
        
        Location startLocation = locationService.getLocationById(tourUpdate.getStartLocationId());
        Location endLocation = locationService.getLocationById(tourUpdate.getEndLocationId());

        // Update the existing Tour object with the new values
        existingTour.setName(tourUpdate.getName());
        existingTour.setDescription(tourUpdate.getDescription());
        existingTour.setLocationStart(startLocation); // assuming setLocationStart takes Long
        existingTour.setLocation(endLocation); // assuming setLocationEnd takes Long
        existingTour.setAvailableSlots(tourUpdate.getAvailableSlots());
        existingTour.setPrices(tourUpdate.getPricePerPerson());
        existingTour.setStartDate(tourUpdate.getStartDate());
        existingTour.setEndDate(tourUpdate.getEndDate());
        existingTour.setImages(tourUpdate.getImages()); // Cập nhật ảnh

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
        
        // Set start and end locations
        response.setStartLocation(tour.getLocationStart());
        response.setEndLocation(tour.getLocation());
        response.setImages(tour.getImages()); // Get ảnh

        
        return response;
	}
	
	

}
