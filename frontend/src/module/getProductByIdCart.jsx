import { useEffect, useState } from 'react';
import axios from 'axios';

const GetProductByIdCart = ({ idproduct }) => {
  // Define product state
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product data using the provided id
        const response = await axios.get(`http://localhost:5000/api/carts/product/${idproduct}`, { withCredentials: true });
        // Set product data
        console.log(response)
        setProduct(response.data); 
      } catch (error) {
        console.error('Error: ', error);  
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idproduct]); // Include idproduct in dependency array

  return product; // Return the product data
};

export default GetProductByIdCart;
