package com.tour.vn.controller;

import com.tour.vn.dto.TourCreate;
import com.tour.vn.dto.TourResponse;
import com.tour.vn.dto.TourUpdate;
import com.tour.vn.entity.Location;
import com.tour.vn.entity.Tour;
import com.tour.vn.service.LocationService;
import com.tour.vn.service.TourService;
import com.tour.vn.service.convert.TourConvert;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/tours")
public class TourController {

    private final TourService tourService;
    private final TourConvert tourConvert;
    private final LocationService locationService;

    public TourController(TourService tourService,TourConvert tourConvert,LocationService locationService) {
        this.tourService = tourService;
        this.tourConvert = tourConvert;
        this.locationService = locationService;
    }

    // Create a new tour (Admin-only endpoint)
    @PostMapping("/create")
    public ResponseEntity<TourResponse> createTour(@RequestBody TourCreate tour) {
        Tour createdTour = tourService.createTour(tourConvert.tourCreateConvertToTour(tour));
        TourResponse tourResponse = tourConvert.tourConvertToTourResponse(createdTour);
        return ResponseEntity.ok(tourResponse);
    }

    // Update an existing tour (Admin-only endpoint)
    @PutMapping("/{id}")
    public ResponseEntity<TourResponse> updateTour(@PathVariable Long id, @RequestBody TourUpdate tour) {
    	Tour existingTour = tourService.getTourById(id).get();
        Tour updatedTour = tourService.updateTour(tourConvert.tourUpdateConvertToTour(tour, existingTour));
        TourResponse tourResponse = tourConvert.tourConvertToTourResponse(updatedTour);
        return ResponseEntity.ok(tourResponse);
    }

    // Get a tour by ID
    @GetMapping("/{id}")
    public ResponseEntity<TourResponse> getTourById(@PathVariable Long id) {
        Tour tour = tourService.getTourById(id).get();
        TourResponse tourResponse = tourConvert.tourConvertToTourResponse(tour);
        return ResponseEntity.ok(tourResponse);
    }

    // Get all tours ds
    @GetMapping
    public ResponseEntity<List<TourResponse>> getAllTours() {
        List<Tour> tours = tourService.getAllTours();
        List<TourResponse> toursResponse = tours.stream().map((tour) -> tourConvert.tourConvertToTourResponse(tour)).toList();
        return ResponseEntity.ok(toursResponse);
    }

    // Delete a tour (Admin-only endpoint)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/by-location")
    public ResponseEntity<List<TourResponse>> getToursByLocation(@RequestParam Long locationId) {
        Location location = locationService.getLocationById(locationId);

        List<Tour> tours = tourService.getToursByLocation(location);

        List<TourResponse> toursResponse = tours.stream()
                .map(tour -> tourConvert.tourConvertToTourResponse(tour))
                .toList();

        return ResponseEntity.ok(toursResponse);
    }

    // Get tours by start date
    @GetMapping("/by-start-date")
    public ResponseEntity<List<TourResponse>> getToursByStartDate(@RequestParam String startDate) {
        LocalDateTime start = LocalDateTime.parse(startDate);
        List<Tour> tours = tourService.getToursByStartDate(start);
        List<TourResponse> toursResponse = tours.stream().map((tour) -> tourConvert.tourConvertToTourResponse(tour)).toList();
        return ResponseEntity.ok(toursResponse);
    }

    // Search tours by keyword
    @GetMapping("/search")
    public ResponseEntity<List<TourResponse>> searchTours(@RequestParam String keyword) {
        List<Tour> tours = tourService.searchTours(keyword);
        List<TourResponse> toursResponse = tours.stream().map((tour) -> tourConvert.tourConvertToTourResponse(tour)).toList();

        return ResponseEntity.ok(toursResponse);
    }

    // Check availability for a tour
    @GetMapping("/{id}/availability")
    public ResponseEntity<Boolean> checkAvailability(@PathVariable Long id, @RequestParam int requiredSlots) {
        boolean isAvailable = tourService.checkAvailability(id, requiredSlots);
        return ResponseEntity.ok(isAvailable);
    }

    @PutMapping("/{id}/update-slots")
    public ResponseEntity<Void> updateAvailableSlots(@PathVariable Long id, @RequestParam int bookedSlots) {
        tourService.updateAvailableSlots(id, bookedSlots);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-start-date-and-location")
    public ResponseEntity<List<TourResponse>> getToursByStartDateAndLocation(
            @RequestParam String startDate, @RequestParam Long locationId) {
        LocalDateTime start = LocalDateTime.parse(startDate);

        Location location = locationService.getLocationById(locationId);

        List<Tour> tours = tourService.getToursByStartDateAndLocation(start, location);

        List<TourResponse> toursResponse = tours.stream()
                .map(tour -> tourConvert.tourConvertToTourResponse(tour))
                .toList();

        return ResponseEntity.ok(toursResponse);
    }

    @GetMapping("/by-start-location")
    public ResponseEntity<List<TourResponse>> getToursByStartLocation(@RequestParam Long locationId) {
        Location location = locationService.getLocationById(locationId);

        List<Tour> tours = tourService.getToursByStartLocation(location);

        List<TourResponse> toursResponse = tours.stream()
                .map(tour -> tourConvert.tourConvertToTourResponse(tour))
                .toList();

        return ResponseEntity.ok(toursResponse);
    }
}
