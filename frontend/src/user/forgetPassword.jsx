import React, { useState } from 'react';
import axios from 'axios';
import styles from './css/LoginForm.module.css'; // Import CSS module
import CloseButton from 'react-bootstrap/CloseButton';

function ForgetPassword({ onClose }) {
  const [email, setEmail] = useState(''); // Khởi tạo email rỗng
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kiểm tra xem email đã được nhập vào hay chưa
      if (!email) {
        setMessage('Vui lòng nhập địa chỉ email');
        return;
      }

      console.log('Email:', email); // In ra nội dung của biến email

      // Gửi yêu cầu đặt lại mật khẩu với email đã nhập
      const response = await axios.get(`http://localhost:5000/api/users/auth/forgotpassword?email=${email}`, {
      });

      setMessage('Email khôi phục mật khẩu đã được gửi!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Set background color with opacity
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className={styles.modal} style={{ backgroundColor: 'white', opacity: '1' }}>
        <div className={styles.modalContent} style={{ width: '100%' }}>
          <div className='d-flex justify-content-center'>
            <h2 className='sans-serif' style={{ position: 'absolute', }}>Quên mật khẩu</h2>
          </div>
          <div className='d-flex justify-content-end'>
            <div>
              <CloseButton aria-label="Hide" onClick={onClose} />
            </div>
          </div>
          <div className='' style={{ margin: "10px" }}>
            <form onSubmit={handleSubmit} className='p-1'>

              <div className='pd d-flex flex-column align-items-start mt-3'>
                <label>Địa Chỉ Email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='pb-2 d-flex flex-column mt-2'>
                <button type="submit" className="btn btn-primary btn-block">Gửi yêu cầu</button>
                {message && <p className='text-red-600' style={{ marginBottom: '-10px' }}>{message}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
