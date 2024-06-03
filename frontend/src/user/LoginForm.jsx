import React, { useState } from 'react';
import axios from 'axios';
import styles from './css/LoginForm.module.css'; // Import CSS module
import axioslogin from '../function/user/axioslogin'

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
          <h2 style={{ position: 'absolute', }}>Đăng Nhập</h2>
        </div>
        <div className='d-flex justify-content-end'>
          <button className='btn btn-danger d-flex' onClick={onClose}>X</button>
        </div>
        <div className='' style={{ margin: "10px" }}>
          <form onSubmit={handleSubmit} className='p-1'>
            <div className='pd d-flex flex-column align-items-start'>
              <label style={{}}>Email:</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label style={{}} className='mt-1'>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='p-2 d-flex flex-column'>
              <button type="submit" className="btn btn-primary btn-block">Đăng Nhập</button>
              Hoặc
              <a href='#' onClick={onR}>Đăng Ký Mới</a>
            </div>
            {message && <p>{message}</p>}

          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;