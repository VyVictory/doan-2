import { NavLink } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import imguser from './imguser/bar/user.png'
import useProductData from '../module/Productmodule';
import GetProduct from '../module/getproduct';
import renderRatingStars from '../allview/renderRatingStart';
import TopProduct from './topProduct';
function Xemchitiet() {
    const [urlpicture, setUrlpicture] = useState('http://localhost:5000');
    const urlParams = new URLSearchParams(window.location.search);
    const chitietproduct = urlParams.get('chitietproduct');
    const [sanpham, setSanpham] = useState([]);
    const [numberProduct, setNumberProduct] = useState(0);
    useEffect(() => {
        const fetchProductList = async () => {
            const { sanpham } = await GetProduct();
            setSanpham(sanpham);
        };
        fetchProductList();
    }, []);
    if (numberProduct > sanpham.quantity) {
        setNumberProduct(sanpham.quantity)
    } else if (numberProduct < 1) {
        setNumberProduct(1)
    }
    // console.log(sanpham)
    const webpage = (a, b, c) => {
        // Chuyển hướng ở đây
        window.location.href = '/xemchitiet?' + 'chitietproduct=' + a;
    };
    return (
        <div className="Xemchitiet">
            <div className='pl-4 pr-4' style={{}}>
                <div className='d-flex flex-row'>
                    <div className='rounded' style={{ width: '76%', overflow: 'hidden', height: '600px' }}>
                        <div style={{ height: '100%', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="scrollable-content rounded">
                            <div className=' pl-5  pr-0 d-flex flex-row ' style={{}} >
                                {/* Phần thẻ div thông thường */}
                                <div className='pt-4' style={{ flex: 2 }}>
                                    <div style={{ backgroundColor: 'lightgray' }} className="bg-light rounded p-2 ">
                                        <div className='d-flex justify-content-center'>
                                            <img style={{ width: '470px', maxHeight: '400px', borderRadius: '5px' }} src={urlpicture + sanpham.image} className="p-1 border" alt={urlpicture + sanpham.image} />
                                        </div>
                                        <div className='p-2 pt-2 text-gray-500'>
                                            <h5>Đặc điểm nổi bật</h5>
                                            <div className='d-flex flex-row text-black'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                                                </svg>
                                                Hãng: {sanpham.brand}
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className='container p-0' style={{ flex: 3 }}>
                                    {/* Phần thẻ div có thể cuộn */}
                                    <div style={{ backgroundColor: 'lightblue', height: '570px', overflow: 'hidden' }} className=" bg-transparent pl-2 pr-2 ">
                                        <div style={{ height: '100%', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="scrollable-content ">
                                            {/* Nội dung dài để tạo ra thanh cuộn */}
                                            <div className=' p-3 bg-white rounded mb-3 mt-4'>
                                                <div className='d-flex flex-row align-items-center' style={{ marginLeft: '5px' }}>
                                                    <div className='d-flex flex-row'>{renderRatingStars(sanpham.rating, 20, 20)}</div>(369)
                                                </div>
                                                <div className='d-flex flex-row items-center'>
                                                    {/* <div style={{ color: 'gray' }}>Tên sản phẩm:</div> */}
                                                    <h3> {sanpham.name}</h3>
                                                </div>

                                                <div style={{ color: 'gray' }}>Mô tả sản phẩm:</div>
                                                <div>{sanpham.description}</div>
                                            </div>
                                            <div className=' bg-white rounded '>
                                                <TopProduct />
                                            </div>
                                            {/* Placeholder content for demonstration */}

                                        </div>
                                    </div>

                                </div>



                            </div>
                            {/* <style>
                            {`
                                .scrollable-content::-webkit-scrollbar {
                                    display: none;
                                }
                                `}
                        </style> */}
                            <div className='mt-4 p-3 bg-white rounded ml-5 mr-2 ' >
                                <h5>
                                    Khách hàng và đánh giá
                                </h5>
                                <div className='border-top p-5 pt-2 pb-2'>
                                    <div className='d-flex flex-row items-center ml-1'>
                                        <div className='d-flex flex-row mt-2' >
                                            {renderRatingStars(5, 20, 20)}
                                        </div>
                                        : cực kì hài lòng
                                    </div>

                                    <div className='d-flex flex-row items-center' style={{ color: 'green' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                        </svg>
                                        đã mua hàng
                                    </div>
                                    <div className='mt-2 ml-1 mb-1'>
                                        Đây có thể là một sản phẩm tuyệt vời dành cho bạn
                                    </div>
                                </div>
                                {/* <div>Tổng quan</div> */}
                                {Array.from({ length: 50 }).map((_, index) => (
                                    <div className='border-top p-5 pt-2 pb-2'>
                                        <div className='d-flex flex-row items-center ml-1'>
                                            <div className='d-flex flex-row mt-2' >
                                                {renderRatingStars(sanpham.rating, 20, 20)}
                                            </div>
                                            : cực kì hài lòng
                                        </div>

                                        <div className='d-flex flex-row items-center' style={{ color: 'green' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                            </svg>
                                            đã mua hàng
                                        </div>
                                        <div className='mt-2 ml-1 mb-1'>
                                            nội dung đánh giá:
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '23%' }} className='pt-4'>
                        <div style={{ backgroundColor: 'lightgray' }} className="bg-light    p-2 rounded">
                            <div className='p-3 d-flex flex-row d-flex items-center justify-center border-bottom'>
                                <div >
                                    <img src={imguser} style={{ 'width': '40px' }} alt={imguser}></img>
                                </div>
                                <div className='mx-3 text-truncate'>
                                    <div>
                                        Shop Name
                                    </div>
                                    <div className='d-flex flex-row align-items-center' style={{ fontSize: '14px' }}>
                                        <div>
                                            Offical
                                        </div>
                                        {/* <div className='' style={{ marginLeft: '5px' }}>
                                            Đánh Giá
                                        </div> */}
                                    </div>
                                </div>
                                {/* <button className='d-flex border p-2 rounded' >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                                    </svg>
                                </button> */}
                            </div>
                            <div className=' pl-4 pr-4 pt-2'>
                                <div className='d-flex flex-column items-center'>
                                    <div className='mb-1 text-gray-400 d-flex flex-row'>
                                        Số lượng còn:<h5>{sanpham.quantity}</h5>
                                    </div>
                                    <div className='mb-1'>
                                        Số lượng
                                    </div>
                                    <div className='mb-2 d-flex flex-row'>
                                        <button className='btn btn-outline-danger ' type='button' onClick={() => setNumberProduct(numberProduct - 1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                            </svg>
                                        </button>
                                        <input max={sanpham.quantity} className='border w-20 mr-1 ml-1 pl-5 text-center ' type='number' onChange={(e) => setNumberProduct(parseInt(e.target.value))} value={numberProduct} />
                                        <button className='btn btn-outline-success' type='button' onClick={() => setNumberProduct(numberProduct + 1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className='mb-1 d-flex items-center flex-column'>
                                        Tạm tính:<h5>{numberProduct * sanpham.price}</h5>
                                    </div>
                                    <div className='d-flex flex-row items-center '>
                                        <button className='btn btn btn-info' type='button'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                            </svg>
                                        </button>
                                        <button className='btn btn btn-success ml-2' type='button'>
                                            Mua ngay
                                        </button>
                                    </div>

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
