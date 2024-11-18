package com.tour.vn.controller;

import com.tour.vn.entity.Location;
import com.tour.vn.entity.Tour;
import com.tour.vn.service.TourService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/tours")
public class TourController {

    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    // Create a new tour (Admin-only endpoint)
    @PostMapping("/create")
    public ResponseEntity<Tour> createTour(@RequestBody Tour tour) {
        Tour createdTour = tourService.createTour(tour);
        return ResponseEntity.ok(createdTour);
    }

    // Update an existing tour (Admin-only endpoint)
    @PutMapping("/{id}")
    public ResponseEntity<Tour> updateTour(@PathVariable Long id, @RequestBody Tour tour) {
        Tour updatedTour = tourService.updateTour(id, tour);
        return ResponseEntity.ok(updatedTour);
    }

    // Get a tour by ID
    @GetMapping("/{id}")
    public ResponseEntity<Tour> getTourById(@PathVariable Long id) {
        Optional<Tour> tour = tourService.getTourById(id);
        return tour.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    // Get all tours
    @GetMapping
    public ResponseEntity<List<Tour>> getAllTours() {
        List<Tour> tours = tourService.getAllTours();
        return ResponseEntity.ok(tours);
    }

    // Delete a tour (Admin-only endpoint)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
        return ResponseEntity.ok().build();
    }

    // Get tours by location
    @GetMapping("/by-location")
    public ResponseEntity<List<Tour>> getToursByLocation(@RequestParam Location location) {
        List<Tour> tours = tourService.getToursByLocation(location);
        return ResponseEntity.ok(tours);
    }

    // Get tours by start date
    @GetMapping("/by-start-date")
    public ResponseEntity<List<Tour>> getToursByStartDate(@RequestParam String startDate) {
        LocalDateTime start = LocalDateTime.parse(startDate);
        List<Tour> tours = tourService.getToursByStartDate(start);
        return ResponseEntity.ok(tours);
    }

    // Search tours by keyword
    @GetMapping("/search")
    public ResponseEntity<List<Tour>> searchTours(@RequestParam String keyword) {
        List<Tour> tours = tourService.searchTours(keyword);
        return ResponseEntity.ok(tours);
    }

    // Check availability for a tour
    @GetMapping("/{id}/availability")
    public ResponseEntity<Boolean> checkAvailability(@PathVariable Long id, @RequestParam int requiredSlots) {
        boolean isAvailable = tourService.checkAvailability(id, requiredSlots);
        return ResponseEntity.ok(isAvailable);
    }

    // Update available slots after booking
    @PutMapping("/{id}/update-slots")
    public ResponseEntity<Void> updateAvailableSlots(@PathVariable Long id, @RequestParam int bookedSlots) {
        tourService.updateAvailableSlots(id, bookedSlots);
        return ResponseEntity.noContent().build();
    }

    // Get tours by start date and location
    @GetMapping("/by-start-date-and-location")
    public ResponseEntity<List<Tour>> getToursByStartDateAndLocation(
            @RequestParam String startDate, @RequestParam Location location) {
        LocalDateTime start = LocalDateTime.parse(startDate);
        List<Tour> tours = tourService.getToursByStartDateAndLocation(start, location);
        return ResponseEntity.ok(tours);
    }

    // Get tours by start 
    @GetMapping("/by-start-location")
    public ResponseEntity<List<Tour>> getToursByStartLocation(@RequestParam Location locationStart) {
        List<Tour> tours = tourService.getToursByStartLocation(locationStart);
        return ResponseEntity.ok(tours);
    }
}
