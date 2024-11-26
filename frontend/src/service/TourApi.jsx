// src/api/tourApi.js
import axiosInstance from "../ultils/axiosCustomize";

const apiBaseUrl = "tourApi.php"; // Đường dẫn tới API

// Lấy danh sách tour
export const getTours = async () => {
    try {
        const response = await axiosInstance.get(`${apiBaseUrl}/tours`);
        return response.data; // Trả về danh sách tour
    } catch (error) {
        console.error("Error fetching tours:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Xem thông tin tour theo ID
export const getTourById = async (id) => {
    try {
        const response = await axiosInstance.get(`${apiBaseUrl}/tours/${id}`);
        return response.data; // Trả về dữ liệu tour
    } catch (error) {
        console.error("Error fetching tour:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

export const createTour = async (tourData) => {
    const formData = new FormData(); // Sử dụng FormData để gửi tệp hình ảnh

    // Thêm tất cả các trường vào FormData
    Object.keys(tourData).forEach((key) => {
        formData.append(key, tourData[key]);
    });

    try {
        const response = await axiosInstance.post(`${apiBaseUrl}/tours`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Thiết lập header cho việc gửi tệp
            },
        });
        return response.data; // Trả về dữ liệu tour vừa tạo
    } catch (error) {
        if (error.response) {
            // Yêu cầu đã được gửi và server đã trả về mã trạng thái ngoài 2xx
            console.error("Error creating tour:", error.response.data);
            throw new Error(`Error ${error.response.status}: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
            // Yêu cầu đã được gửi nhưng không nhận được phản hồi
            console.error("Error creating tour: No response received", error.request);
            throw new Error("No response from server. Please try again later.");
        } else {
            // Một lỗi khác đã xảy ra trong quá trình thiết lập yêu cầu
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
        const response = await axiosInstance.put(`${apiBaseUrl}/tours/${id}`, formData, {
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
        const response = await axiosInstance.delete(`${apiBaseUrl}/tours/${id}`);
        return response.data; // Trả về dữ liệu kết quả xóa
    } catch (error) {
        console.error("Error deleting tour:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};
