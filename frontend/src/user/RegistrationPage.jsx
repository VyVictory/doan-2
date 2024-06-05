import React, { useState } from 'react';
import axios from 'axios';
import styles from './css/Register.module.css';
import axioslogin from '../module/axioslogin';
import CloseButton from 'react-bootstrap/CloseButton';

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
      <div className={styles.modal} style={{ minWidth: '350px', maxWidth: '450px' }}>
        <div className={`${styles.content}row justify-content-center`}>

          <div className={`${styles.content}col-md-6 `}>
            <div className="card">
              <div className="card-body">

                <div className='d-flex justify-content-center'>
                  <h2 className='sans-serif' style={{ position: 'absolute', }}>Đăng Ký</h2>
                </div>
                <div className='d-flex justify-content-end'>
                  <div>
                    <CloseButton aria-label="Hide"
                      onClick={onClose} />
                  </div>
                </div>

                <div className='pl-5 pr-5 pt-4'>
                  <div className='d-flex bd-highlight mb-2'>
                    <div className="form-group mb-2 pr-2 me-auto">
                      <label htmlFor="fullName" style={{ whiteSpace: 'nowrap' }}>Họ Và Tên:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div className="form-group  mb-2 me-auto">
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
                  </div>

                  <div className='d-flex bd-highlight  mb-2'>
                    <div className="form-group mb-2 pr-2 bd-highlight">
                      <label htmlFor="UserName" style={{ whiteSpace: 'nowrap' }}>Tên Đăng Nhập:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter user name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-2 bd-highlight">
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
                  </div>

                  <div className='d-flex bd-highlight mb-1'>
                    <div className="form-group pr-2 mb-2 me-auto">
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
                    <div className="form-group mb-2 bd-highlight">
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
                  </div>
                  <div className='d-flex bd-highlight'>
                    <div className="form-group mb-2 me-auto pr-1" style={{minWidth:'50%'}}>
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
                    <div className="form-group mb-2 bd-highlight " style={{minWidth:'50%'}}>
                    </div>
                  </div>
                  <div className='d-flex flex-column p-3 pb-0'>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block">Đăng Ký</button>
                  </div>
                  <div className='d-flex flex-row items-center mt-1 justify-center'>
                    <div className='text-sm mr-1 text-gray-400'>
                      đã có tài khoản
                    </div>
                    <a href='#' onClick={(e) => { onClose(); onL(); }}>Đăng Nhập</a>

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
