import React, { useState } from 'react';
import axios from 'axios';
import styles from './css/Register.module.css';
import axioslogin from '../module/axioslogin'

function RegistrationPage({ onClose, onL }) {
  //form data************************************************
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('male');
  const [phone, setPhone] = useState('');
  //form data************************************************

  const { registerfunction, message } = axioslogin(); // Corrected from axioslogin to Authmodule
  const [messageregister, setMessageregister] = useState('');
  const [errors, setErrors] = useState({}); // State to hold form validation errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = ({
      username: username, // tên đăng nhập
      fullname: fullName, // Sử dụng biến fullName thay vì "fullName"
      email: email, // Sử dụng biến email thay vì "email@email.com"
      password: password, // Sử dụng biến password thay vì "password"
      phone: +phone,// Sử dụng chuỗi số cho số điện thoại , ko trung 
      gender: gender,
    });
    await registerfunction(formData);
  };


  return (
    <div className={styles.modal}>
      <div className="container p-2 pb-0">
        <div style={{ paddingBottom: "10px" }} className='d-flex justify-content-between'>
          <button  onClick={(e) => { onClose(); onL(); }} className='btn btn-primary ' style={{}}>Đăng Nhập</button>
          <button className='btn btn-danger d-flex' onClick={onClose} style={{}} >X</button>
        </div>
        <div className={`${styles.content}row justify-content-center`}>
          <div className={`${styles.content}col-md-6 `}>
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center p-2">Sign Up</h3>
                <div>
                  <div className="form-group mb-2">
                    <label htmlFor="fullName">Họ Và Tên:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Enter full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="UserName">Tên Đăng Nhập:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter user name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="email">Địa Chỉ Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="password">Mật Khẩu:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="confirmPassword">Nhập Lại Mật Khẩu:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="phone">Số Điện Thoại:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Giới Tính:</label>
                    <select
                      className="form-control"
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  <div className='d-flex flex-column p-3 pb-0'>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block">Đăng Ký</button>
                  </div>
                  <p>{message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
