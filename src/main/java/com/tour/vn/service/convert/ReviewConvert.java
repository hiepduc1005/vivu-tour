package com.tour.vn.service.convert;

import com.tour.vn.dto.ReviewCreate;
import com.tour.vn.dto.ReviewResponse;
import com.tour.vn.dto.ReviewUpdate;
import com.tour.vn.entity.Review;
import com.tour.vn.entity.Tour;
import com.tour.vn.entity.User;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

@Service
public class ReviewConvert {

    // Chuyển từ ReviewCreate DTO sang Entity
    public Review convertCreateDtoToEntity(ReviewCreate dto, User user, Tour tour) {
        Review review = new Review();
        review.setUser(user);
        review.setTour(tour);
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        return review;
    }

    // Chuyển từ ReviewUpdate DTO sang Entity
    public Review updateEntityFromDto(ReviewUpdate dto, Review review) {
        Review updatedReview = new Review();
        updatedReview.setId(review.getId()); // Giữ nguyên ID
        updatedReview.setUser(review.getUser()); // Giữ nguyên User
        updatedReview.setTour(review.getTour()); // Giữ nguyên Tour
        updatedReview.setCreatedAt(review.getCreatedAt()); // Giữ nguyên thời gian tạo

        // Cập nhật thông tin mới
        updatedReview.setRating(dto.getRating());
        updatedReview.setComment(dto.getComment());
        updatedReview.setUpdatedAt(LocalDateTime.now()); // Cập nhật thời gian sửa đổi

        return updatedReview;
    }

    // Chuyển từ Entity sang ReviewResponse DTO
    public ReviewResponse convertEntityToResponse(Review review) {
        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setUserId(review.getUser().getId());
        response.setUserName(review.getUser().getName()); // Lấy tên đầy đủ từ user
        response.setTourId(review.getTour().getId());
        response.setTourName(review.getTour().getName()); // Lấy tên tour
        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());
        response.setUpdatedAt(review.getUpdatedAt());
        return response;
    }
}
