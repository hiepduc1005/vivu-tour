package com.tour.vn.dto;

import java.time.LocalDateTime;

public class LocationResponse {

    private Long id;
    private String name;
    private String description;
    private String imagePath;  // Đường dẫn ảnh
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    
    

    public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public LocationResponse() {}

    public LocationResponse(Long id, String name, String description, String imagePath,LocalDateTime createdAt,LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
