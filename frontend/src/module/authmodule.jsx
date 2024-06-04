import { useState, useEffect } from 'react';
import axios from 'axios';
import cookieModule from './cookie.module';   
const Authmodule = () => {
  const { deleteCookie, setCookie } = cookieModule();
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
  

  return { isTokenExist, handleLogout};
};

export default Authmodule;
