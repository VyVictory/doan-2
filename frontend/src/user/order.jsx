import React, { useState, useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import Select from 'react-select';
import axios from 'axios';
import GetAddressShip from '../module/getAddressShip';
import GetProductByIdCart from '../module/getProductByIdCart';
import PostShipping from '../module/postShipping'; // Ensure the correct path here
function Order({ offorder, listproduct }) {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [payment, setPayment] = useState('Thanh toán khi nhận hàng');
    const [phone, setPhone] = useState('');
    const [products, setProducts] = useState([]);
    const { addressship } = GetAddressShip();
    const [summoney, setSummoney] = useState(0);

    // Fetch products and calculate total price
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let productsData = [];
                for (let index = 0; index < listproduct.length; index++) {
                    const response = await GetProductByIdCart({ idproduct: listproduct[index] });
                    productsData.push(response);
                }
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products: ', error);
            }
        };

        if (listproduct.length > 0) {
            fetchProducts();
        }
    }, [listproduct]);

    useEffect(() => {
        let sum = 0;
        if (products) {
            products.forEach((item) => {
                sum += item.quantity * item.product.price;
            });
        }
        setSummoney(sum);
    }, [products]);

    // Delete product from order
    function submitdeleteproduct(idproduct) {
        setProducts(prevProducts => prevProducts.filter(item => item.product._id !== idproduct));
    }
    if (payment === '') {
        setPayment('Thanh toán khi nhận hàng');
    }
    // Confirm order and post shipping information
    async function thanhtoan() {
        if (address === '' &&phone==='' && products.length === 0) {
            return;
        } else {
            const data = {
                shippingAddress: {
                    address: address,
                    city: city,
                    postalCode: postalCode,
                    country: country
                },
                paymentMethod: payment,
                phone:phone,
                items: products.map(item => ({ _id: item.product._id, quantity: item.quantity }))
            }
            try {
                const response = await axios.post(`http://localhost:5000/api/carts/checkout`, data, { withCredentials: true });
                alert('Đặt Hàng Thành Công.');
                window.location.href='/cart';
                return response.data;
                //http://localhost:5000/api/api/orders
            } catch (error) {
                console.error('Error posting shipping:', error);
                // Handle shipping post error
            }
        }

    }
    return (
        <section style={{ backgroundColor: 'none', padding: '0', background: 'none' }}>
            <MDBContainer>
                <MDBRow className="justify-content-center align-items-center">
                    <MDBCol style={{ backgroundColor: 'none', minWidth: '1000px', padding: '0' }} lg="6">
                        <MDBCard className="mb-3 p-2" style={{ borderRadius: '.5rem', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: 'black solid 1px' }}>
                            <div style={{ width: '100%', position: 'absolute' }}>
                                <MDBBtn className="btn-close d-flex justify-content-end mr-4" color="none" aria-label="Close" onClick={offorder} style={{ float: 'right' }} />
                            </div>
                            <MDBRow className="g-0">
                                <MDBCol md="8">
                                    <MDBCardBody className="p-0 d-flex flex-column items-center justify-center">
                                        <MDBTypography tag="h5" className='pt-3 pb-2 text-gray-600'>Danh sách sản phẩm</MDBTypography>
                                        <div className="mt-2 rounded d-flex flex-row bd-highlight items-center border-bottom" style={{ backgroundColor: 'white', width: '100%', height: '40px' }}>
                                            <div className='d-flex justify-center' style={{ width: '35%' }} key="product">
                                                Sản phẩm
                                            </div>
                                            <div className='d-flex justify-center' style={{ width: '25%' }} key="price">
                                                Đơn giá
                                            </div>
                                            <div className='d-flex justify-center' style={{ width: '20%' }} key="quantity">
                                                Số lượng
                                            </div>
                                            <div className='d-flex justify-center' style={{ width: '25%' }} key="action">
                                                Thao tác
                                            </div>
                                        </div>
                                        <div className='w-full pr-2  pb-2' style={{ maxHeight: '400px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                            {products.map((item, index) => (
                                                <div className='border mb-2 rounded d-flex flex-column'>
                                                    <div key={index} className=" d-flex flex-row bd-highlight items-center p-2 pb-0" style={{ backgroundColor: 'white', width: '100%', height: 'auto' }}>

                                                        <div className='d-flex flex-row items-center' style={{ width: '35%' }}>
                                                            {/* <input
                                                                style={{ width: '30px', height: '30px' }}
                                                                class="form-check-input ml-2 mr-2"
                                                                type="checkbox"
                                                                id={"checkbox" + index}
                                                            /> */}
                                                            <div onClick={(e) => { window.location.href("/xemchitiet?chitietproduct=" + item.product._id) }}
                                                                className='d-flex flex-column items-center'>
                                                                <div className='mr-2 d-block' style={{ width: '160px' }}>
                                                                    <img
                                                                        style={{ maxHeight: '140px', maxWidth: '160px' }}
                                                                        src={"http://localhost:5000" + item.product.image}
                                                                        className="p-1"
                                                                    />

                                                                </div>

                                                                <div
                                                                    className="card-text"
                                                                    style={{
                                                                        width: '150px', // Thêm chiều rộng cho phần chứa văn bản
                                                                        fontSize: '12px',
                                                                        textAlign: 'left',
                                                                        WebkitLineClamp: '2',
                                                                        overflow: 'hidden',
                                                                        display: '-webkit-box',
                                                                        WebkitBoxOrient: 'vertical',
                                                                        margin: '0',
                                                                        wordWrap: 'break-word'
                                                                    }}
                                                                >
                                                                    {item.product.name}
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='d-flex justify-center' style={{ width: '20%' }}>
                                                            {(item.product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className=' text-orange-800' style={{ verticalAlign: "super" }}>đ</span>

                                                        </div>
                                                        <div className='d-flex justify-center' style={{ width: '25%' }}>
                                                            {item.quantity}
                                                        </div>
                                                        <div className='d-flex justify-center' style={{ width: '20%' }}>
                                                            <button
                                                                onClick={(e) => { submitdeleteproduct(item.product._id) }}
                                                                title="Xóa khỏi thanh toán " className='border rounded w-10 h-10 d-flex items-center justify-center mr-2'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-6">
                                                                    <path d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                                </svg>
                                                            </button>
                                                            <a href={'http://localhost:3000/xemchitiet?chitietproduct=' + item.product._id} title="Xem Chi tiết" className='border rounded w-10 h-10 d-flex items-center justify-center'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-6">
                                                                    <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                                                </svg>
                                                            </a>

                                                        </div>

                                                    </div>
                                                    <div className='w-full d-flex flex-row-reverse bd-highlight pr-2 pb-2 mt-2 pt-2' style={{ float: 'right', borderTop: 'dashed #E2E2E2 1px' }}>
                                                        <div className='bd-highlight pr-2 d-flex flex-row'>
                                                            <div className='text-green-1000'>
                                                                Thành tiền:
                                                            </div>
                                                            <div className=' text-red-600 d-flex flex-row'>
                                                                {(item.quantity * item.product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className=' text-orange-800' style={{ verticalAlign: "super" }}>đ</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>





                                    </MDBCardBody>
                                </MDBCol>
                                <MDBCol md="4" className='border-start'>

                                    <MDBCardBody className="pl-5 pr-2 d-flex flex-column items-center justify-center">

                                        <MDBTypography tag="h5" className='pt-4 pb-2 text-gray-600'>Thông tin thanh toán</MDBTypography>

                                        <div className='w-full mt-3 p-2 pt-2 pb-2 border'>
                                            <div className="form-group mb-3 bd-highlight">
                                                <MDBTypography tag="h6">Địa chỉ giao hàng:</MDBTypography>
                                                <Select
                                                    options={addressship.map(a => ({ label: a.street, value: `${a.street}, ${a.city}, ${a.apartment}, ${a.countries}` }))}
                                                    placeholder="Chọn đường"
                                                    value={{ value: `${address}, ${city}, ${postalCode}, ${country}`, label: address }}
                                                    onChange={(selectedOption) => {
                                                        const selectedAddress = selectedOption.value.split(", ");
                                                        setAddress(selectedAddress[0]);
                                                        setCity(selectedAddress[1]);
                                                        setPostalCode(selectedAddress[2]);
                                                        setCountry(selectedAddress[3]);
                                                    }}
                                                />
                                            </div>

                                            <div className="form-group mb-3 me-auto">
                                                <MDBTypography tag="h6">Chọn phương thức thanh toán:</MDBTypography>
                                                <select
                                                    onChange={(e) => setPayment(e.target.value)}
                                                    className="form-control"
                                                    id="payment"
                                                    value={payment} // Set the selected value to the state variable
                                                    required
                                                >
                                                    <option value="">Chọn phương thức thanh toán</option>
                                                    <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option> {/* Default empty option */}

                                                    {/* <option value="PaymentCard">Thanh toán bằng thẻ</option> */}
                                                </select>
                                            </div>

                                            <div className="form-group mb-3 me-auto">
                                                <MDBTypography tag="h6">Số điện thoại liên hệ</MDBTypography>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="phone"
                                                    placeholder="Nhập số điện thoại"
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className='w-full mt-2 d-flex flex-row justify-center'>
                                            <MDBTypography tag="h7" className='ml-2 pb-2 text-gray-600'>Tổng thanh toán:</MDBTypography>
                                            <span className='text-red-600'>{(summoney).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span><span className='text-origin-800' style={{ verticalAlign: "super" }}>đ</span>
                                        </div>

                                        <button onClick={thanhtoan} className='btn btn-success mb-4'>Xác Nhận</button>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};

export default Order;
