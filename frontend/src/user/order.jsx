import React, { useState, useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import Select from 'react-select';
import GetAddressShip from '../module/getAddressShip';

function Order({ offorder, listproduct }) {
    const [address, setAddress] = useState('');
    const { addressship } = GetAddressShip();
    const [listproducts, setListproducts] = useState([]);
    useEffect(() => {
        function fetchData() {
            setListproducts(listproduct);
        }
        fetchData();
    }, [listproduct]);
    // Di chuyển console.log ra ngoài useEffect
    console.log(listproducts);
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
                                        <div className='w-full p-5 pt-2 pb-2'>
                                            {/* {nơi showw danh sách} */}
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                                <MDBCol md="4" className='border-start'>
                                    <MDBCardBody className="p-0 d-flex flex-column items-center justify-center">
                                        <MDBTypography tag="h5" className='pt-3 pb-2 text-gray-600'>Thông tin thanh toán</MDBTypography>
                                        <div className='w-full p-5 pt-2 pb-2'>
                                            <div className="form-group mb-2 bd-highlight">
                                                <MDBTypography tag="h6">Địa chỉ giao hàng:</MDBTypography>
                                                <Select
                                                    options={addressship.map(a => ({ value: a._id, label: a.street }))}
                                                    id="street"
                                                    placeholder="Chọn đường"
                                                    value={{ label: address, value: address }}
                                                    onChange={(selectedOption) => setAddress(selectedOption.label)}
                                                />
                                            </div>
                                            <div className="form-group mb-2 me-auto">
                                                <MDBTypography tag="h6">Chọn phương thức thanh toán:</MDBTypography>
                                                <select
                                                    className="form-control"
                                                    id="payment"
                                                >
                                                    <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                                                    {/* <option value="PaymentCard">Thanh toán bằng thẻ</option> */}
                                                </select>
                                            </div>
                                            <div className="form-group mb-2 me-auto">
                                                <MDBTypography tag="h6">Số điện thoại liên hệ</MDBTypography>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="phone"
                                                    placeholder="Nhập số điện thoại"
                                                />
                                            </div> 
                                        </div>
                                        <button className='btn btn-success mb-4'>Xác Nhận</button>
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
