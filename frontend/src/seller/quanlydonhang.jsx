import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import GetOrderSeller from '../module/getorderseller';
import axios from 'axios';

const Qldonhang = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [list, setList] = useState('TẤT CẢ');
    const [searchCriteria, setSearchCriteria] = useState('name');
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await GetOrderSeller();
                if (Array.isArray(result)) {
                    result.sort((a, b) => a.Status - b.Status);
                    setOrders(result);
                } else {
                    setError("Received data is not an array.");
                    console.error("GetOrder returned data that is not an array:", result);
                }
            } catch (error) {
                setError("Failed to fetch orders.");
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);
    const filterOrdersByStatus = (status) => {
        return orders.filter(order => {
            if (status === 'TẤT CẢ') {
                return true; // Return all orders
            } else if (status === 'CHỜ XÁC NHẬN') {
                return order.Status === "0";
            } else if (status === 'ĐANG GIAO') {
                return order.Status === "Đang Giao";
            } else if (status === 'GIAO THÀNH CÔNG') {
                return order.Status === "Giao Thành Công";
            } else if (status === 'ĐÃ HỦY') {
                return order.Status === "Đã Hủy";
            } else if (status === 'TRẢ HÀNG') {
                return order.Status === "Trả Hàng";
            } else if (status === 'GIAO THẤT BẠI') {
                return order.Status === "Giao Thất Bại";
            }
        });
    };
    const handleSetList = (value) => {
        setList(value);
        setSearchTerm('');
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSearchCriteriaChange = (event) => { // Define handleSearchCriteriaChange function
        setSearchCriteria(event.target.value);
    };
    // const filteredOrders = filterOrdersByStatus(list).filter((order) =>
    //     order.items.some((item) =>

    //         item.name.toLowerCase().includes(searchTerm.toLowerCase())
    //     )
    // );
    const filteredOrders = filterOrdersByStatus(list).filter((order) =>
        order.items.some((item) =>
            searchCriteria === 'name' ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
                : searchCriteria === 'quantity' ? item.quantity.toString().toLowerCase().includes(searchTerm.toLowerCase())
                    : searchCriteria === 'price' ? item.price.toString().toLowerCase().includes(searchTerm.toLowerCase()) // Incorrect
                        : searchCriteria === '_id' ? order._id.toString().toLowerCase().includes(searchTerm.toLowerCase()) // Incorrect
                            : false
        )
    );


    const handleClickLink = (idproduct) => {
        window.location.href = `/xemchitiet?chitietproduct=${idproduct}`;
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const setStatus = (status) => {
        let s = ['chờ xác nhận'];
        if (status === "0") {
            return <span className='text-red-600'>{s[0]}</span>;
        } else if (status === "Đã Hủy" || status === "Giao Thất Bại" || status === "Trả Hàng") {
            return <span className='text-red-600'>{status}</span>;
        } else return <span className='text-green-600'>{status}</span>;;
    };
   // Giao Thành Công
    const handleCloseModal = () => {
        setSelectedOrder(null);
    };
    // const getprofilebyid = (idprofile) => {

    //     return:
    // };

    const chaneStatus = async (idorder, status) => {
        try {
            if(status=="Đã Hủy"){
                const response = await axios.put(`http://localhost:5000/api/orders/cancle/${idorder}`, { withCredentials: true });
                //http://localhost:5000/api/orders/cancle/
                console.log(response.data);
            }else if(status=="Giao Thành Công"){
                const response = await axios.put(`http://localhost:5000/api/orders/${idorder}/deliver`, { withCredentials: true });
                //http://localhost:5000/api/orders/cancle/
                console.log(response.data);
            }else{
                const response = await axios.put(`http://localhost:5000/api/orders/updateStatus/${idorder}`, { status: status }, { withCredentials: true });
                console.log(response.data);
            }
            let mess = ['hủy thành công', 'đã xác nhận giao hàng', 'đã xác nhận giao hàng thành công', 'xác nhận giao hàng thất bại']
            alert(status == "Đã Hủy" ? mess[0] : status == "Đang Giao" ? mess[1] : status == "Giao Thành Công" ? mess[2] : status == "Giao Thất Bại" ? mess[3] : status);
            window.location.href = '/kenhnguoiban/quanlydonhang';
        } catch (error) {
            console.error('Error posting shipping:', error);
        }
        // try {
        //     const response = await axios.put(`http://localhost:5000/api/orders/updateStatus/${idorder}`, { status: status }, { withCredentials: true });
        //     console.log(response.data);
        //     let mess = ['hủy thành công', 'đã xác nhận giao hàng', 'đã xác nhận giao hàng thành công', 'xác nhận giao hàng thất bại']
        //     alert(status == "Đã Hủy" ? mess[0] : status == "Đang Giao" ? mess[1] : status == "Giao Thành Công" ? mess[2] : status == "Giao Thất Bại" ? mess[3] : status);
        //     window.location.href = '/kenhnguoiban/quanlydonhang';
        // } catch (error) {
        //     console.error('Error posting shipping:', error);
        // }
    }
    console.log(filteredOrders);
    return (
        <div className="shadow p-3 mb-5 bg-body rounded mt-5 mx-4">
            <Container fluid className='border'>
                <Row className="bg-gray-200 text-black text-center text-uppercase small fw-bold">
                    {['TẤT CẢ', 'CHỜ XÁC NHẬN', 'ĐANG GIAO', 'GIAO THÀNH CÔNG', 'ĐÃ HỦY', 'TRẢ HÀNG', 'GIAO THẤT BẠI'].map((tab, index) => (
                        <Col key={index} className={`h-10 d-flex justify-center items-center ${list === tab ? 'border-b-4 border-red-500' : 'border-b'}`} onClick={() => handleSetList(tab)}>
                            <NavLink className="nav-link">{tab}</NavLink>
                        </Col>
                    ))}
                </Row>
                <Row className='justify-center'>
                    <nav className="navbar navbar-expand-lg mt-3 w-full">
                        <div className="navbar-collapse d-flex flex-row">
                            <select id="searchCriteria" className='border w-1/10 h-full' onChange={handleSearchCriteriaChange} value={searchCriteria} style={{ height: "41px" }}>
                                <option value="name">Tên sản phẩm</option>
                                <option value="_id">Mã đơn hàng</option>
                                <option value="price">Giá sản phẩm</option>
                                <option value="quantity">Số lượng mua</option>
                            </select>
                            <div className="relative w-full">
                                <input
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    type="search"
                                    id="search-dropdown"
                                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={`Tìm kiếm theo ${searchCriteria === 'productName' ? 'Tên sản phẩm' : searchCriteria === 'productPrice' ? 'Giá sản phẩm' : 'Số lượng mua'}...`}
                                    required
                                />
                                <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </div>
                    </nav>
                </Row>

                <Row className='pt-3'>
                    <Col>
                        <div className="container p-0 w-full h-auto">
                            <div className="mt-2 mb-2 rounded flex flex-row items-center" style={{ backgroundColor: '#e0e0e0', height: '40px' }}>
                                {['Người mua', 'Sản phẩm', 'Trạng thái', 'Giá sản phẩm', 'Số lượng', 'Thao tác'].map((header, index) => (
                                    <div key={index} className={`flex justify-center items-center `} style={{ width: index === 1 ? '25%' : '15%' }}>
                                        {header}
                                    </div>
                                ))}
                            </div>
                            <div className="pt-3 border-top" style={{ height: '600px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order, orderIndex) => (
                                        <div key={orderIndex} className="border mt-2 mb-2 rounded flex flex-col items-center p-2 bg-white">

                                            {order.items.map((item, itemIndex) => (
                                                <div key={itemIndex} className="border mt-2 rounded flex flex-column p-0 bg-gray-100 w-full">

                                                    <div className="border rounded flex flex-row items-center p-2 bg-gray-100 w-full">
                                                        <div className='flex flex-row items-center w-2/12 cursor-pointer'>
                                                            <div className='flex flex-col items-center justify-center'>
                                                                <img className="max-h-24 max-w-20 p-1" src={'http://localhost:5000'+order.user.avatar} alt={item.name} />
                                                                <div className="card-text h-8 text-xs text-center overflow-hidden line-clamp-2 w-36">{order.user.username}</div>
                                                            </div>
                                                        </div>
                                                        <div onClick={() => handleClickLink(item._id)} className='flex flex-row items-center justify-center w-3/12 cursor-pointer'>
                                                            <div className='flex flex-col items-center'>
                                                                <img className="max-h-24 max-w-20 p-1" src={'http://localhost:5000' + item.image || ''} alt={item.name} />
                                                                <div className="card-text h-8 text-xs text-center overflow-hidden line-clamp-2 w-36">{item.name}</div>
                                                            </div>
                                                        </div>
                                                        <div className='flex justify-center items-center w-2/12'>{setStatus(order.Status)}</div>
                                                        <div className='flex justify-center items-center w-2/12'>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className=' text-orange-800'>đ</span></div>
                                                        <div className='flex justify-center items-center w-2/12'>{item.quantity}</div>
                                                        <div className='flex justify-end items-center w-2/12' >
                                                            <button title="View Details" className='bg-slate-400 rounded mr-2 w-10 h-10 flex items-center justify-center border border-cyan-500' onClick={() => handleViewDetails(order)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                                                </svg>

                                                            </button>
                                                            {order.Status == 0
                                                                ?
                                                                <div>
                                                                    <button title="Hủy đơn hàng này" className='mb-2 bg-red-400 rounded w-10 h-10 flex items-center justify-center border border-red-500' onClick={() => chaneStatus(order._id, "Đã Hủy")}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                        </svg>

                                                                    </button>
                                                                    <button title="Xác nhận giao hàng" className='bg-green-400 rounded w-10 h-10 flex items-center justify-center border border-red-500' onClick={() => chaneStatus(order._id, "Đang Giao")}>

                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                        </svg>

                                                                    </button>
                                                                </div>
                                                                : order.Status == "Đang Giao"
                                                                    ?
                                                                    <div className='d-flex flex-column'>
                                                                        <button title="Check Giao Hàng Thất Bại" className='mb-2 bg-red-600 rounded w-10 h-10 flex items-center justify-center border border-red-500' onClick={() => chaneStatus(order._id, "Giao Thất Bại")}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                                                                            </svg>
                                                                        </button>
                                                                        <button title="Check Giao Hàng Thành Công" className=' bg-cyan-600 rounded w-10 h-10 flex items-center justify-center border border-red-500' onClick={() => chaneStatus(order._id, "Giao Thành Công")}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                    : ""
                                                            }
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='text-gray-400 text-xs' style={{ float: 'right' }} >id:{order._id}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                ) : (
                                    <div className='flex items-center justify-center'>
                                        <p>Đang Tải.....</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            {console.log(selectedOrder)}
            {selectedOrder && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-2 rounded-lg z-10 max-w-lg w-full">
                        {/* <button className=" bg-red-600 text-white rounded hover:bg-red-700" onClick={handleCloseModal}>Close</button> */}
                        <div style={{ width: '100%',}}>
                            <MDBBtn className="btn-close d-flex justify-content-end" color="none" aria-label="Close" onClick={handleCloseModal} style={{ float: 'right' }} />
                        </div>
                        <h2 className="text-xl pl-2 font-bold mb-4 d-flex justify-center ml-4">Chi Tiết Đơn Hàng</h2>
                        <div>
                            <div className='d-flex flex-row'>
                                <div className='mr-2'>
                                    <img src={"http://localhost:5000" + selectedOrder.items[0].image} />
                                </div>
                                <div>
                                    <p className='d-flex flex-row'><strong className='text-nowrap'>Order ID:</strong> {selectedOrder._id}</p>
                                    <p><strong>Trạng Thái:</strong> {selectedOrder.Status}</p>
                                    <p><strong>Ngày Đặt Hàng:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                                    <p><strong>Lần Tương Tác Gần Nhất:</strong> {new Date(selectedOrder.updatedAt).toLocaleDateString()}</p>
                                    <p className='d-flex flex-row'><strong >Tổng Tiền:</strong><h5 className='text-red-500'> {selectedOrder.totalPrice}</h5></p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold">Sản Phẩm:</h3>
                                {selectedOrder.items.map((item, index) => (
                                    <div key={index} className="border p-2 mb-2 rounded">
                                        <p><strong>Tên Sản Phẩm:</strong> {item.name}</p>
                                        <p><strong>Số Lượng:</strong> {item.quantity}</p>
                                        <p><strong>Giá:</strong> {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className=' text-orange-800'>đ</span></p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Qldonhang;
