// src/api/bookingApi.js
import axiosInstance from "../ultils/axiosCustomize";

const apiBaseUrl = "api/v1/bookings"; // Đường dẫn tới API

// Lấy danh sách booking
export const getBookings = async () => {
    try {
        const response = await axiosInstance.get(`${apiBaseUrl}`);
        return response.data; // Trả về danh sách booking
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Xem thông tin booking theo ID
export const getBookingById = async (id) => {
    try {
        const response = await axiosInstance.get(`${apiBaseUrl}/${id}`);
        return response; // Trả về dữ liệu booking
    } catch (error) {
        console.error("Error fetching booking:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Tạo booking mới
export const createBooking = async (bookingData) => {
    try {
        const response = await axiosInstance.post(`${apiBaseUrl}/create`, bookingData);
        return response; // Trả về dữ liệu booking vừa tạo
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Cập nhật thông tin booking
export const updateBooking = async (id, bookingData) => {
    try {
        const response = await axiosInstance.put(`${apiBaseUrl}/${id}`, bookingData);
        return response.data; // Trả về dữ liệu booking đã cập nhật
    } catch (error) {
        console.error("Error updating booking:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Xóa booking
export const deleteBooking = async (id) => {
    try {
        const response = await axiosInstance.delete(`${apiBaseUrl}/${id}`);
        return response; // Trả về dữ liệu kết quả xóa
    } catch (error) {
        console.error("Error deleting booking:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};
