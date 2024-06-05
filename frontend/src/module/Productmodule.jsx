import { useState } from 'react';
import axios from 'axios';

const useProductData = () => {
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const postProduct = async (formData) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/users/`, formData, { withCredentials: true });
            setMessage(response.data.message || 'Post product successful!');
        } catch (error) {
            if (error.response) {
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                    setMessage('Post product failed. Please check your inputs.');
                } else {
                    setMessage(error.response.data.message || 'Post product failed. Please try again.');
                }
            } else {
                setMessage('An error occurred. Please try again later.');
            }
        }
    };

    return { message, errors, postProduct };
};

export default useProductData;

// const useProductData = () => {
//     const [message, setMessage] = useState('');
//     const [sanphams, setSanphams] = useState([]);
//     const [sanpham, setSanpham] = useState({});
//     const urlParams = new URLSearchParams(window.location.search);
//     const chitietproduct = urlParams.get('chitietproduct');
//     const [getcategorys, setGetcategorys] = useState([]);
//     useEffect(() => {

//         const fetchProductList = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/product/');
//                 if (response.data) {
//                     setSanphams(response.data);
//                 } else {
//                     alert('No data found');
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         };

//         const fetchProductDetail = async () => {
//             let productid = chitietproduct; // Initialize productid with chitietproduct
//             if (!chitietproduct) {
//                 const productidgeturl = urlParams.get('chitietproduct');
//                 productid = productidgeturl;
//             }
//             if (productid) {
//                 try {
//                     const response = await axios.get('http://localhost:5000/product/' + productid);
//                     if (response.data) {
//                         setSanpham(response.data);
//                     } else {
//                         alert('No data found');
//                     }
//                 } catch (err) {
//                     console.log(err);
//                 }
//             }
//         };
//         const categorys = async () => {
//             //localhost:5000/api/category/categories
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/category/categories`);
//                 setGetcategorys(response.data)
//                 console.log(response)
//             } catch (error) {
//                 if (error.response) {
//                     setMessage(',err,');
//                 } else {
//                     // Xử lý lỗi không có phản hồi từ server
//                     setMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
//                 }
//             }
//         };
//         categorys();
//         fetchProductList();
//         fetchProductDetail();
//     }, [chitietproduct, urlParams]); // Added urlParams to dependency array


//     return { message, sanphams, sanpham ,getcategorys};
// };
// export default useProductData;

