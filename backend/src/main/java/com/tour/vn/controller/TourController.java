package com.tour.vn.controller;

import com.tour.vn.dto.TourCreate;
import com.tour.vn.dto.TourResponse;
import com.tour.vn.dto.TourUpdate;
import com.tour.vn.entity.Location;
import com.tour.vn.entity.Tour;
import com.tour.vn.service.FileUploadService;
import com.tour.vn.service.LocationService;
import com.tour.vn.service.TourService;
import com.tour.vn.service.convert.TourConvert;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/tours")
public class TourController {

    private final TourService tourService;
    private final TourConvert tourConvert;
    private final LocationService locationService;
    private final FileUploadService fileUploadService;
    

    public TourController(FileUploadService fileUploadService,TourService tourService,TourConvert tourConvert,LocationService locationService) {
        this.tourService = tourService;
        this.tourConvert = tourConvert;
        this.locationService = locationService;
        this.fileUploadService = fileUploadService;
    }

    // Create a new tour (Admin-only endpoint)
    @PostMapping(value = "/create", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<TourResponse> createTour(
    		@RequestPart("tour") TourCreate tour,
    		@RequestPart("images") List<MultipartFile> images,
    		 HttpServletRequest request) {
    	
    	List<String> imagePaths = images.stream()
    			.map(image -> fileUploadService.saveFileToSever(image)).toList();
    	
    	
        
        Tour createdTour = tourConvert.tourCreateConvertToTour(tour);
        createdTour.setImages(imagePaths);
        createdTour = tourService.createTour(createdTour);
        TourResponse tourResponse = tourConvert.tourConvertToTourResponse(createdTour);

        return ResponseEntity.ok(tourResponse);
    }
    
    @PostMapping(value = "/image", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<String> uploadSingleFileImage(
    		@RequestPart("file") MultipartFile file){
    	
    	String imagePath = fileUploadService.saveFileToSever(file);
    	
    	return ResponseEntity.ok(imagePath);
    }

    // Update an existing tour (Admin-only endpoint)
    @PutMapping(value = "/{id}")
    public ResponseEntity<TourResponse> updateTour(
    		@PathVariable Long id,
    		@RequestBody TourUpdate tour) {
    	
     	        
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
    public ResponseEntity<Page<TourResponse>> getAllTours(
    		@RequestParam(defaultValue = "0",name = "page") int page,  // mặc định page = 0
            @RequestParam(defaultValue = "10",name = "size") int size
           ) {
    	
    	Pageable pageable = PageRequest.of(page, size);

        Page<Tour> toursPage = tourService.getAllTours(pageable);

        Page<TourResponse> toursResponsePage = toursPage.map(tour -> tourConvert.tourConvertToTourResponse(tour));

        return ResponseEntity.ok(toursResponsePage);
    }
    
    @GetMapping("/search-by-keyword-and-location")
    public ResponseEntity<Page<TourResponse>> searchToursByKeywordAndLocation(
            @RequestParam(required = false,defaultValue = "") String keyword,
            @RequestParam(required = false, defaultValue = "-1") Long locationId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);

        // Xử lý khi không có locationId
        Location location = (locationId > 0) ? locationService.getLocationById(locationId) : null;

        // Tìm kiếm tours
        Page<Tour> toursPage = tourService.getTourByKeyAndLocation(location,keyword,pageable);

        // Chuyển đổi dữ liệu
        Page<TourResponse> toursResponsePage = toursPage.map(tour -> tourConvert.tourConvertToTourResponse(tour));

        return ResponseEntity.ok(toursResponsePage);
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
    public ResponseEntity<Page<TourResponse>> searchTours(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,  // mặc định page = 0
            @RequestParam(defaultValue = "10") int size) {  // mặc định size = 10
        // Tạo Pageable từ page và size
        Pageable pageable = PageRequest.of(page, size);

        // Tìm kiếm các tour với phân trang
        Page<Tour> toursPage = tourService.searchTours(keyword, pageable);

        // Chuyển đổi Page<Tour> thành Page<TourResponse>
        Page<TourResponse> toursResponsePage = toursPage.map(tour -> tourConvert.tourConvertToTourResponse(tour));

        return ResponseEntity.ok(toursResponsePage);
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
