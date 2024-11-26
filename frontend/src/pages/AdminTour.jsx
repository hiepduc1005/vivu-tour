// src/components/AdminTour.js
import React, { useEffect, useState } from 'react';
import { createTour, getTours, updateTour, deleteTour } from '../service/TourApi'; // Import các hàm gọi API
import '../css/AdminTour.css'; // Import CSS

const AdminTour = () => {
  const [tours, setTours] = useState([]); // State để lưu danh sách tour
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    prices: '',
    start_date: '',
    end_date: '',
    location_start: '',
    location: '',
    duration: '',
    available_slots: '',
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái tải
  const [error, setError] = useState(''); // State để lưu lỗi nếu có

  const locations = [
    "Hà Nội",
    "TP.HCM",
    "Đà Nẵng",
    "Nha Trang",
    "Phú Quốc",
    "Hạ Long"
    // Thêm các địa điểm khác vào đây
  ];

  // Lấy danh sách tours khi component được mount
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const tourList = await getTours();
        setTours(tourList);
      } catch (err) {
        setError('Không thể lấy danh sách tour.');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Xử lý thay đổi input trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi file hình ảnh
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // Xử lý thêm tour mới
  const handleCreateTour = async (e) => {
    e.preventDefault();
    try {
      await createTour(formData); // Gọi hàm tạo tour mới
      resetForm();
      await refreshTours(); // Cập nhật danh sách tours
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo tour. Vui lòng thử lại.');
    }
  };

  // Xử lý cập nhật tour
  const handleUpdateTour = async (e) => {
    e.preventDefault();
    try {
      await updateTour(editingId, formData); // Gọi hàm cập nhật tour
      resetForm();
      await refreshTours(); // Cập nhật danh sách tours
    } catch (err) {
      setError('Có lỗi xảy ra khi cập nhật tour. Vui lòng thử lại.');
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      prices: '',
      start_date: '',
      end_date: '',
      location_start: '',
      location: '',
      duration: '',
      available_slots: '',
      image: null,
    });
    setEditingId(null); // Reset ID khi thêm mới hoặc cập nhật thành công
  };

  // Refresh tour list
  const refreshTours = async () => {
    const tourList = await getTours();
    setTours(tourList);
  };

  // Xóa tour
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tour này không?')) {
      try {
        await deleteTour(id); // Gọi hàm xóa tour
        setTours(tours.filter(tour => tour.id !== id)); // Cập nhật danh sách tours
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa tour.');
      }
    }
  };

  return (
    <div className="admintour-container">
      <h2>Quản Lý Tour</h2>
      {loading && <p>Đang tải...</p>}
      {error && <p className="error">{error}</p>}
      
      {/* Biểu mẫu tạo tour mới */}
      <form onSubmit={handleCreateTour}>
        <h3>Tạo Tour Mới</h3>
        <div className="form-group">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Tên tour" required />
        </div>
        <div className="form-group">
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Mô tả" required />
        </div>
        <div className="form-group">
          <input type="number" name="prices" value={formData.prices} onChange={handleChange} placeholder="Giá" required />
        </div>
        <div className="form-group">
          <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="location_start">Địa điểm bắt đầu:</label>
          <select name="location_start" id="location_start" value={formData.location_start} onChange={handleChange} required>
            <option value="">Chọn địa điểm bắt đầu</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Địa điểm:</label>
          <select name="location" id="location" value={formData.location} onChange={handleChange} required>
            <option value="">Chọn địa điểm</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Thời gian (ngày)" required />
        </div>
        <div className="form-group">
          <input type="number" name="available_slots" value={formData.available_slots} onChange={handleChange} placeholder="Số chỗ còn lại" required />
        </div>
        <div className="form-group">
          <input type="file" name="image" onChange={handleFileChange} required />
        </div>
        <button type="submit">Tạo Tour</button>
      </form>

      {/* Biểu mẫu cập nhật tour */}
      {editingId && (
        <form onSubmit={handleUpdateTour}>
          <h3>Cập Nhật Tour</h3>
          <div className="form-group">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Tên tour" required />
          </div>
          <div className="form-group">
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Mô tả" required />
          </div>
          <div className="form-group">
            <input type="number" name="prices" value={formData.prices} onChange={handleChange} placeholder="Giá" required />
          </div>
          <div className="form-group">
            <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="location_start">Địa điểm bắt đầu:</label>
            <select name="location_start" id="location_start" value={formData.location_start} onChange={handleChange} required>
              <option value="">Chọn địa điểm bắt đầu</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="location">Địa điểm:</label>
            <select name="location" id="location" value={formData.location} onChange={handleChange} required>
              <option value="">Chọn địa điểm</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Thời gian (ngày)" required />
          </div>
          <div className="form-group">
            <input type="number" name="available_slots" value={formData.available_slots} onChange={handleChange} placeholder="Số chỗ còn lại" required />
          </div>
          <div className="form-group">
            <input type="file" name="image" onChange={handleFileChange} />
          </div>
          <button type="submit">Cập Nhật Tour</button>
        </form>
      )}

      {/* Danh sách tour */}
      <h3>Danh Sách Tour</h3>
      <table>
        <thead>
          <tr>
            <th>Tên Tour</th>
            <th>Mô Tả</th>
            <th>Giá</th>
            <th>Ngày Bắt Đầu</th>
            <th>Ngày Kết Thúc</th>
            <th>Địa Điểm</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.id}>
              <td>{tour.name}</td>
              <td>{tour.description}</td>
              <td>{tour.prices}</td>
              <td>{tour.start_date}</td>
              <td>{tour.end_date}</td>
              <td>{tour.location}</td>
              <td>
                <button onClick={() => {
                  setEditingId(tour.id);
                  setFormData(tour); // Cập nhật formData với thông tin tour để chỉnh sửa
                }}>Sửa</button>
                <button onClick={() => handleDelete(tour.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTour;
