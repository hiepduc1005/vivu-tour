package com.tour.vn.service;

import com.tour.vn.entity.Location;
import com.tour.vn.entity.Tour;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TourService {
	Tour createTour(Tour tour);
	    
    Tour updateTour(Tour tour);
    
    Optional<Tour> getTourById(Long id);
    
    Page<Tour> getAllTours(Pageable pageable);
    
    void deleteTour(Long id);
    
    List<Tour> getToursByLocation(Location location);
    
    List<Tour> getToursByStartDate(LocalDateTime startDate);
    
    Page<Tour> searchTours(String searchKeyword,Pageable pageable);
    
    boolean checkAvailability(Long tourId, int requiredSlots);
    
    void updateAvailableSlots(Long tourId, int bookedSlots);
    
    List<Tour> getToursByStartDateAndLocation(LocalDateTime startDate, Location location);
    
    Page<Tour> getTourByKeyAndLocation(Location location, String keyword, Pageable pageable);
    
    List<Tour> getToursByStartLocation(Location locationStart);


}
