import { useState, useEffect } from 'react';

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsTokenExist(false);
    if (window.location.href.includes('/kenhnguoiban')) {
        window.location.href = '/kenhnguoiban';
    } else {
        window.location.href = '/';
    }
  };

  return { isTokenExist, handleLogout };
};

export default Authmodule;
