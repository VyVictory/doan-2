import { useState, useEffect } from 'react';
import axios from 'axios';
import cookieModule from './cookie.module';
import useProfile from './profile.module';
const Authmodule = () => {
  const { deleteCookie, setCookie } = cookieModule();
  const [isTokenExist, setIsTokenExist] = useState(false);
  const [isAdmin ,setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');
  const [data, setData] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    checkAuthentication();
  }, []); // Run once when the component mounts
  const checkAuthentication = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/profile', { withCredentials: true });
      setIsTokenExist(true);
    } catch (error) {
      setIsTokenExist(false);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsTokenExist(false);
    deleteCookie('jwt');
    window.location.href = window.location.href.includes('/kenhnguoiban') ? '/kenhnguoiban' : '/';
  };

  const changeAvatar = async (avatarFile) => {
    const formData = new FormData();
    formData.append('image', avatarFile);

    // // Log FormData entries for debugging
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/upload/avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setData(response.data);
      setMessage(response.data.message || 'Avatar upload successful!');
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

  const updateProfile = async (formdata) => {
    try {
      const response = await axios.put('http://localhost:5000/api/users/profile', formdata, { withCredentials: true });
      setMessage(response.data.message || 'Update successful!');
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setMessage(error.response.data.message || 'Update failed. Please try again.');
        }
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  return { isTokenExist,isAdmin, message, errors, data, handleLogout, changeAvatar, updateProfile };
};

export default Authmodule;
