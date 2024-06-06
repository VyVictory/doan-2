import axios from 'axios';

const GetProducts = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/products/');
        if (response.data && response.data.products) {
            return { sanphams: response.data.products };
        } else {
            console.error('No data found');
            return { sanphams: [] };
        }
    } catch (err) {
        console.error(err);
        return { sanphams: [] };
    }
};

export default GetProducts;
