import { useState, useEffect } from 'react';
import axios from 'axios';

const GetAddressShip = () => {
  const [addressship, setAddressship] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/address', { withCredentials: true });
          setAddressship(response.data); // Set address data as an array
        } catch (error) {
          console.error('Error: ', error);  
          throw error;
        }
    };
    fetchData();
  }, []); // Empty dependency array to run effect only once

  return { addressship };
};
export default GetAddressShip;
