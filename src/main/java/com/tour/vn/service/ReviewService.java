package com.tour.vn.service;

import com.tour.vn.entity.Review;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReviewService {
    Review createReview(Review review);
    Review getReviewById(Long id);
    List<Review> getAllReviews();
    List<Review> getReviewsByTourId(Long tourId);
    List<Review> getReviewsByUserId(Long userId);
    void deleteReview(Long id);
    
    List<Review> getReviewsByTourAndRatingGreaterThan(Long tourId, int minRating);
    List<Review> getReviewsByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    double getAverageRatingForTour(Long tourId);
    long countReviewsByTour(Long tourId);
    Optional<Review> getBestReviewForTour(Long tourId);
    Optional<Review> getWorstReviewForTour(Long tourId);
    boolean hasUserReviewedTour(Long userId, Long tourId);
    boolean isRatingInRange(Long tourId, int minRating, int maxRating);








}
