import React, { useState, useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import Select from 'react-select';
import axios from 'axios';
import GetAddressShip from '../module/getAddressShip';
import GetProductByIdCart from '../module/getProductByIdCart';
import { PostCar } from '../module/postcart';
import GetProduct from '../module/getproduct';
function OrderOneProduct({ offorder, listproduct, numberproduct }) {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [payment, setPayment] = useState('Thanh toán khi nhận hàng');
    const [phone, setPhone] = useState('');
    const [item, setItem] = useState([]);
    const { addressship } = GetAddressShip();

    // Fetch products and calculate total price useEffect(() => {
    useEffect(() => {
        const fetchProductList = async () => {
            const { sanpham } = await GetProduct();
            setItem(sanpham);
        };
        fetchProductList();
    }, []);

    if (payment === '') {
        setPayment('Thanh toán khi nhận hàng');
    }
    // Confirm order and post shipping information
    async function thanhtoan() {
        if (address === '' && phone == '') {
            return;
        } else {
            const data = {
                shippingAddress: {
                    address: address,
                    city: city,
                    postalCode: postalCode,
                    country: country,
                    phone: phone
                },
                paymentMethod: payment,
                items: listproduct
            }
            console.log(data);
            console.log("truoc cai nay");
            try {
                await PostCar({ idproduct: listproduct[0]._id, numberproduct: listproduct[0].quantity });
                const response = await axios.post(`http://localhost:5000/api/carts/checkout`, data, { withCredentials: true });
                alert('Đặt Hàng Thành Công.');
                window.location.href = `/xemchitiet?chitietproduct=${listproduct[0]._id}`;
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
                                            <div className='d-flex justify-center' style={{ width: '30%' }} key="price">
                                                Đơn giá
                                            </div>
                                            <div className='d-flex justify-center' style={{ width: '30%' }} key="quantity">
                                                Số lượng
                                            </div>
                                        </div>
                                        <div className='w-full pr-2  pb-2' style={{ maxHeight: '400px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

                                            <div className='border mb-2 rounded d-flex flex-column'>
                                                <div className=" d-flex flex-row bd-highlight items-center p-2 pb-0" style={{ backgroundColor: 'white', width: '100%', height: 'auto' }}>

                                                    <div className='d-flex flex-row items-center' style={{ width: '35%' }}>
                                                        {/* <input
                                                                style={{ width: '30px', height: '30px' }}
                                                                class="form-check-input ml-2 mr-2"
                                                                type="checkbox"
                                                                id={"checkbox" + index}
                                                            /> */}
                                                        <div
                                                            className='d-flex flex-column items-center'>
                                                            <div className='mr-2 d-block' style={{ width: '160px' }}>
                                                                <img
                                                                    style={{ maxHeight: '140px', maxWidth: '160px' }}
                                                                    src={"http://localhost:5000" + item.image}
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
                                                                {item.name}
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='d-flex justify-center' style={{ width: '30%' }}>
                                                        {item.price && item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className=' text-orange-800' style={{ verticalAlign: "super" }}>đ</span>
                                                    </div>
                                                    <div className='d-flex justify-center ' style={{ width: '30%' }}>
                                                        {numberproduct}
                                                    </div>

                                                </div>
                                            </div>

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
                                            <span className='text-red-600'>{(numberproduct * item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span><span className='text-origin-800' style={{ verticalAlign: "super" }}>đ</span>
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

export default OrderOneProduct;
