import axios from 'axios';

const GetProductsTop = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/products/top/');
        if (response.data && response.data.products) {
            // Filter products where Approve is true
            const approvedProducts = response.data.products.filter(product => product.Approve === true);
            return { sanphams: approvedProducts };
        } else {
            console.error('No data found');
            return { sanphams: [] };
        }
    } catch (err) {
        console.error(err);
        return { sanphams: [] };    
    }
};

export default GetProductsTop;
