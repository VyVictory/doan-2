import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn, MDBTooltip } from 'mdb-react-ui-kit';
function Order({ offorder,listproduct,  }) {
    return (
        <section style={{ backgroundColor: 'none', padding: '0', background: 'none', }}>
            <MDBContainer >
                <MDBRow className="justify-content-center align-items-center">
                    <MDBCol style={{ backgroundColor: 'none', minWidth: '500px', padding: '0' }} lg="6">
                        <MDBCard className="mb-3 p-2" style={{ borderRadius: '.5rem', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border:'black solid 1px' }}>
                            <div style={{ width: '100%', position: 'absolute' }}>
                                <MDBBtn className="btn-close d-flex justify-content-end mr-4" color="none" aria-label="Close" onClick={offorder} style={{ float: 'right' }} />
                            </div>
                            <MDBRow className="g-0">
                                {/* <MDBCol md="7" className='border-start'>
                                    <MDBCardBody className="p-0 d-flex flex-column items-center justify-center">
                                        <MDBTypography tag="h5" className='pt-3 pb-2 text-gray-600'>Thông tin sản phẩm</MDBTypography>
                                        <hr className="mt-0 mb-2 w-full" />
                                        <div className='w-full p-5 pt-2 pb-2'>
                                           
                                        </div>
                                      
                                    </MDBCardBody>
                                </MDBCol> */}
                                <MDBCol md="12">
                                    <MDBCardBody className="p-0 d-flex flex-column items-center justify-center">
                                        <MDBTypography tag="h5" className='pt-3 pb-2 text-gray-600'>Thông tin thanh toán</MDBTypography>
                                        {/* <hr className="mt-0 mb-2 w-full" /> */}
                                        <div className='w-full p-5 pt-2 pb-2'>
                                            <div className="form-group mb-2 bd-highlight">
                                                <MDBTypography tag="h6">Địa chỉ giao hàng:</MDBTypography>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="address"
                                                    placeholder="nhập địa chỉ giao hàng"
                                                //   value={phone}
                                                //   onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group mb-2 me-auto">
                                                <MDBTypography tag="h6">Chọn phương thức thanh toán:</MDBTypography>
                                                <select
                                                    className="form-control"
                                                    id="payment"
                                                // value={gender}
                                                //  onChange={(e) => setGender(e.target.value)}
                                                >
                                                    <option value="Offline">Thanh toán khi nhận hàng: </option>
                                                    <option value="PaymentCard">Thanh toán bằng thẻ: </option>
                                                </select>
                                            </div>
                                            {/* <MDBTypography tag="h6">Information</MDBTypography> */}
                                            <div className="form-group mb-2 me-auto">
                                                <MDBTypography tag="h6">Phương thức liên hệ</MDBTypography>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="phone"
                                                    placeholder="nhập số điện thoại"
                                                // value={email}
                                                // onChange={(e) => setEmail(e.target.value)}
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