package com.tour.vn.service;

import com.tour.vn.entity.Location;
import com.tour.vn.entity.Tour;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TourService {
	Tour createTour(Tour tour);
	    
    Tour updateTour(Long id, Tour tour);
    
    Optional<Tour> getTourById(Long id);
    
    List<Tour> getAllTours();
    
    void deleteTour(Long id);
    
    List<Tour> getToursByLocation(Location location);
    
    List<Tour> getToursByStartDate(LocalDateTime startDate);
    
    List<Tour> searchTours(String searchKeyword);
    
    boolean checkAvailability(Long tourId, int requiredSlots);
    
    void updateAvailableSlots(Long tourId, int bookedSlots);
    
    List<Tour> getToursByStartDateAndLocation(LocalDateTime startDate, Location location);
    
    List<Tour> getToursByStartLocation(Location locationStart);


}
