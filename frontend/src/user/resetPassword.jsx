import React, { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu reset mật khẩu với password và token đã nhập
      const response = await axios.post('http://localhost:5000/api/users/auth/resetPassword', {
        password: password,
        token: token
      });

      // Kiểm tra trạng thái thành công và hiển thị thông báo tương ứng
      if (response.data.success) {
        setMessage('Mật khẩu đã được cập nhật thành công!');
      } else {
        setMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  return (
    <div>
      <h2>Reset Mật Khẩu</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nhập mật khẩu mới:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Nhập mã token:</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <button type="submit">Xác Nhận</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
