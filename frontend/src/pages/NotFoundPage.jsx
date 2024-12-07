import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NotFoundPage.css'
const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Xin lỗi, trang bạn tìm kiếm không tồn tại.</p>
      <Link to="/">Quay về trang chủ</Link>
    </div>
  );
};

export default NotFoundPage;
