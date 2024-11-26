package com.tour.vn.service;

import com.tour.vn.entity.Payment;
import com.tour.vn.entity.PaymentStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PaymentService {
    Payment createPayment(Payment payment);
    Payment getPaymentById(Long id);
    List<Payment> getAllPayments();
    Payment updatePayment(Long id, Payment payment);
    void deletePayment(Long id);
    List<Payment> getPaymentsByStatus(PaymentStatus status);
    Payment updatePaymentStatus(Long paymentId, PaymentStatus newStatus);
    Payment getPaymentByBookingId(Long bookingId);
    List<Payment> getPaymentsByAmountBetween(double minAmount, double maxAmount);
    double getTotalPaymentAmount();
    List<Payment> getPaymentsByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    double getTotalPaymentAmountByDateRange(LocalDateTime startDate, LocalDateTime endDate);
    boolean isBookingPaid(Long bookingId);
    Optional<Payment> getLastPayment();
    boolean isTotalPaymentAboveThreshold(double threshold);





}
