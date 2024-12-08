// src/api/bookingApi.js
import axiosInstance from "../ultils/axiosCustomize";

const apiBaseUrl = "api/v1/reviews"; // Đường dẫn tới API

export const createReview = async (review,token) => {
    const response = await axiosInstance.post(apiBaseUrl, review, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token qua header
        },
    });

    return response.data;
};
  
  // Lấy thông tin đánh giá theo ID
  export const getReviewById = async (id) => {
    const response = await axiosInstance.get(`${apiBaseUrl}/${id}`);
    return response.data;
  };
  
  // Lấy tất cả các đánh giá
  export const getAllReviews = async () => {
    const response = await axiosInstance.get(apiBaseUrl);
    return response.data;
  };
  
  // Lấy các đánh giá theo tour ID
  export const getReviewsByTourId = async (tourId) => {
    const response = await axiosInstance.get(`${apiBaseUrl}/tour/${tourId}`);
    return response.data;
  };
  
  // Lấy các đánh giá theo user ID
  export const getReviewsByUserId = async (userId) => {
    const response = await axiosInstance.get(`${apiBaseUrl}/user/${userId}`);
    return response.data;
  };
  
  // Xóa một đánh giá theo ID
  export const deleteReview = async (id) => {
    const response = await axiosInstance.delete(`${apiBaseUrl}/${id}`);
    return response.data;
  };
  
  // Lấy đánh giá theo tour ID và rating lớn hơn giá trị cho trước
  export const getReviewsByTourAndRatingGreaterThan = async (tourId, minRating) => {
    const response = await axiosInstance.get(
      `${apiBaseUrl}/tour/${tourId}/rating-greater-than`,
      { params: { minRating } }
    );
    return response.data;
  };
  
  // Lấy đánh giá theo khoảng thời gian
  export const getReviewsByCreatedAtBetween = async (start, end) => {
    const response = await axiosInstance.get(`${apiBaseUrl}/created-at-between`, {
      params: { start, end },
    });
    return response.data;
  };
  
  // Lấy trung bình đánh giá của một tour
  export const getAverageRatingForTour = async (tourId) => {
    const response = await axiosInstance.get(
      `${apiBaseUrl}/tour/${tourId}/average-rating`
    );
    return response.data;
  };
  
  // Đếm số lượng đánh giá của một tour
  export const countReviewsByTour = async (tourId) => {
    const response = await axiosInstance.get(`${apiBaseUrl}/tour/${tourId}/count`);
    return response.data;
  };
  
  // Lấy đánh giá tốt nhất của một tour
  export const getBestReviewForTour = async (tourId) => {
    const response = await axiosInstance.get(
      `${apiBaseUrl}/tour/${tourId}/best-review`
    );
    return response.data;
  };
  
  // Lấy đánh giá tệ nhất của một tour
  export const getWorstReviewForTour = async (tourId) => {
    const response = await axiosInstance.get(
      `${apiBaseUrl}/tour/${tourId}/worst-review`
    );
    return response.data;
  };
  
  // Kiểm tra xem user đã đánh giá tour hay chưa
  export const hasUserReviewedTour = async (userId, tourId) => {
    const response = await axiosInstance.get(`${apiBaseUrl}/user-reviewed-tour`, {
      params: { userId, tourId },
    });
    return response.data;
  };
  
  // Kiểm tra rating của tour có nằm trong khoảng cho trước hay không
  export const isRatingInRange = async (tourId, minRating, maxRating) => {
    const response = await axiosInstance.get(
      `${apiBaseUrl}/tour/${tourId}/rating-in-range`,
      { params: { minRating, maxRating } }
    );
    return response.data;
  };