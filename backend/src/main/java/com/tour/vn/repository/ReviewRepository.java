package com.tour.vn.repository;

import com.tour.vn.entity.Review;
import com.tour.vn.entity.Tour;
import com.tour.vn.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    // Tìm review theo userId
    List<Review> findByUserId(Long userId);

    // Tìm review theo tourId
    List<Review> findByTourId(Long tourId);
    
    List<Review> findByTour(Tour tour);


    // Tìm review theo rating
    List<Review> findByRating(int rating);
    
    // Tìm các review theo khoảng thời gian
    List<Review> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    default double findAverageRatingByTour(Tour tour) {
        return findByTour(tour).stream()
                .mapToDouble(Review::getRating)
                .average()
                .orElse(0.0);
    }

    // Kiểm tra user đã review tour hay chưa
    boolean existsByUserAndTour(User user, Tour tour);
}
