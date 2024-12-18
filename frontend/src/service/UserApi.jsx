import axios  from "../ultils/axiosCustomize";

const apiBaseUrl = "api/v1/users"

export const getUsers = async () => {
    try {
        const response = await axios.get(`/${apiBaseUrl}`);
        return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Xem thông tin người dùng theo ID
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`/${apiBaseUrl}/${id}`);
        return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

export const getUserRoleByToken = async (token) => {
    try {
        const response = await axios.get(`/${apiBaseUrl}/role`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

export const getUserToday = async (token) => {
    try {
        const response = await axios.get(`/${apiBaseUrl}/today`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

export const getUserByToken = async (token) => {
    try {
        const response = await axios.get(`/${apiBaseUrl}/authenticated`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};


// Đăng ký người dùng mới
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`/${apiBaseUrl}/signup`, userData);
        return response.data; // Trả về dữ liệu người dùng vừa tạo
    } catch (error) {
        console.error("Error registering user:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Đăng nhập
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`/${apiBaseUrl}/authenticate`, userData, {
            headers: {
                'Content-Type': 'application/json' // Chỉ định loại nội dung là JSON
            }
        });
        return response.data; // Giả sử bạn muốn trả về dữ liệu từ server
    } catch (error) {
        throw error; // Ném lại lỗi để xử lý ở component
    }
};
// Cập nhật thông tin người dùng
export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`/${apiBaseUrl}/${id}`, userData);
        return response.data; // Trả về dữ liệu người dùng đã cập nhật
    } catch (error) {
        console.error("Error updating user:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Xóa người dùng
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`/${apiBaseUrl}/${id}`);
        return response; // Trả về dữ liệu kết quả xóa
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};