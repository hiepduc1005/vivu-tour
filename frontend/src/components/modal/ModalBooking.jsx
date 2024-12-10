import React, { useEffect, useState } from 'react';
import './ModalBooking.css';
import { createBooking } from '../../service/BookingApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'; // Import biểu tượng tích

const ModalBooking = ({dateSelected, quantity, tour, user, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [additionalRequest, setAdditionalRequest] = useState('');
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [bookingId,setBookingId] = useState();

  useEffect(() => {
    setFullName(user?.name || '');
    setPhone(user?.phone || '');
    setEmail(user?.email || '');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataSubmit = {
      userId : user ? user.id : null,
      email,
      phone,
      username: fullName,
      tourId: tour.id,
      numPeople: quantity,
      additionalRequest,
      bookingDate: dateSelected
    };

    try {
      const response = await createBooking(dataSubmit);
      if (response && response.data) {
        setIsBookingSuccess(true);
        setBookingId(response.data.id);
      }
    } catch (error) {
      console.error('Đặt booking thất bại:', error);
    }
  };

  return (
    <div className="modal-booking-container">
      {!isBookingSuccess ? (
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>&times;</button>
          <h2 className="modal-title">Yêu cầu đặt</h2>
          <p className="modal-subtitle">Quý khách vui lòng nhập thông tin liên hệ bên dưới</p>
          <form className="booking-form" onSubmit={handleSubmit}>
            <label className="form-label">Họ & Tên *</label>
            <input
              type="text"
              className="form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <label className="form-label">Điện thoại *</label>
            <input
              type="tel"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label className="form-label">Email (nếu có)</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label">Yêu cầu khác</label>
            <textarea
              className="form-textarea"
              value={additionalRequest}
              onChange={(e) => setAdditionalRequest(e.target.value)}
              placeholder="VD: ăn chay, bị dị ứng, người lớn tuổi..."
            />
            <button type="submit" className="submit-button">Gửi yêu cầu</button>
          </form>
          <p className="modal-footer">iVIVU sẽ liên hệ tư vấn ngay trong 15 phút</p>
        </div>
      ) : (
        <div className="success-modal">
          <FontAwesomeIcon size='4x' icon={faCheckCircle} className="success-icon" />
          <h2 className="success-title">Gửi yêu cầu thành công</h2>
          <p className="success-message">
            Mã đặt tour của bạn là: <strong>{bookingId}</strong>
          </p>
          <p>iVIVU sẽ liên hệ lại quý khách trong thời gian sớm nhất. Xin cảm ơn.</p>
          <button className="close-button-success" onClick={onClose}>OK</button>
        </div>
      )}
    </div>
  );
};

export default ModalBooking;
