package com.tour.vn.entity;

public enum PaymentStatus {
    PENDING, // Đang chờ xử lý
    COMPLETED, // Đã thanh toán
    FAILED, // Thanh toán thất bại
    REFUNDED // Đã hoàn tiền
}