import axios from 'axios';

const GetProductByIdCart = async ({ idproduct }) => {
    const response = await axios.get(`http://localhost:5000/api/carts/product/${idproduct}`, { withCredentials: true });
    return response.data; // Return response data, not the entire response
};

export default GetProductByIdCart;
