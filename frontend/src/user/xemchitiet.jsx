import { NavLink } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import imguser from './imguser/bar/user.png'
import useProductData from '../module/Productmodule';
import GetProduct from '../module/getproduct';
function Xemchitiet() {
    const [urlpicture, setUrlpicture] = useState('http://localhost:5000/uploads/');
/*note get sanpham and get sanphams
    const [sanphams, setSanphams] = useState([]); // Initialize sanpham as an empty array
    const [sanpham, setSanpham] = useState([])
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const chitietproduct = urlParams.get('chitietproduct');
        if (chitietproduct) {
            // Xử lý logic với giá trị chitietproduct ở đây
            axios.get('http://localhost:3000/product/' + chitietproduct)
                .then(response => {
                    if (response.data) {
                        setSanpham(response.data);
                    } else {
                        alert('No data found');
                    }
                })
                .catch(err => console.log(err));

            console.log(chitietproduct);
        }
    }, []);
    useEffect(() => {
        axios.get('http://localhost:3000/product/')
            .then(response => {
                if (response.data) {
                    setSanphams(response.data);
                } else {
                    alert('No data found');
                }
            })
            .catch(err => console.log(err));
    }, []); // Empty dependency array to run once on component mount*/
    const urlParams = new URLSearchParams(window.location.search);
    const chitietproduct = urlParams.get('chitietproduct');
    const {sanpham } = GetProduct(chitietproduct);

    const webpage = (a, b, c) => {
        // Chuyển hướng ở đây
        window.location.href = '/xemchitiet?' + 'chitietproduct=' + a;
    };
    return (
        <div className="Xemchitiet">
            <div className="" >
                <div >
                    <div className='p-5' style={{ display: 'flex', height: '1000px' }}>
                        {/* Phần thẻ div thông thường */}

                        <div style={{ flex: 2 }}>
                            <div style={{ backgroundColor: 'lightgray' }} className="bg-light border p-2 shadow-sm rounded">
                                <div className='d-flex justify-content-center'>
                                    <img style={{ maxWidth: '400px', minWidth: '400px', maxHeight: '400px' }} src={urlpicture + sanpham.hinh} className="p-1 border" alt={urlpicture + sanpham.hinh} />
                                </div>
                            </div>
                        </div>

                        <div className='container' style={{ flex: 2.5 }}>
                            {/* Phần thẻ div có thể cuộn */}
                            <div style={{ backgroundColor: 'lightblue' }} className="bg-light border p-4 shadow-sm rounded    ">
                                {/* Nội dung dài để tạo ra thanh cuộn */}
                                <h5>Chính Hãng,...</h5>
                                <h3>{sanpham.ten}</h3>
                            </div>
                        </div>
                        <div style={{ flex: 1.5 }}>
                            <div style={{ backgroundColor: 'lightgray' }} className="bg-light border p-2 shadow-sm rounded">
                                <div className='p-3 d-flex flex-row d-flex align-items-center'>
                                    <div >
                                        <img src={imguser} style={{ 'width': '40px' }} alt={imguser}></img>
                                    </div>
                                    <div className='mx-3 text-truncate'>
                                        <div>
                                            Shop Name
                                        </div>
                                        <div className='d-flex flex-row ' style={{ fontSize: '14px' }}>
                                            <div>
                                                Offical
                                            </div>
                                            <div style={{ marginLeft: '5px' }}>
                                                start
                                            </div>
                                            <div className='' style={{ marginLeft: '5px' }}>
                                                Đánh Giá
                                            </div>


                                        </div>

                                    </div>
                                    <button className='d-flex border p-2 rounded' >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default Xemchitiet;
