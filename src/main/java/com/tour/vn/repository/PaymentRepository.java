package com.tour.vn.repository;

import com.tour.vn.entity.Payment;
import com.tour.vn.entity.PaymentStatus;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Payment findByBookingId(Long bookingId); // Tìm payment theo booking ID
    List<Payment> findByStatus(PaymentStatus status);

    List<Payment> findByAmountBetween(double minAmount, double maxAmount);

    List<Payment> findByPaymentDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    List<Payment> findByMethod(String method);
}
