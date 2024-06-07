import axios from 'axios';

const GetCart = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/carts/get', { withCredentials: true });
        return response.data;
    } catch (err) {
        console.error('Error fetching cart:', err);
        return null;
    }
};

export { GetCart };
