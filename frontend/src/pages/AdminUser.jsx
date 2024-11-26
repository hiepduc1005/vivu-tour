// src/components/AdminUser.js
import React, { useEffect, useState } from 'react';
import { getUsers } from '../service/UserApi'; // Import hàm getUsers
import '../css/AdminUser.css'; // Nhập tệp CSS
import { useNavigate } from 'react-router-dom';

const AdminUser = () => {
    const [users, setUsers] = useState([]); // State để lưu danh sách người dùng
    const [loading, setLoading] = useState(true); // State để quản lý trạng thái tải
    const [error, setError] = useState(''); // State để lưu lỗi nếu có

    const user = JSON.parse(localStorage.getItem('user'));
    const naviage = useNavigate();

    useEffect(() => {
      if(user.role !== "ADMIN"){
        naviage("/");
      }

        const fetchUsers = async () => {
            try {
                const userList = await getUsers(); // Gọi hàm getUsers để lấy danh sách người dùng
                setUsers(userList); // Lưu danh sách người dùng vào state
            } catch (err) {
                setError('Không thể lấy danh sách người dùng.'); // Cập nhật lỗi nếu có
            } finally {
                setLoading(false); // Đặt trạng thái tải là false khi hoàn thành
            }
        };

        fetchUsers(); // Gọi hàm lấy người dùng
    }, []); // Chỉ gọi một lần khi component được mount

    return (
        <div className="admin-user-container"> {/* Sử dụng class CSS */}
            <h2>Danh Sách Người Dùng</h2>
            {loading && <p>Đang tải...</p>} {/* Hiển thị thông báo đang tải */}
            {error && <p className="error">{error}</p>} {/* Hiển thị lỗi nếu có */}
            {!loading && !error && (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name} - {user.email}</li> // Hiển thị tên và email người dùng
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminUser;
