import axios from 'axios';

const GetProduct = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const chitietproduct = urlParams.get('chitietproduct');
    
    try {
        let productid = chitietproduct;
        if (!chitietproduct) {
            productid = urlParams.get('chitietproduct');
        }
        if (productid) {
            const response = await axios.get('http://localhost:5000/api/products/' + productid);
            if (response.data) {
                return { sanpham: response.data };
            } else {
                console.error('No data found');
                return { sanpham: {} };
            }
        } else {
            console.error('Product ID not found in URL parameters');
            return { sanpham: {} };
        }
    } catch (err) {
        console.error(err);
        return { sanpham: {} };
    }
};

export default GetProduct;
