import React, { useState, useEffect } from 'react';
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
    const [list, setList] = useState('tatca');

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

    const handleSetList = (value) => {
        setList(value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredOrders = orders.filter((order) =>
        order.items.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleClickLink = (a) => {
        window.location.href = '/xemchitiet?chitietproduct=' + a;
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const setStatus = (status) => {
        let s = ['chờ người bán xác nhận'];
        if (status === 0) {
            return <span className='text-red-600'>{s[0]}</span>;
        } else return status;
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const huysanpham = async (idorder) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/orders/updateStatus/${idorder}`, { status: "Đã Hủy" }, { withCredentials: true });
            console.log(response.data);
            alert('hủy Thành Công.');
            window.location.href = '/customer/historybuyandsell';
        } catch (error) {
            console.error('Error posting shipping:', error);
        }
    }

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
                            <select id="cars" className='border w-1/10 h-full' name="cars" style={{ height: "41px" }}>
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="fiat">Fiat</option>
                                <option value="audi">Audi</option>
                            </select>
                            <div className="relative w-full">
                                <input
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    type="search"
                                    id="search-dropdown"
                                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search Mockups, Logos, Design Templates..."
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
                                                <div key={itemIndex} className="border mt-2 mb-1 rounded flex flex-row items-center p-2 bg-gray-100 w-full">
                                                    <div onClick={() => handleClickLink(item.product)} className='flex flex-row items-center w-2/12 cursor-pointer'>
                                                        <div className='flex flex-col items-center'>
                                                            <img className="max-h-24 max-w-20 p-1" src={'http://localhost:5000/uploads/avatar/avatarDefault.jpg'} alt={item.name} />
                                                            <div className="card-text h-8 text-xs text-left overflow-hidden line-clamp-2 w-36">{item.name}</div>
                                                        </div>
                                                    </div>
                                                    <div onClick={() => handleClickLink(item.product)} className='flex flex-row items-center justify-center w-3/12 cursor-pointer'>
                                                        <div className='flex flex-col items-center'>
                                                            <img className="max-h-24 max-w-20 p-1" src={'http://localhost:5000' + item.image || ''} alt={item.name} />
                                                            <div className="card-text h-8 text-xs text-left overflow-hidden line-clamp-2 w-36">{item.name}</div>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-center items-center w-2/12'>{setStatus(order.Status)}</div>
                                                    <div className='flex justify-center items-center w-2/12'>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className=' text-orange-800'>đ</span></div>
                                                    <div className='flex justify-center items-center w-2/12'>{item.quantity}</div>
                                                    <div className='flex justify-center items-center w-2/12'>
                                                        <button title="View Details" className='rounded w-10 h-10 flex items-center justify-center border border-cyan-500' onClick={() => handleViewDetails(order)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                                                <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5A3.375 3.375 0 0 0 10.125 2.25H7.5" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9h.008v.008H6V9zM4.125 20.25a.75.75 0 0 1-.75-.75V13.5a3.375 3.375 0 0 1 3.375-3.375H9a3.375 3.375 0 0 1 3.375 3.375v1.5a1.125 1.125 0 0 0 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375v2.625M6 12h.008v.008H6V12z" />
                                                            </svg>
                                                        </button>
                                                        <button className='rounded w-10 h-10 flex items-center justify-center border border-red-500' onClick={() => huysanpham(order._id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.185 7.01A.75.75 0 0 0 10.385 6H11.25a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75v.75A.75.75 0 0 0 9 6H9.15c.265 0 .5-.106.666-.29c.165-.185.25-.422.25-.676v-.522a1.5 1.5 0 1 0-3 0v.522c0 .265.086.51.25.676c.165.184.4.29.666.29H10.3zM8.6 10.5v1.75A.75.75 0 0 0 9.75 13h1.5A.75.75 0 0 0 12 12.25V10.5H8.6zm5.125 7a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75v.75h-3v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75v.75h-.75a1.5 1.5 0 1 1 0-3h1.125A1.875 1.875 0 0 1 8.75 14.75h4.5A1.875 1.875 0 0 1 15.25 16.5H16.5a1.5 1.5 0 1 1 0 3h-.75v-.75z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                ) : (
                                    <div className='flex items-center justify-center'>
                                        <p>No orders found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            {selectedOrder && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-8 rounded-lg z-10 max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Order Details</h2>
                        <div>
                            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                            <p><strong>Status:</strong> {selectedOrder.Status}</p>
                            <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                            <p><strong>Total:</strong> {selectedOrder.total}</p>
                            <div>
                                <h3 className="font-semibold">Items:</h3>
                                {selectedOrder.items.map((item, index) => (
                                    <div key={index} className="border p-2 mb-2 rounded">
                                        <p><strong>Product:</strong> {item.name}</p>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                        <p><strong>Price:</strong> {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className=' text-orange-800'>đ</span></p>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Qldonhang;
