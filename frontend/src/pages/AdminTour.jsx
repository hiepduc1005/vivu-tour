import React, { useEffect, useState } from 'react';
import { createTour, getTours, updateTour, deleteTour } from '../service/TourApi'; // Import các hàm gọi API
import '../css/AdminTour.css'; // Import CSS

const AdminTour = () => {
  const [tours, setTours] = useState([]);
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
    images: [], // Lưu danh sách hình ảnh
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const locations = ["Hà Nội", "TP.HCM", "Đà Nẵng", "Nha Trang", "Phú Quốc", "Hạ Long"];

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) })); // Chuyển FileList thành Array
  };

  const handleCreateTour = async (e) => {
    e.preventDefault();
    try {
      await createTour(formData); // Gọi API tạo tour
      resetForm();
      await refreshTours();
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo tour. Vui lòng thử lại.');
    }
  };

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
      images: [],
    });
    setEditingId(null);
  };

  const refreshTours = async () => {
    const tourList = await getTours();
    setTours(tourList);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tour này không?')) {
      try {
        await deleteTour(id);
        setTours(tours.filter((tour) => tour.id !== id));
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
      
      {/* Form tạo tour mới */}
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
          <select name="location_start" value={formData.location_start} onChange={handleChange} required>
            <option value="">Chọn địa điểm bắt đầu</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <select name="location" value={formData.location} onChange={handleChange} required>
            <option value="">Chọn địa điểm</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
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
          <input type="file" name="images" multiple onChange={handleFileChange} required />
        </div>
        <button type="submit">Tạo Tour</button>
      </form>
    </div>
  );
};

export default AdminTour;
