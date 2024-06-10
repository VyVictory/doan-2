import React, { useState, useEffect } from 'react';
import GetOrder from '../../module/getorder';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null); // Define state for error handling

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await GetOrder();

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
    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };
    const setStatus = (status) => {
        let s = ['chờ người bán xác nhận']
        if (status == 0) {
            return <span className='text-red-600'>{s[0]}</span>;
        } else return status;
    };
    const handleCloseModal = () => {
        setSelectedOrder(null);
    };
    const handleClickLink = (a) => {
        window.location.href = '/xemchitiet?chitietproduct=' + a;
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Lọc danh sách đơn hàng dựa trên giá trị tìm kiếm
    const filteredOrders = orders.filter((order) =>
        order.items.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    return (
        <>
            <div className='p-2' style={{ width: '100%', backgroundColor: '#f8f8f8' }}>
                <div className='d-flex justify-end' style={{ width: '100%', paddingRight: '10px' }}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="p-1 rounded"
                        style={{ width: '100%', maxWidth: '300px', border: '1px solid #ccc' }}
                    />
                </div>
                <div className="container p-0" style={{ width: '100%', height: 'auto', margin: '0px' }}>
                    <div className="mt-2 mb-2 rounded d-flex flex-row bd-highlight items-center" style={{ backgroundColor: '#e0e0e0', width: '100%', height: '40px' }}>
                        <div className='d-flex justify-center' style={{ width: '25%' }}>
                            Sản phẩm
                        </div>
                        <div className='d-flex justify-center' style={{ width: '20%' }}>
                            Trạng thái
                        </div>
                        <div className='d-flex justify-center' style={{ width: '20%' }}>
                            Giá sản phẩm
                        </div>
                        <div className='d-flex justify-center' style={{ width: '20%' }}>
                            Số lượng
                        </div>
                        {/* <div className='d-flex justify-center' style={{ width: '15%' }}>
                            Tổng Giá
                        </div> */}
                        <div className='d-flex justify-center' style={{ width: '15%' }}>
                            Thao tác
                        </div>
                    </div>
                    <div style={{ height: '600px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order, orderIndex) => (
                            <div key={orderIndex} className="order border mt-2 mb-2 rounded d-flex flex-column bd-highlight items-center p-2" style={{ backgroundColor: 'white', width: '100%', height: 'auto' }}>
                                {/* <div style={{ width: '100%', marginBottom: '10px' }}>
                                    <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Order ID: {order._id}</h2>
                                    <div><strong>Status:</strong> {order.Status}</div>
                                    <div><strong>Payment Method:</strong> {order.paymentMethod}</div>
                                    <div><strong>Shipping Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}</div>
                                    <div><strong>Created At:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
                                    <div><strong>Updated At:</strong> {new Date(order.updatedAt).toLocaleDateString()}</div>
                                    <div><strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}</div>
                                    <div><strong>Delivered:</strong> {order.isDelivered ? "Yes" : "No"}</div>
                                </div> */}
                                {order.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="item border mt-2 mb-1 rounded d-flex flex-row bd-highlight items-center p-2" style={{ backgroundColor: '#f5f5f5', width: '100%', height: 'auto' }}>
                                        <div onClick={(e) => { handleClickLink(item.product) }} className='d-flex flex-row items-center' style={{ width: '25%' }}>
                                            <div className='h-140 d-flex flex-column items-center' style={{ height: '180px' }}>
                                                <div className='mr-2 d-block' style={{ width: '160px' }}>
                                                    <img
                                                        style={{ maxHeight: '140px', maxWidth: '160px' }}
                                                        src={'http://localhost:5000' + item.image || ''}
                                                        alt={item.name}
                                                        className="p-1"
                                                    />
                                                </div>
                                                <div className="card-text h-8" style={{
                                                    width: '140px',
                                                    fontSize: '12px',
                                                    textAlign: 'left',
                                                    WebkitLineClamp: '2',
                                                    overflow: 'hidden',
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    margin: '0',
                                                    wordWrap: 'break-word'
                                                }}>
                                                    {item.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-center' style={{ width: '20%' }}>
                                            {setStatus(order.Status)}
                                        </div>
                                        <div className='d-flex justify-center' style={{ width: '20%' }}>
                                            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className=' text-orange-800' style={{ verticalAlign: "super" }}>đ</span>
                                        </div>
                                        <div className='d-flex justify-center' style={{ width: '20%' }}>
                                            {item.quantity}
                                        </div>
                                        {/* <div className='d-flex justify-center' style={{ width: '15%' }}>
                                            {(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className=' text-orange-800' style={{ verticalAlign: "super" }}>đ</span>
                                        </div> */}
                                        <div className='d-flex justify-center items-center' style={{ width: '15%' }}>
                                            <button
                                                title="View Details"
                                                className=' rounded w-10 h-10 d-flex items-center justify-center'
                                                style={{ border: 'solid 1px #00D0D3' }}
                                                onClick={() => handleViewDetails(order)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-6">
                                                    <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                                </svg>
                                            </button>
                                            {order.Status == 0
                                                ? <button title="Hủy đơn hàng này" className=' border btn btn-danger ml-2' style={{ backgroundColor: 'red' }}>
                                                    Hủy
                                                </button>
                                                : ''
                                            }
                                        </div>
                                    </div>
                                ))}
                                <div className='d-flex justify-end mr-4 mt-1' style={{ width: '100%' }}>
                                    <strong>Tổng thanh toán:</strong> <h5 className='text-red-600'>{(order.totalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h5><span className=' text-orange-800' style={{ verticalAlign: "super" }}>VND</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No orders found.</div>
                    )}
                    </div>
                </div>
            </div>

            {selectedOrder && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: 'white', padding: '20px', borderRadius: '8px',
                        width: '60%', maxWidth: '800px'
                    }}>
                        <button onClick={handleCloseModal} style={{
                            position: 'absolute', top: '10px', right: '10px',
                            background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer'
                        }}>✖</button>
                        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Order ID: {selectedOrder._id}</h2>
                        <div><strong>Trạng thái:</strong> {setStatus(selectedOrder.Status)}</div>
                        <div><strong>Phương thức thanh toán:</strong> {selectedOrder.paymentMethod}</div>
                        <div><strong>Địa chỉ giao hàng:</strong> {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.country}</div>
                        <div><strong>thời gian đặt hàng:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</div>
                        {/* <div><strong>:</strong> {new Date(selectedOrder.updatedAt).toLocaleDateString()}</div> */}
                        {/* <div><strong>Paid:</strong> {selectedOrder.isPaid ? "Yes" : "No"}</div>
                        <div><strong>Delivered:</strong> {selectedOrder.isDelivered ? "Yes" : "No"}</div> */}
                        <div style={{ marginTop: '20px' }}>
                            <div className="mt-2 mb-2 rounded d-flex flex-row bd-highlight items-center" style={{ backgroundColor: '#e0e0e0', width: '100%', height: '40px' }}>
                                <div className='d-flex justify-center' style={{ width: '40%' }}>
                                    Sản phẩm
                                </div>
                                <div className='d-flex justify-center' style={{ width: '15%' }}>
                                    Giá
                                </div>
                                <div className='d-flex justify-center' style={{ width: '15%' }}>
                                    Số lượng
                                </div>
                                <div className='d-flex justify-center' style={{ width: '15%' }}>
                                    Tổng tiền
                                </div>
                                <div className='d-flex justify-center' style={{ width: '15%' }}>
                                    Actions
                                </div>
                            </div>
                            {selectedOrder.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="item mt-2 mb-2 rounded d-flex flex-row bd-highlight items-center p-2" style={{ backgroundColor: '#f5f5f5', width: '100%', height: 'auto' }}>
                                    <div className='d-flex flex-row items-center' style={{ width: '40%' }}>
                                        <div className='h-140 d-flex flex-row items-center' style={{ height: '140px' }}>
                                            <div className='mr-2 d-block' style={{ width: '160px' }}>
                                                <img
                                                    style={{ maxHeight: '140px', maxWidth: '160px' }}
                                                    src={'http://localhost:5000' + item.image || ''}
                                                    alt={item.name}
                                                    className="p-1"
                                                />
                                            </div>
                                            <div className="card-text h-8" style={{
                                                width: '130px',
                                                fontSize: '12px',
                                                textAlign: 'left',
                                                WebkitLineClamp: '2',
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                margin: '0',
                                                wordWrap: 'break-word'
                                            }}>
                                                {item.name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-center' style={{ width: '15%' }}>
                                        {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className=' text-orange-1000' style={{ verticalAlign: "super" }}>đ</span>
                                    </div>
                                    <div className='d-flex justify-center' style={{ width: '15%' }}>
                                        {item.quantity}
                                    </div>
                                    <div className='d-flex justify-center' style={{ width: '15%' }}>
                                        {(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className=' text-orange-1000' style={{ verticalAlign: "super" }}>đ</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='d-flex justify-end' style={{ width: '100%', marginTop: '20px' }}>
                            <strong>Tổng thanh toán:</strong> <span className='text-red-600'>{(selectedOrder.totalPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span><span className=' text-orange-800' style={{ verticalAlign: "super" }}>đ</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MyOrder;
