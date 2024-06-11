import { useState, useEffect } from 'react';
import axios from 'axios';
import cookieModule from './cookie.module';

const useProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const { setCookie } = cookieModule();
        setCookie('jwt', token, 7);
        try {
          const response = await axios.get('http://localhost:5000/api/users/profile', { withCredentials: true });
          setProfile(response.data); // Set profile data
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching data
        }
      } else {
        setLoading(false); // Set loading to false if no token found
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once

  return { profile,loading  };
};

export default useProfile;
