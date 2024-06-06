import axios from 'axios';

const GetProductsNotApprove = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/products/');
        if (response.data && response.data.products) {
            // Filter products where Approve is true
            const approvedProducts = response.data.products.filter(product => product.Approve === false && product.ApproveStatus !== 'tuchoi' && product.ApproveStatus !== 'vipham');
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

export default GetProductsNotApprove;
