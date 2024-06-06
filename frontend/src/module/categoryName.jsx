import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryName = ({ categoryId }) => {
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategoryName = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/category/${categoryId}`);
                setCategoryName(response.data.name);
            } catch (error) {
                if (error.response) {
                    setError('Error: ' + error.response.data);
                } else {
                    setError('An error occurred. Please try again later.');
                }
            }
        };
        fetchCategoryName();
    }, [categoryId]); // Dependency array includes categoryId

    if (error) {
        return <span>{error}</span>;
    }

    return <span>{categoryName}</span>;
};

export default CategoryName;
