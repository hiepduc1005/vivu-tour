package com.tour.vn.service.impl;

import com.tour.vn.entity.Location;
import com.tour.vn.entity.Tour;
import com.tour.vn.repository.TourRepository;
import com.tour.vn.service.TourService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TourServiceImpl implements TourService {

    private final TourRepository tourRepository;

    public TourServiceImpl(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    @Override
    public Tour createTour(Tour tour) {
        // You can add additional logic for tour creation here
        return tourRepository.save(tour);
    }

    @Override
    public Tour updateTour(Long id, Tour tour) {
        // Check if tour exists before updating
        if (!tourRepository.existsById(id)) {
            throw new RuntimeException("Tour not found with id " + id);
        }
        tour.setId(id);
        return tourRepository.save(tour);
    }

    @Override
    public Optional<Tour> getTourById(Long id) {
        return tourRepository.findById(id);
    }

    @Override
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    @Override
    public void deleteTour(Long id) {
        if (!tourRepository.existsById(id)) {
            throw new RuntimeException("Tour not found with id " + id);
        }
        tourRepository.deleteById(id);
    }

    @Override
    public List<Tour> getToursByLocation(Location location) {
        return tourRepository.findByLocation(location);
    }

    @Override
    public List<Tour> getToursByStartDate(LocalDateTime startDate) {
        return tourRepository.findByStartDateAfter(startDate);
    }

    @Override
    public List<Tour> searchTours(String searchKeyword) {
        return tourRepository.searchTours(searchKeyword);
    }

    @Override
    public boolean checkAvailability(Long tourId, int requiredSlots) {
        Optional<Tour> tour = tourRepository.findById(tourId);
        if (tour.isPresent()) {
            return tour.get().getAvailableSlots() >= requiredSlots;
        }
        return false;
    }

    @Override
    public void updateAvailableSlots(Long tourId, int bookedSlots) {
        Optional<Tour> tour = tourRepository.findById(tourId);
        if (tour.isPresent()) {
            Tour existingTour = tour.get();
            int updatedSlots = existingTour.getAvailableSlots() - bookedSlots;
            existingTour.setAvailableSlots(updatedSlots);
            tourRepository.save(existingTour);
        } else {
            throw new RuntimeException("Tour not found with id " + tourId);
        }
    }
    
    @Override
    public List<Tour> getToursByStartLocation(Location locationStart) {
        return tourRepository.findByLocationStart(locationStart);
    }
    
    @Override
    public List<Tour> getToursByStartDateAndLocation(LocalDateTime startDate, Location location){
    	return tourRepository.findByStartDateAndLocation(startDate, location);
    }

}
