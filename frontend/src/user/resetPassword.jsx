import React, { useState } from 'react';
import axios from 'axios';
import "./css/resetPassword.css"


function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Mật khẩu và mật khẩu xác nhận không trùng khớp.');
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    try {
      const response = await axios.post('http://localhost:5000/api/users/auth/resetPassword', {
        password: password,
      }, {
        params: {
          token: token 
        }
      });

      if (response.data.success) {
        setMessage('Mật khẩu đã được cập nhật thành công!');
        window.location.href = '/';
      } else {
        setMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Đổi Mật Khẩu</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label>Nhập mật khẩu mới:</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Xác nhận mật khẩu mới:</label>
          <input
            className="form-control"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Xác Nhận</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ResetPassword;
