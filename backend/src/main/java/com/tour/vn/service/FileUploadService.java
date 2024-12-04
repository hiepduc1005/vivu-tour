package com.tour.vn.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadService {

	private final String uploadDir = "src/main/resources/static/uploads";
	
	public String saveFileToSever(MultipartFile file) {
		try {
			Path uploadPath = Paths.get(uploadDir);
			if(!Files.exists(uploadPath)) {
				Files.createDirectories(uploadPath);
			}
			
			String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
			Path filePath = uploadPath.resolve(fileName);

			Files.write(filePath,file.getBytes());
			
			return "/uploads/" + fileName;
		} catch (Exception e) {
			 throw new RuntimeException("Failed to save file: " + file.getOriginalFilename(), e);
		}
	}
}
