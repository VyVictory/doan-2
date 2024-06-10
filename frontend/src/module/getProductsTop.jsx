import axios from 'axios';

const GetProductsTop = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/products/top/');
        console.log('Response:', response.data);
        
        // Check if response.data is an array and has length greater than 0
        if (Array.isArray(response.data) && response.data.length > 0) {
            // Filter products where Approve is true
            const approvedProducts = response.data.filter(product => product.Approve === true && product.countInStock!==0);
            return { sanphams: approvedProducts };
        } else {
            console.error('No data found');
            return { sanphams: [] };
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        return { sanphams: [] };    
    }
};

export { GetProductsTop };
