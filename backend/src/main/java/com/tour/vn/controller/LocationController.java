package com.tour.vn.controller;

import com.tour.vn.dto.LocationCreate;
import com.tour.vn.dto.LocationUpdate;
import com.tour.vn.dto.LocationResponse;
import com.tour.vn.entity.Location;
import com.tour.vn.service.FileUploadService;
import com.tour.vn.service.LocationService;
import com.tour.vn.service.convert.LocationConvert;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @Autowired
    private LocationConvert locationConvert;
    
    @Autowired
    private FileUploadService fileUploadService;

    // Lấy tất cả các location
    @GetMapping
    public ResponseEntity<List<LocationResponse>> getAllLocations() {
        List<Location> locations = locationService.getAllLocations();
        List<LocationResponse> locationResponses = locations.stream()
            .map(locationConvert::toLocationResponse)
            .collect(Collectors.toList());
        return ResponseEntity.ok(locationResponses);
    }

    // Lấy location theo ID
    @GetMapping("/{id}")
    public ResponseEntity<LocationResponse> getLocationById(@PathVariable Long id) {
        Location location = locationService.getLocationById(id);
        LocationResponse locationResponse = locationConvert.toLocationResponse(location);
        return ResponseEntity.ok(locationResponse);
    }

    @PostMapping
    public ResponseEntity<LocationResponse> createLocation(
    		@RequestPart("locationCreate") LocationCreate locationCreate,
    		@RequestPart("file") MultipartFile file) {
    	String imagePath = fileUploadService.saveFileToSever(file);
    	locationCreate.setImagePath(imagePath);
        Location location = locationConvert.toEntityFromCreate(locationCreate);
        Location createdLocation = locationService.createLocation(location);
        LocationResponse createdLocationResponse = locationConvert.toLocationResponse(createdLocation);
        return ResponseEntity.ok(createdLocationResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocationResponse> updateLocation(
    		@PathVariable(name = "id") Long id,
    		@RequestPart("locationUpdate") LocationUpdate locationUpdate,
    		@RequestPart("file") MultipartFile file) {
    	
    	String imagePath = fileUploadService.saveFileToSever(file);
    	locationUpdate.setImagePath(imagePath);
        Location location = locationConvert.toEntityFromUpdate(locationUpdate);
           Location updatedLocation = locationService.updateLocation(id, location);
        LocationResponse updatedLocationResponse = locationConvert.toLocationResponse(updatedLocation);
        return ResponseEntity.ok(updatedLocationResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        locationService.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }
}
