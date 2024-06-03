import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductData = () => {
    const [sanphams, setSanphams] = useState([]);
    const [sanpham, setSanpham] = useState({});
    const urlParams = new URLSearchParams(window.location.search);
    const chitietproduct = urlParams.get('chitietproduct');

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await axios.get('http://localhost:5000/product/');
                if (response.data) {
                    setSanphams(response.data);
                } else {
                    alert('No data found');
                }
            } catch (err) {
                console.log(err);
            }
        };

        const fetchProductDetail = async () => {
            let productid = chitietproduct; // Initialize productid with chitietproduct
            if (!chitietproduct) {
                const productidgeturl = urlParams.get('chitietproduct');
                productid = productidgeturl;
            }
            if (productid) {
                try {
                    const response = await axios.get('http://localhost:5000/product/' + productid);
                    if (response.data) {
                        setSanpham(response.data);
                    } else {
                        alert('No data found');
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        };

        fetchProductList();
        fetchProductDetail();
    }, [chitietproduct, urlParams]); // Added urlParams to dependency array

    return { sanphams, sanpham };
};

export default useProductData;
