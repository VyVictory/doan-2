import { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllProfileAmin = () => {
    const [message, setMessage] = useState('');
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        const fetchListUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/`, { withCredentials: true });
                setListUser(response.data);
            } catch (error) {
                if (error.response) {   
                    setMessage('Error: ' + error.response.data);
                } else {
                    setMessage('An error occurred. Please try again later.');
                }
            }
        };
        fetchListUser();
    }, []); // Empty dependency array to run effect only once

    return { message, listUser };
};

export default GetAllProfileAmin;
