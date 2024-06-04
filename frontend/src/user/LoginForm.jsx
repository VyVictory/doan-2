import React, { useState } from 'react';
import axios from 'axios';
import styles from './css/LoginForm.module.css'; // Import CSS module
import axioslogin from '../function/user/axioslogin'
import CloseButton from 'react-bootstrap/CloseButton';
function LoginForm({ onClose, onR }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginfunction, message } = axioslogin(); // Corrected from axioslogin to Authmodule

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    await loginfunction(formData);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} style={{ width: '100%' }}>
        <div className='d-flex justify-content-center'>
          <h2 className='sans-serif' style={{ position: 'absolute', }}>Đăng Nhập</h2>
        </div>
        <div className='d-flex justify-content-end'>
          <div>
            <CloseButton aria-label="Hide"
              onClick={onClose} />
          </div>
        </div>

        <div className='' style={{ margin: "10px" }}>
          <form onSubmit={handleSubmit} className='p-1'>

            <div className='pd d-flex flex-column align-items-start mt-3'>
              <label >Địa Chỉ Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label  style={{}} className='mt-2'>Mật Khẩu:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='p-2 d-flex flex-column mt-3'>
              <button type="submit" className="btn btn-primary btn-block">Đăng Nhập</button>


              <div className='d-flex flex-row items-center mt-1 justify-center'>
                <div className='text-sm mr-1 text-gray-400'>
                  chưa có cài choản
                </div>
                <a href='#' onClick={onR}>Đăng Ký Mới</a>

              </div>
              {message && <p className='text-red-600'>{message}</p>}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;