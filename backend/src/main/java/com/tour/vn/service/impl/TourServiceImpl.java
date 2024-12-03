package com.tour.vn.service.impl;

import com.tour.vn.entity.Location;
import com.tour.vn.entity.Tour;
import com.tour.vn.repository.TourRepository;
import com.tour.vn.service.TourService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public Tour createTour(Tour tour) {
        // You can add additional logic for tour creation here
        return tourRepository.save(tour);
    }

    @Override
    @Transactional
    public Tour updateTour( Tour tour) {
        return tourRepository.save(tour);
    }

    @Override
    @Transactional
    public Optional<Tour> getTourById(Long id) {
        return tourRepository.findById(id);
    }

    @Override
    @Transactional
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteTour(Long id) {
        if (!tourRepository.existsById(id)) {
            throw new RuntimeException("Tour not found with id " + id);
        }
        tourRepository.deleteById(id);
    }

    @Override
    @Transactional
    public List<Tour> getToursByLocation(Location location) {
        return tourRepository.findByLocation(location);
    }

    @Override
    public List<Tour> getToursByStartDate(LocalDateTime startDate) {
        return tourRepository.findByStartDateAfter(startDate);
    }

    @Override
    @Transactional
    public List<Tour> searchTours(String searchKeyword) {
        return tourRepository.searchTours(searchKeyword);
    }

    @Override
    @Transactional
    public boolean checkAvailability(Long tourId, int requiredSlots) {
        Optional<Tour> tour = tourRepository.findById(tourId);
        if (tour.isPresent()) {
            return tour.get().getAvailableSlots() >= requiredSlots;
        }
        return false;
    }

    @Override
    @Transactional
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
    @Transactional
    public List<Tour> getToursByStartLocation(Location locationStart) {
        return tourRepository.findByLocationStart(locationStart);
    }
    
    @Override
    @Transactional
    public List<Tour> getToursByStartDateAndLocation(LocalDateTime startDate, Location location){
    	return tourRepository.findByStartDateAndLocation(startDate, location);
    }

}
