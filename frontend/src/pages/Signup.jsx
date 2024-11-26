// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Nếu bạn sử dụng react-router để điều hướng
import { registerUser } from '../service/UserApi'; // Import hàm gọi API
import "../css/Signup.css"
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng sau khi đăng ký thành công

  const handleSignup = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    setError(''); // Reset lỗi
    try {
      const userData = { name, email, password };
      await registerUser(userData); // Gọi hàm signupUser từ userApi
      navigate('/signin'); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
    } catch (err) {
      setError('Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.');
      console.error(err); // Ghi lại lỗi trong console
    }
  };

  return (
    <div className="signup-container">
      <h2 className='title-name'>Đăng Ký</h2>
      {error && <p className="error">{error}</p>}
        <div className='formGroup'>
          <label htmlFor="name">Họ Tên:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='formGroup'>
          <label htmlFor="password">Mật Khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleSignup} className='submit-signup' type="submit">Đăng Ký</button>
    </div>
  );
};

export default Signup;
