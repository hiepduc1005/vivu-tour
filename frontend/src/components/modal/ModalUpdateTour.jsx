import React, { useEffect, useState } from 'react';
import './ModalUpdateTour.css'; // CSS cho modal
import dayjs from 'dayjs';
import { uploadSingleImage } from '../../service/TourApi';

const ModalUpdateTour = ({ isOpen, onClose, tourData, onUpdate,locations}) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    startLocationId: '',
    endLocationId: '',
    availableSlots: '',
    pricePerPerson: '',
    startDate: '',
    endDate: '',
    schedule: [],
    images: [], // Mảng URL hình ảnh
  });

  const [scheduleInputs, setScheduleInputs] = useState([]);
  const [imageFiles, setImageFiles] = useState([]); // Mảng lưu các file hình ảnh để preview

  useEffect(() => {
    if (tourData) {
      setFormData({
        ...tourData,
        startLocationId:tourData.startLocation.id,
        endLocationId:tourData.endLocation.id,
        startDate: tourData.startDate.split('T')[0],
        endDate: tourData.endDate.split('T')[0],
        schedule: tourData.schedules,
        images: tourData.images

    });
      setScheduleInputs(tourData.schedules || []);
      setImageFiles(tourData.images || []); // Nếu cần load sẵn hình ảnh từ server
    }
  }, [tourData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScheduleChange = (index, e) => {
    const { name, value } = e.target;
    setScheduleInputs((prev) =>
      prev.map((input, i) =>
        i === index ? { ...input, [name]: value } : input
      )
    );

  };

  const handleImageFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFiles((prev) =>
        prev.map((image, i) => (i === index ? file : image))
      );


    }
  };

  const addScheduleInput = () => {
    setScheduleInputs((prev) => [...prev, { day: '', activity: '' }]);
  };

  const removeScheduleInput = (index) => {
    setScheduleInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const addImageInput = () => {
    setImageFiles((prev) => [...prev, null]); // Thêm một vị trí cho hình ảnh mới
  
};

  const removeImageInput = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedStartDate = dayjs(formData.startDate).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
    const formattedEndDate = dayjs(formData.endDate).endOf('day').format('YYYY-MM-DDTHH:mm:ss');
  
    const scheduleUpdate = scheduleInputs
      .filter(scheduleItem => scheduleItem.id) // Chỉ giữ các schedule đã có id
      .map(({ tourId, ...rest }) => ({
        ...rest,
        day: +rest.day, // Chuyển đổi day sang số
      }));
  
    const scheduleCreate = scheduleInputs
      .filter(scheduleItem => !scheduleItem.id) // Chỉ giữ các schedule mới
      .map(({ tourId, id, ...rest }) => ({
        ...rest,
        day: +rest.day, // Chuyển đổi day sang số
      }));
  
    try {
      // Upload tất cả hình ảnh trước
      const updatedImages = await Promise.all(
        imageFiles.map(async (file) => {
          if (file instanceof File) {
            return await uploadSingleImage(file); // Upload file mới
          }
          return file; // Giữ nguyên file cũ (URL)
        })
      );
  
      // Gọi hàm onUpdate sau khi upload xong
      onUpdate({
        ...formData,
        images: updatedImages, // Sử dụng danh sách hình ảnh đã upload
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        scheduleUpdate,
        scheduleCreate,
      });
  
      onClose();
    } catch (error) {
      console.error('Lỗi khi upload hình ảnh hoặc cập nhật dữ liệu:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal"onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
            <h3>Cập Nhật Tour</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>ID</label>
                <input disabled type="text" name="id" value={formData.id} readOnly />
            </div>
            <div className="form-group">
                <label>Tên Tour</label>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label>Mô Tả</label>
                <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
            <label>Giá mỗi người</label>
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
                <label>Thời gian bắt đầu</label>
                <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label>Thời gian kết thúc</label>
                <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label>Địa điểm bắt đầu</label>
                <select
                name="startLocationId"
                value={formData.startLocationId}
                onChange={handleChange}
                required
                >
                <option value="">Chọn địa điểm bắt đầu</option>
                {locations?.map((location) => (
                    <option key={location.id} value={location.id}>
                    {location.name}
                    </option>
                ))}
                </select>
            </div>
            <div className="form-group">
                <label>Địa điểm kết thúc</label>
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
                <label>Số chỗ còn lại</label>
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
                <h4>Lịch Trình</h4>
                {scheduleInputs.map((input, index) => (
                    <div key={index} className="schedule-row">
                        <input
                            type="number"
                            name="day"
                            placeholder="Ngày"
                            value={input.day}
                            onChange={(e) => handleScheduleChange(index, e)}
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
            </div>

            <div className="form-group">
                <h4>Hình Ảnh</h4>
                {imageFiles.map((image, index) => (
                    <div key={index} className="image-row">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange(index, e)}
                    />
                    {image && (
                        <img
                        src={
                            image instanceof File
                            ? URL.createObjectURL(image) // Tạo URL từ file
                            : `http://localhost:8080${image}` // Hoặc dùng URL đã có
                        }
                        alt={`Preview ${index + 1}`}
                        className="image-preview"
                        />
                    )}
                    <button type="button" onClick={() => removeImageInput(index)}>
                        Xóa
                    </button>
                    </div>
                ))}
                <button type="button" onClick={addImageInput}>
                    Thêm Hình Ảnh
                </button>
            </div>

            <div className="modal-actions">
                <button type="submit">Cập Nhật</button>
                <button type="button" onClick={onClose}>
                Hủy
                </button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateTour;
