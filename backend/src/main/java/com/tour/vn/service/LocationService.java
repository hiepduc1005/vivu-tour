package com.tour.vn.service;

import java.util.List;

import com.tour.vn.entity.Location;

public interface LocationService {
	List<Location> getAllLocations();
	Location getLocationById(Long id);
	Location createLocation(Location location);
	Location updateLocation(Long id, Location locationDetails);
	void deleteLocation(Long id);
	List<Location> getLocationsToday();
}
