package com.tour.vn.service.impl;

import com.tour.vn.entity.Review;
import com.tour.vn.entity.Tour;
import com.tour.vn.entity.User;
import com.tour.vn.repository.ReviewRepository;
import com.tour.vn.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Review createReview(Review review) {
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());
        return reviewRepository.save(review);
    }

    @Override
    public Review getReviewById(Long id) {
        return reviewRepository.findById(id).orElseThrow(() -> new RuntimeException("Review not found"));
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public List<Review> getReviewsByTourId(Long tourId) {
        Tour tour = new Tour();
        tour.setId(tourId);
        return reviewRepository.findByTour(tour);
    }

    @Override
    public List<Review> getReviewsByUserId(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

    @Override
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public List<Review> getReviewsByTourAndRatingGreaterThan(Long tourId, int minRating) {
        Tour tour = new Tour();
        tour.setId(tourId);
        return reviewRepository.findByTour(tour).stream()
                .filter(review -> review.getRating() > minRating)
                .toList();
    }

    @Override
    public List<Review> getReviewsByCreatedAtBetween(LocalDateTime start, LocalDateTime end) {
        return reviewRepository.findByCreatedAtBetween(start, end);
    }

    @Override
    public double getAverageRatingForTour(Long tourId) {
        Tour tour = new Tour();
        tour.setId(tourId);
        return reviewRepository.findByTour(tour).stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }

    @Override
    public long countReviewsByTour(Long tourId) {
        Tour tour = new Tour();
        tour.setId(tourId);
        return reviewRepository.findByTour(tour).size();
    }

    @Override
    public Optional<Review> getBestReviewForTour(Long tourId) {
        Tour tour = new Tour();
        tour.setId(tourId);
        return reviewRepository.findByTour(tour).stream()
                .max((r1, r2) -> Integer.compare(r1.getRating(), r2.getRating()));
    }

    @Override
    public Optional<Review> getWorstReviewForTour(Long tourId) {
        Tour tour = new Tour();
        tour.setId(tourId);
        return reviewRepository.findByTour(tour).stream()
                .min((r1, r2) -> Integer.compare(r1.getRating(), r2.getRating()));
    }

    @Override
    public boolean hasUserReviewedTour(Long userId, Long tourId) {
        User user = new User();
        user.setId(userId);
        Tour tour = new Tour();
        tour.setId(tourId);
        return reviewRepository.existsByUserAndTour(user, tour);
    }

    @Override
    public boolean isRatingInRange(Long tourId, int minRating, int maxRating) {
        Tour tour = new Tour();
        tour.setId(tourId);
        return reviewRepository.findByTour(tour).stream()
                .allMatch(review -> review.getRating() >= minRating && review.getRating() <= maxRating);
    }
}
