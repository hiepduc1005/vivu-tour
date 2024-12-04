// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Nếu bạn sử dụng react-router để điều hướng
import { loginUser,getUserRoleByToken,getUserByToken } from '../service/UserApi'; // Import hàm gọi API
import '../css/Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng sau khi đăng nhập thành công

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    setError(''); // Reset lỗi
    try {
      // Tạo đối tượng chứa email và password
      const userData = {
        email,      // Sử dụng shorthand property
        password
      };
      
      const res = await loginUser(userData); // Gọi hàm loginUser từ userApi
      if(res){
        const data = await getUserByToken(res.token);
        if (data.roleResponses.some(role => role.name === "USER")) {
          navigate('/'); // Điều hướng đến trang chính sau khi đăng nhập thành công
        } else if (data.roleResponses.some(role => role.name === "ADMIN")) {
            navigate('/admin'); // Điều hướng đến trang admin nếu người dùng là ADMIN
        }
        localStorage.setItem('user', JSON.stringify(data));

      }
      localStorage.setItem('token', res.token);

     
    } catch (err) {
      setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
      console.error(err); // Ghi lại lỗi trong console
    }
  };

  return (
    <div className="login-container">
      <h2 className='title-name'>Đăng Nhập</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button className='submit-login' type="submit">Đăng Nhập</button>
      </form>
    </div>
  );
};

export default Login;
