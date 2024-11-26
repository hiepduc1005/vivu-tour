package com.tour.vn.service.convert;


import com.tour.vn.dto.LocationCreate;
import com.tour.vn.dto.LocationUpdate;
import com.tour.vn.dto.LocationResponse;
import com.tour.vn.entity.Location;
import org.springframework.stereotype.Service;

@Service
public class LocationConvert {

    // Chuyển từ Location sang LocationResponse
    public LocationResponse toLocationResponse(Location location) {
        if (location == null) {
            return null;
        }
        return new LocationResponse(
            location.getId(),
            location.getName(),
            location.getDescription(),
            location.getImagePath()
        );
    }

    // Chuyển từ LocationCreate sang Location (dùng khi tạo mới)
    public Location toEntityFromCreate(LocationCreate locationCreate) {
        if (locationCreate == null) {
            return null;
        }
        Location location = new Location();
        location.setName(locationCreate.getName());
        location.setDescription(locationCreate.getDescription());
        location.setImagePath(locationCreate.getImagePath());
        return location;
    }

    // Chuyển từ LocationUpdate sang Location (dùng khi cập nhật)
    public Location toEntityFromUpdate(LocationUpdate locationUpdate) {
        if (locationUpdate == null) {
            return null;
        }
        Location location = new Location();
        location.setName(locationUpdate.getName());
        location.setDescription(locationUpdate.getDescription());
        location.setImagePath(locationUpdate.getImagePath());
        return location;
    }
}
