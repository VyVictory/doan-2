import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetCategorys = () => {
    const [message, setMessage] = useState('');
    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
        const fetchCategorys = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/category/categories`);
                setCategorys(response.data);
            } catch (error) {
                if (error.response) {
                    setMessage('Error: ' + error.response.data);
                } else {
                    setMessage('An error occurred. Please try again later.');
                }
            }
        };
        fetchCategorys();
    }, []); // Empty dependency array to run effect only once

    return { message, categorys };
};

export default useGetCategorys;
