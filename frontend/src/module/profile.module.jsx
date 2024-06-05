import { useState, useEffect } from 'react';
import axios from 'axios';
import cookieModule from './cookie.module';

const useProfile = () => {
  const [profile, setProfile] = useState({
    email: "",
    fullname: "",
    gender: "",
    hidden: false,
    isActive: false,
    isAdmin: false,
    phone: "",
    username: "",
    _id: ""
  });

  useEffect(() => {
    let isMounted = true; // To avoid setting state on unmounted component
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const { setCookie } = cookieModule();
        setCookie('jwt', token, 7);
        try {
          const response = await axios.get('http://localhost:5000/api/users/profile', { withCredentials: true });
          if (isMounted) { // Check if component is still mounted
            setProfile(response.data);
          }
        } catch (error) {
          console.error('Error: ', error);
          throw error;
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false when component unmounts
    };
  }, []); // Empty dependency array to run effect only once

  return { profile };
};

export default useProfile;
