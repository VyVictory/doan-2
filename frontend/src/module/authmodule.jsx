import { useState, useEffect } from 'react';
import axios from 'axios';
import cookieModule from './cookie.module';   
const Authmodule = () => {
  const [isTokenExist, setIsTokenExist] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== '') {
      setIsTokenExist(true);
    } else {
      setIsTokenExist(false);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setIsTokenExist(false);
    deleteCookie('jwt');
    if (window.location.href.includes('/kenhnguoiban')) {
      window.location.href = '/kenhnguoiban';
    } else {
      window.location.href = '/';
    }

  };
  const {  deleteCookie, setCookie } = cookieModule(); 

  const getProfile = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setCookie('jwt', token, 7);
      // document.cookie = `jwt=${token}`;
      // const headers = {
      //   'Cookie': `jwt = ${token}`
      // };
      try {
        // Thực hiện yêu cầu GET đến địa chỉ cụ thể với header đã thiết lập
        const response = await axios.get('http://localhost:5000/api/users/profile', { withCredentials: true });
        // Xử lý dữ liệu nhận được
        console.log('Data:', response.data);
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error: ', error);//, headers
      }
    }

  };

  return { isTokenExist, handleLogout, getProfile };
};

export default Authmodule;
