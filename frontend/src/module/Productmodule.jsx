import { useState } from 'react';
import axios from 'axios';

const useProductData = () => {
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);
    const [imgProduct, setImgProduct] = useState({});

    const postProduct = async (formData) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/products/`, formData, { withCredentials: true });
            setMessage( 'Post product successful!');
        } catch (error) {
            if (error.response) {
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                    setMessage('Post product failed. Please check your inputs.');
                } else {
                    setMessage(error.response.data.message || 'Post product failed. Please try again.');
                }
            } else {
                setMessage('An error occurred. Please try again later.');
            }
        }
    };
    const changeImgProduct = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
    
        // Log FormData entries for debugging
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }
    
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:5000/api/upload/product', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          setImgProduct(response.data);
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
    return { message, errors, postProduct,imgProduct ,changeImgProduct};
};

export default useProductData;

