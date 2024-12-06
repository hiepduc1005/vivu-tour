import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs'; // Import Day.js
import { createTour, getTours, deleteTour } from '../service/TourApi'; 
import '../css/AdminTour.css'; 
import { getLocations } from '../service/LocationApi';
import ListTours from '../components/ListTours';

const AdminTour = () => {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startLocationId: '',
    endLocationId: '',
    availableSlots: '',
    pricePerPerson: '',
    startDate: '',
    endDate: '',
    images: [],
    schedule: [], // Lưu danh sách lịch trình
  });
  const [scheduleInputs, setScheduleInputs] = useState([
    { day: '', activity: '' },
  ]); // Nhiều input lịch trình
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const listLocation = await getLocations(token);
        if (listLocation) setLocations(listLocation);
      } catch (err) {
        setLoading(false);
        setError('Không thể lấy danh sách địa điểm.');
      }
      setLoading(false);
    };

    fetchLocations();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  // Thêm dòng input cho lịch trình
  const addScheduleInput = () => {
    setScheduleInputs((prev) => [...prev, { day: '', activity: '' }]);
  };

  // Xóa dòng input lịch trình
  const removeScheduleInput = (index) => {
    setScheduleInputs((prev) => prev.filter((_, i) => i !== index));
  };

  // Cập nhật giá trị của các trường lịch trình
  const handleScheduleChange = (index, e) => {
    const { name, value } = e.target;
    setScheduleInputs((prev) =>
      prev.map((input, i) =>
        i === index ? { ...input, [name]: value } : input
      )
    );
  };

  const handleCreateTour = async (e) => {
    e.preventDefault();

    try {
      // Định dạng ngày sử dụng Day.js
      const formattedStartDate = dayjs(formData.startDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
      const formattedEndDate = dayjs(formData.endDate).endOf('day').format('YYYY-MM-DDTHH:mm:ss');

      // Gửi dữ liệu đến backend
      await createTour({ 
        ...formData, 
        startDate: formattedStartDate, 
        endDate: formattedEndDate,
        schedule: scheduleInputs, // Gửi lịch trình động
      });

      resetForm();
      await refreshTours();
    } catch (err) {
      setError('Có lỗi xảy ra khi tạo tour.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      startLocationId: '',
      endLocationId: '',
      availableSlots: '',
      pricePerPerson: '',
      startDate: '',
      endDate: '',
      images: [],
      schedule: [],
    });
    setScheduleInputs([{ day: '', activity: '' }]);
  };

  const refreshTours = async () => {
    try {
      await getTours();
    } catch {
      setError('Không thể làm mới danh sách tour.');
    }
  };

  return (
    <>
      <div className="admintour-container">
        <h2>Quản Lý Tour</h2>
        {loading && <p>Đang tải...</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleCreateTour}>
          <h3>Tạo Tour Mới</h3>
          {/* Thông tin cơ bản */}
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tên tour"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="pricePerPerson"
              value={formData.pricePerPerson}
              onChange={handleChange}
              placeholder="Giá mỗi người"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select
              name="startLocationId"
              value={formData.startLocationId}
              onChange={handleChange}
              required
            >
              <option value="">Chọn địa điểm bắt đầu</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select
              name="endLocationId"
              value={formData.endLocationId}
              onChange={handleChange}
              required
            >
              <option value="">Chọn địa điểm kết thúc</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="number"
              name="availableSlots"
              value={formData.availableSlots}
              onChange={handleChange}
              placeholder="Số chỗ còn lại"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
            />
          </div>

          {/* Thêm lịch trình */}
          <h3>Thêm Lịch Trình</h3>
          {scheduleInputs.map((input, index) => (
            <div key={index} className="schedule-row">
              <input
                type="number"
                name="day"
                placeholder="Ngày"
                value={input.day}
                onChange={(e) => handleScheduleChange(index, e)}
                min={1}
                max={30}
                required
              />
              <textarea
                name="activity"
                placeholder="Hoạt động"
                value={input.activity}
                onChange={(e) => handleScheduleChange(index, e)}
                required
              />
              <button type="button" onClick={() => removeScheduleInput(index)}>
                Xóa
              </button>
            </div>
          ))}
          <button type="button" onClick={addScheduleInput}>
            Thêm Lịch Trình
          </button>

          <button type="submit">Tạo Tour</button>
        </form>
      </div>
      <ListTours locations={locations}/>
    </>
  );
};

export default AdminTour;
