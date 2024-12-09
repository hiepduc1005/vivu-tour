package com.tour.vn.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tour.vn.entity.Location;
import com.tour.vn.repository.LocationRepository;
import com.tour.vn.service.LocationService;

@Service
public class LocationServiceImpl implements LocationService{
	private final LocationRepository locationRepository;

    
    public LocationServiceImpl(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

	@Override
	public List<Location> getAllLocations() {
		// TODO Auto-generated method stub
		return locationRepository.findAll();
	}

	@Override
	public Location getLocationById(Long id) {
		// TODO Auto-generated method stub
		 return locationRepository.findById(id).orElseThrow(() ->  new RuntimeException("Not found location with id: " + id));
	}

	@Override
	public Location createLocation(Location location) {
		// TODO Auto-generated method stub
		return locationRepository.save(location);
	}

	@Override
	public Location updateLocation(Long id, Location locationDetails) {
		Location location =  getLocationById(id);	
		location.setName(locationDetails.getName());
        location.setDescription(locationDetails.getDescription());
        location.setImagePath(locationDetails.getImagePath());
        return locationRepository.save(location);
	}

	@Override
	public void deleteLocation(Long id) {
		 locationRepository.deleteById(id);
	}

	@Override
	@Transactional
	public List<Location> getLocationsToday() {
		LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        return locationRepository.findLocationsToday(startOfDay, endOfDay);
	}

}
