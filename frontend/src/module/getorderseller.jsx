import axios from 'axios';

const GetOrderSeller = async () => {
    try {

        const response = await axios.get('http://localhost:5000/api/orders', { withCredentials: true });    
        if (response.data) {
            return response.data;
        } else {
            console.error('Unexpected response structure:', response.data);
            return { orders: [] };
        }
    } catch (err) {
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with error:', err.response.status, err.response.data);
        } else if (err.request) {
            // The request was made but no response was received
            console.error('No response received:', err.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error in setting up request:', err.message);
        }
        return { orders: [] };
    }
};

export default GetOrderSeller;
