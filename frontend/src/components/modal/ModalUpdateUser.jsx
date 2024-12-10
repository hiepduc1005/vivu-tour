import React, { useState, useEffect } from 'react';
import './ModalUpdateUser.css';
import { getRoles } from '../../service/RoleApi';

const ModalUpdateUser = ({ show, userData, handleUpdate, handleClose, loading }) => {
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    phone: '',
    roleIds: '',
  });
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const rolesData = await getRoles(); // Giả sử getRoles trả về dữ liệu
      if (rolesData) {
        setRoles(rolesData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Khi modal mở, sẽ cập nhật thông tin người dùng từ props
  useEffect(() => {
    if (userData) {
        const roleIdArray = userData.roleResponses.map(role => role.id);
      setUpdatedUser({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        roleIds: roleIdArray || [], 
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === 'roleIds') {
      value = [value]; // Chuyển thành mảng với một phần tử
    }
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedUser); // Gửi thông tin người dùng mới lên cha để xử lý
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={updatedUser.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select
              name="roleIds" // Đổi từ 'status' thành 'roleIds'
              value={updatedUser.roleIds}
              onChange={handleInputChange}
              required
            >
              {roles?.map((role) => (
                <option key={role.id} value={role.id}>{role.name}</option> // Thêm return trong map
              ))}
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateUser;
