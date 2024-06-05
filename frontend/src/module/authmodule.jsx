import { useState, useEffect } from 'react';
import axios from 'axios';
import cookieModule from './cookie.module';

const Authmodule = () => {
  const { deleteCookie, setCookie } = cookieModule();
  const [isTokenExist, setIsTokenExist] = useState(false);
  const [message, setMessage] = useState('');
  const [data, setData] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsTokenExist(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsTokenExist(false);
    deleteCookie('jwt');
    window.location.href = window.location.href.includes('/kenhnguoiban') ? '/kenhnguoiban' : '/';
  };

  const changeAvatar = async (avatarFile) => {
    const formData = new FormData();
    formData.append('image', avatarFile);

    // Log FormData entries for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/upload/avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setData(response.data);
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
          setMessage('Avatar upload failed. Please check your inputs.');
        } else {
          setMessage(error.response.data.message || 'Avatar upload failed. Please try again.');
        }
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  return { isTokenExist, message, errors,data, handleLogout, changeAvatar };
};

export default Authmodule;
