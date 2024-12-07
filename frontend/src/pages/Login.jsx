import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Nếu bạn sử dụng react-router để điều hướng
import { loginUser, getUserByToken } from '../service/UserApi'; // Import hàm gọi API
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng sau khi đăng nhập thành công

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    setError(''); // Reset lỗi
    try {
      const userData = { email, password }; // Tạo đối tượng chứa email và password
      const res = await loginUser(userData); // Gọi hàm loginUser từ UserApi
      if (res) {
        const data = await getUserByToken(res.token);
        if (data.roleResponses.some((role) => role.name === 'USER')) {
          navigate('/'); // Điều hướng đến trang chính sau khi đăng nhập thành công
        } else if (data.roleResponses.some((role) => role.name === 'ADMIN')) {
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
      <h2 className="login-title">Đăng nhập</h2>
      {error && <p className="login-error">{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="login-input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        <input
          className="login-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Mật khẩu"
        />
        <div className="login-links">
          <a className="login-link" href="#">
            Quên mật khẩu
          </a>
          <a className="login-link" href="/signup">
            Bạn chưa có tài khoản?
          </a>
        </div>
        <button className="login-button" type="submit">
          Đăng nhập
        </button>
      </form>
      <hr className="login-divider" />
      <div className="social-login">
        <button className="social-button facebook">
          <i className="fa-brands fa-facebook-f"></i>Facebook
        </button>
        <button className="social-button google">
          <i className="fa-brands fa-google"></i>Google
        </button>
      </div>
    </div>
  );
};

export default Login;
