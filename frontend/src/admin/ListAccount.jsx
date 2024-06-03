import React, { useState, useEffect } from 'react';
import { MDBBadge, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBTooltip, } from "mdb-react-ui-kit";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProfileDetail from './ProfileDetail';
export default function ListAccount() {
    const [showdetail, setShowdetail] = useState(false);
    const submitshowdetail = async (e) => {
        e.preventDefault();
        setShowdetail(!showdetail);
    }
    return (
        <section className="gradient-custom-2 vh-100">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="d-flex justify-content-center align-items-center">
                    <MDBCol md="12" xl="10">
                        <MDBCard className="mask-custom">
                            <MDBCardBody className="p-4 text-black">
                                <div className="text-center pt-3 pb-2 d-flex flex-row align-items-center justify-content-center">
                                    <img style={{ marginRight: '20px' }} src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp" alt="Check" height="50" width="50" />
                                    <h2 className="my-4 align-middle">Danh Sách Tài Khoản</h2>
                                </div>
                                <MDBTable className="text-white mb-0">
                                    <MDBTableHead>
                                        <tr>
                                            <th scope="col">UserName</th>
                                            <th scope="col">email</th>
                                            <th scope="col">Giới Tính</th>
                                            <th scope="col">Trạng Thái</th>
                                            <th scope="col" >Thao Tác</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        <tr className="fw-normal">
                                            <th className='d-flex flex-row align-items-center h-24'>
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar 1" style={{ width: "45px", height: "auto" }} />
                                                <span className="ms-2">Tên Người Dùng</span>
                                            </th>
                                            <td className="align-middle">
                                                <span>Emnail người dùng</span>
                                            </td>
                                            <td className="align-middle">
                                                <span>Nam</span>
                                            </td>
                                            <td className="align-middle">
                                                <h6 className="mb-0">
                                                    <MDBBadge className="mx-2" color="danger">
                                                        High priority
                                                    </MDBBadge>
                                                </h6>
                                            </td>
                                            <td className="align-middle">
                                                <div className=' d-flex flex-row align-items-center'>
                                                    <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Ban-Unban">
                                                        <button type="button" class="btn btn-danger">Ban</button>
                                                    </MDBTooltip>
                                                    <MDBTooltip tag="a" wrapperProps={{ href: "#" }} title="Detail ">
                                                        <svg onClick={submitshowdetail} style={{ marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                        </svg>
                                                    </MDBTooltip>
                                                    <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Chat">
                                                        <svg style={{ marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="30" height="30" class="bi bi-chat" viewBox="0 0 16 16">
                                                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                                                        </svg>
                                                    </MDBTooltip>
                                                </div>

                                            </td>
                                        </tr>

                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            {
                showdetail ?
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999, background: 'none', padding: '0px' }}
                    ><ProfileDetail offprofiledetail={submitshowdetail} />

                    </div>
                    : ''
            }
        </section>
    );
}