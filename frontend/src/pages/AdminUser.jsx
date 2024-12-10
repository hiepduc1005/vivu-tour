import React, { useEffect, useState } from 'react';
import '../css/AdminUser.css'; // Tạo file CSS tương ứng
import { deleteUser, getUsers, updateUser } from '../service/UserApi'; // API cho user
import ModalUpdateUser from '../components/modal/ModalUpdateUser'; // Modal cập nhật user
import { Link } from 'react-router-dom';
import CreateUserForm from '../components/CreateUserForm';

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // User được chọn để cập nhật
  const [showModal, setShowModal] = useState(false); // Hiển thị modal
  const [loading, setLoading] = useState(false); // Trạng thái loading khi cập nhật

  // Lấy danh sách user từ API
  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const userData = await getUsers(token);
      if (userData) {
        setUsers(userData);
        setFilteredUsers(userData); // Hiển thị tất cả dữ liệu ban đầu
      }
    } catch (error) {
      window.location = window.location.origin + '/signin';
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm tìm kiếm
  const handleSearch = () => {
    let filtered = users;

    if (searchName) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchEmail) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  // Hàm mở modal và tải thông tin user
  const handleEdit = (user) => {
    setSelectedUser({ ...user }); // Sao chép dữ liệu user vào state để chỉnh sửa
    setShowModal(true); // Hiển thị modal
  };

  // Hàm xóa user
  console.log(filteredUsers);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setLoading(true);
      try {
        const response = await deleteUser(id);
        console.log(response)
        if (response && response.status === 200) {
          setFilteredUsers((prev) => prev.filter((user) => user.id !== id));
          console.log(filteredUsers);
          console.log('test');
          alert('User deleted successfully!');
        }
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Hàm xử lý cập nhật user
  const handleUpdate = async (updatedUser) => {
    setLoading(true);

    try {
      const data = {
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        roleIds: updatedUser.roleIds,
      };
      const response = await updateUser(selectedUser.id, data);
      alert('User updated successfully!');
      setFilteredUsers((prev) =>
        prev.map((user) => (user.id === response.id ? response : user))
      );
      setShowModal(false); // Đóng modal
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="admin-user-container">
      <h1 className="admin-user-title">Admin User</h1>

      <div className="back-to-admin">
        <Link to="/admin" className="btn btn-back">
          &larr; Back to Admin Dashboard
        </Link>
      </div>

       <CreateUserForm setUsers={setUsers} fetchUsers={fetchUsers}></CreateUserForm>
      {/* Bộ lọc */}
      <div className="filter-container">
        <label>
          Name:
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by name"
          />
        </label>

        <label>
          Email:
          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Search by email"
          />
        </label>

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Bảng dữ liệu */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.roleResponses.map((role) => role.name)}</td>
              <td>{user.createdAt}</td>
              <td>{user.updatedAt}</td>

              <td>
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hiển thị Modal */}
      {showModal ? 
        <ModalUpdateUser
            userData={selectedUser}
            handleUpdate={handleUpdate}
            handleClose={() => setShowModal(false)}
            loading={loading}
        />

        : ""
      }
    </div>
  );
};

export default AdminUser;
