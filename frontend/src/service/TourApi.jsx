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
        return response; // Trả về dữ liệu tour
    } catch (error) {
        console.error("Error fetching tour:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

export const createTour = async (tourData) => {
    const formData = new FormData();

    // Định dạng JSON theo DTO của backend
    const tourJson = JSON.stringify({
        name: tourData.name,
        description: tourData.description,
        startLocationId: tourData.startLocationId,
        endLocationId: tourData.endLocationId,
        availableSlots: tourData.availableSlots,
        pricePerPerson: tourData.pricePerPerson,
        startDate: tourData.startDate, // Đảm bảo là ISO 8601 string
        endDate: tourData.endDate, 
        schedule: tourData.schedule    // Đảm bảo là ISO 8601 string
    });

    // Thêm JSON vào FormData
    formData.append('tour', new Blob([tourJson], { type: 'application/json' }));
    
    // Thêm hình ảnh vào FormData
    if (tourData.images && tourData.images.length > 0) {
        tourData.images.forEach((image) => {
            if (image instanceof File) {
                formData.append('images', image);
            }
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
        // Xử lý lỗi
        if (error.response) {
            console.error("Error creating tour:", error.response.data);
            throw new Error(`Server Error: ${error.response.status} - ${error.response.data.message || 'An error occurred.'}`);
        } else if (error.request) {
            console.error("No response received:", error.request);
            throw new Error("No response received from the server. Please check your connection or try again later.");
        } else {
            console.error("Request setup error:", error.message);
            throw new Error(`Unexpected error: ${error.message}`);
        }
    }
};


// Cập nhật thông tin tour
export const updateTour = async (id, tourData) => {
    try {
        const response = await axiosInstance.put(`${apiBaseUrl}/${id}`, tourData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data; // Dữ liệu trả về từ server
      } catch (error) {
        console.error("Error updating tour:", error);
        throw error; // Đẩy lỗi để xử lý phía trên nếu cần
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

export const uploadSingleImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file); // Gắn file hình ảnh vào FormData
  
      const response = await axiosInstance.post(
        `${apiBaseUrl}/image`, // Đường dẫn đến API upload
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Đặt header phù hợp
          },
        }
      );
  
      // Trả về đường dẫn hình ảnh từ server
      return response.data;
    } catch (error) {
      console.error('Lỗi khi upload hình ảnh:', error);
      throw error; // Ném lỗi ra ngoài để xử lý
    }
  };
