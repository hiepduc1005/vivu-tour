import React, { useEffect, useState } from 'react';
import './ModalBooking.css'; // Import file CSS để thiết kế modal

const ModalBooking = ({user,onClose}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [additionalRequest, setAdditionalRequest] = useState('');

  useEffect(() => {
    setFullName(user?.name || '');
    setPhone(user?.phone || '');
    setEmail(user?.email || '');
  },[user])

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi thông tin khi form được submit
    console.log('Booking information:', { fullName, phone, email, additionalRequest });
  };

  return (
    <div className="modal-container">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={() => onClose()}>&times;</button>
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
    </div>
  );
};

export default ModalBooking;
