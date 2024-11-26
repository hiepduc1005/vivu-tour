package com.tour.vn.controller;

import com.tour.vn.dto.ReviewCreate;
import com.tour.vn.dto.ReviewResponse;
import com.tour.vn.entity.Review;
import com.tour.vn.entity.Tour;
import com.tour.vn.entity.User;
import com.tour.vn.service.ReviewService;
import com.tour.vn.service.TourService;
import com.tour.vn.service.UserService;
import com.tour.vn.service.convert.ReviewConvert;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    
    @Autowired
    private ReviewConvert reviewConvert;
    
    @Autowired
    private TourService tourService;
    
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(@RequestBody ReviewCreate review) {
    	Tour tour = tourService.getTourById(review.getTourId()).get();
    	User user = userService.getUserById(review.getUserId());
        Review createdReview = reviewService.createReview(reviewConvert.convertCreateDtoToEntity(review, user, tour));
        
        ReviewResponse reviewResponse = reviewConvert.convertEntityToResponse(createdReview);
        return ResponseEntity.ok(reviewResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewResponse> getReviewById(@PathVariable Long id) {
        Review review = reviewService.getReviewById(id);
        ReviewResponse reviewResponse = reviewConvert.convertEntityToResponse(review);
        return ResponseEntity.ok(reviewResponse);
    }

    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        
        List<ReviewResponse> reviewResponses = reviews
        		.stream()
        		.map(
        				(review) -> reviewConvert.convertEntityToResponse(review)
        			)
        		.toList();
        
        return ResponseEntity.ok(reviewResponses);
    }

    @GetMapping("/tour/{tourId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByTourId(@PathVariable Long tourId) {
        List<Review> reviews = reviewService.getReviewsByTourId(tourId);
        
        List<ReviewResponse> reviewResponses = reviews
        		.stream()
        		.map(
        				(review) -> reviewConvert.convertEntityToResponse(review)
        			)
        		.toList();
        return ResponseEntity.ok(reviewResponses);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByUserId(@PathVariable Long userId) {
        List<Review> reviews = reviewService.getReviewsByUserId(userId);
        
        List<ReviewResponse> reviewResponses = reviews
        		.stream()
        		.map(
        				(review) -> reviewConvert.convertEntityToResponse(review)
        			)
        		.toList();
        return ResponseEntity.ok(reviewResponses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/tour/{tourId}/rating-greater-than")
    public ResponseEntity<List<ReviewResponse>> getReviewsByTourAndRatingGreaterThan(
            @PathVariable Long tourId,
            @RequestParam int minRating) {
        List<Review> reviews = reviewService.getReviewsByTourAndRatingGreaterThan(tourId, minRating);
       
        List<ReviewResponse> reviewResponses = reviews
        		.stream()
        		.map(
        				(review) -> reviewConvert.convertEntityToResponse(review)
        			)
        		.toList();
        
        return ResponseEntity.ok(reviewResponses);
    }

    @GetMapping("/created-at-between")
    public ResponseEntity<List<ReviewResponse>> getReviewsByCreatedAtBetween(
            @RequestParam String start,
            @RequestParam String end) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        List<Review> reviews = reviewService.getReviewsByCreatedAtBetween(startDate, endDate);
       
        List<ReviewResponse> reviewResponses = reviews
        		.stream()
        		.map(
        				(review) -> reviewConvert.convertEntityToResponse(review)
        			)
        		.toList();
        return ResponseEntity.ok(reviewResponses);
    }

    @GetMapping("/tour/{tourId}/average-rating")
    public ResponseEntity<Double> getAverageRatingForTour(@PathVariable Long tourId) {
        double averageRating = reviewService.getAverageRatingForTour(tourId);
        return ResponseEntity.ok(averageRating);
    }

    @GetMapping("/tour/{tourId}/count")
    public ResponseEntity<Long> countReviewsByTour(@PathVariable Long tourId) {
        long count = reviewService.countReviewsByTour(tourId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/tour/{tourId}/best-review")
    public ResponseEntity<ReviewResponse> getBestReviewForTour(@PathVariable Long tourId) {
        Review bestReview = reviewService.getBestReviewForTour(tourId).get();
        ReviewResponse reviewResponse = reviewConvert.convertEntityToResponse(bestReview);

        return ResponseEntity.ok(reviewResponse);
    }

    @GetMapping("/tour/{tourId}/worst-review")
    public ResponseEntity<ReviewResponse> getWorstReviewForTour(@PathVariable Long tourId) {
        Review worstReview = reviewService.getWorstReviewForTour(tourId).get();
        
        ReviewResponse reviewResponse = reviewConvert.convertEntityToResponse(worstReview);
        return ResponseEntity.ok(reviewResponse);
    }

    @GetMapping("/user-reviewed-tour")
    public ResponseEntity<Boolean> hasUserReviewedTour(
            @RequestParam Long userId, 
            @RequestParam Long tourId) {
        boolean hasReviewed = reviewService.hasUserReviewedTour(userId, tourId);
        return ResponseEntity.ok(hasReviewed);
    }

    @GetMapping("/tour/{tourId}/rating-in-range")
    public ResponseEntity<Boolean> isRatingInRange(
            @PathVariable Long tourId,
            @RequestParam int minRating,
            @RequestParam int maxRating) {
        boolean inRange = reviewService.isRatingInRange(tourId, minRating, maxRating);
        return ResponseEntity.ok(inRange);
    }
}
