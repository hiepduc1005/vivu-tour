package com.tour.vn.service.impl;

import com.tour.vn.entity.Payment;
import com.tour.vn.entity.PaymentStatus;
import com.tour.vn.repository.PaymentRepository;
import com.tour.vn.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public Payment createPayment(Payment payment) {
        payment.setCreatedAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());
        return paymentRepository.save(payment);
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment updatePayment(Long id, Payment payment) {
        Payment existingPayment = getPaymentById(id);
        existingPayment.setAmount(payment.getAmount());
        existingPayment.setMethod(payment.getMethod());
        existingPayment.setStatus(payment.getStatus());
        existingPayment.setPaymentDate(payment.getPaymentDate());
        existingPayment.setUpdatedAt(LocalDateTime.now());
        return paymentRepository.save(existingPayment);
    }

    @Override
    public void deletePayment(Long id) {
        Payment existingPayment = getPaymentById(id);
        paymentRepository.delete(existingPayment);
    }

    @Override
    public List<Payment> getPaymentsByStatus(PaymentStatus status) {
        return paymentRepository.findByStatus(status);
    }

    @Override
    public Payment updatePaymentStatus(Long paymentId, PaymentStatus newStatus) {
        Payment payment = getPaymentById(paymentId);
        payment.setStatus(newStatus);
        payment.setUpdatedAt(LocalDateTime.now());
        return paymentRepository.save(payment);
    }

    @Override
    public Payment getPaymentByBookingId(Long bookingId) {
        return paymentRepository.findByBookingId(bookingId);
    }

    @Override
    public List<Payment> getPaymentsByAmountBetween(double minAmount, double maxAmount) {
        return paymentRepository.findByAmountBetween(minAmount, maxAmount);
    }

    @Override
    public double getTotalPaymentAmount() {
        return paymentRepository.findAll().stream()
                .mapToDouble(Payment::getAmount)
                .sum();
    }

    @Override
    public List<Payment> getPaymentsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return paymentRepository.findByPaymentDateBetween(startDate, endDate);
    }

    @Override
    public double getTotalPaymentAmountByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return paymentRepository.findByPaymentDateBetween(startDate, endDate).stream()
                .mapToDouble(Payment::getAmount)
                .sum();
    }

    @Override
    public boolean isBookingPaid(Long bookingId) {
    	Payment payment = paymentRepository.findByBookingId(bookingId);
        return payment != null && payment.getStatus() == PaymentStatus.COMPLETED;
    }

    @Override
    public Optional<Payment> getLastPayment() {
        return paymentRepository.findAll().stream()
                .max((p1, p2) -> p1.getPaymentDate().compareTo(p2.getPaymentDate()));
    }

    @Override
    public boolean isTotalPaymentAboveThreshold(double threshold) {
        return getTotalPaymentAmount() > threshold;
    }
}
