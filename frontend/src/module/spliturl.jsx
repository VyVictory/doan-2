import { useLocation } from 'react-router-dom';

import { } from 'react-router-dom';
function Spliturl(name) {

    const location = useLocation();
    // Lấy địa chỉ URL từ location.pathname
    const url = location.pathname;
    // Split the URL by "/"
    const parts = url.split("/");
    // Tìm index của "customer" trong mảng
    const customerIndex = parts.indexOf(name);
    // Nếu "customer" tồn tại trong URL và index của nó không phải là phần tử cuối cùng
    if (customerIndex !== -1 && customerIndex + 1 < parts.length) {
        // Trả về phần tử tiếp theo sau "customer"
        return parts[customerIndex + 1];
    }
    // Nếu không tìm thấy hoặc phần tử "customer" là phần tử cuối cùng, trả về null
    return null;
}

export default Spliturl;
