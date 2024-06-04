import { useState, useEffect } from 'react';
import axios from 'axios';
const Authmodule = () => {
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);
    const [isTokenExist, setIsTokenExist] = useState(false);
    const urlapi = useState('http://localhost:5000/api');
    // // Cài đặt một số giá trị mặc định cho tất cả các yêu cầu Axios
    // axios.defaults.baseURL = 'http://localhost:5000'; // URL của máy chủ Express
    // axios.defaults.withCredentials = true; // Đảm bảo cookie được gửi trong yêu cầu

    // // Thiết lập CORS cho tất cả các yêu cầu từ ứng dụng React của bạn
    // axios.interceptors.request.use(config => {
    //     config.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    //     return config;
    // });
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token !== '') {
            setIsTokenExist(true);
        } else {
            setIsTokenExist(false);
        }
    }, []);
    // cookie jwt=adadawdada
    //http://localhost:5000/api/users/profile
    const registerfunction = async (formdata) => {
        try {
            // {
            //     "username": "username",
            //   "fullname": "fullname",
            //   "email": "email@email.com",
            //   "password": "password",
            //   "phone":"0836887911",
            //   "gender":"nemo"
            // }
            // const response = await axios.post(`${urlapi}/users/`, formdata
            const response = await axios.post(`http://localhost:5000/api/users/`, formdata);

            setMessage(response.data.message || 'Sign up successful!');
        } catch (error) {
            if (error.response) {
                // Server returned error response
                if (error.response.data.errors) {
                    // Validation errors from server
                    setErrors(error.response.data.errors);
                } else {
                    // Other server errors
                    setMessage(error.response.data.message || 'Sign up failed. Please try again.');
                }
            } else {
                // No response from server
                setMessage('An error occurred. Please try again later.');
            }
        }
    };
    const loginfunction = async (formdata) => {
        try {
            // {
            //     "username": "username",
            //   "password": "password",
            // }
            const response = await axios.post(`http://localhost:5000/api/users/auth`, formdata);
            // // Lưu token vào localStorage
            localStorage.setItem('token', response.data.token);
            // // Xử lý kết quả đăng nhập thành công
            setMessage('Đăng nhập thành công!');
            // Đóng form sau khi đăng nhập thành công
            setTimeout(() => {
                // onClose();
                // Check if the current URL contains '/kenhnguoiban'
                if (window.location.href.includes('/kenhnguoiban')) {
                    window.location.href = '/kenhnguoiban';
                } else {
                    window.location.href = '/';
                }
            }, 1000);

        } catch (error) {
            if (error.response) {
                // Xử lý lỗi từ server
                setMessage('Tài Khoản Hoặc Mật Khẩu Không Chính Xác.');
            } else {
                // Xử lý lỗi không có phản hồi từ server
                setMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            }
        }
    };
    return { isTokenExist, message, errors, loginfunction, registerfunction };
};

export default Authmodule;
