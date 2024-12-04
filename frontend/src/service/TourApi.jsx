// src/api/tourApi.js
import axiosInstance from "../ultils/axiosCustomize";

const apiBaseUrl = "api/v1/tours"; // Đường dẫn tới API

// Lấy danh sách tour
export const getTours = async () => {
    try {
        const response = await axiosInstance.get(`${apiBaseUrl}`);
        return response.data; // Trả về danh sách tour
    } catch (error) {
        console.error("Error fetching tours:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Xem thông tin tour theo ID
export const getTourById = async (id) => {
    try {
        const response = await axiosInstance.get(`${apiBaseUrl}/${id}`);
        return response.data; // Trả về dữ liệu tour
    } catch (error) {
        console.error("Error fetching tour:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

export const createTour = async (tourData) => {
    const formData = new FormData();

    // Thêm dữ liệu JSON của tour vào FormData
    const tourJson = JSON.stringify({
        name: tourData.name,
        description: tourData.description,
        prices: tourData.prices,
        start_date: tourData.start_date,
        end_date: tourData.end_date,
        location_start: tourData.location_start,
        location: tourData.location,
        duration: tourData.duration,
        available_slots: tourData.available_slots,
    });
    formData.append('tour', new Blob([tourJson], { type: 'application/json' }));

    // Thêm danh sách hình ảnh vào FormData
    if (tourData.images) {
        tourData.images.forEach((image) => {
            formData.append('images', image);
        });
    }

    try {
        const response = await axiosInstance.post(`${apiBaseUrl}/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error creating tour:", error.response.data);
            throw new Error(`Error ${error.response.status}: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
            console.error("Error creating tour: No response received", error.request);
            throw new Error("No response from server. Please try again later.");
        } else {
            console.error("Error creating tour:", error.message);
            throw new Error(`Request failed: ${error.message}`);
        }
    }
};


// Cập nhật thông tin tour
export const updateTour = async (id, tourData) => {
    const formData = new FormData();
    Object.keys(tourData).forEach((key) => {
        formData.append(key, tourData[key]);
    });

    try {
        const response = await axiosInstance.put(`${apiBaseUrl}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Thiết lập header cho việc gửi tệp
            },
        });
        return response.data; // Trả về dữ liệu tour đã cập nhật
    } catch (error) {
        console.error("Error updating tour:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Xóa tour
export const deleteTour = async (id) => {
    try {
        const response = await axiosInstance.delete(`${apiBaseUrl}/${id}`);
        return response.data; // Trả về dữ liệu kết quả xóa
    } catch (error) {
        console.error("Error deleting tour:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};
