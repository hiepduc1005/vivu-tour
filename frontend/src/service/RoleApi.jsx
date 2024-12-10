import axiosInstance from "../ultils/axiosCustomize";

const apiBaseUrl = "api/v1/role"; // Đường dẫn tới API


export const getRoles = async () => {
    try {
        const response = await axiosInstance.get(`/${apiBaseUrl}`);
        return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};
