import React, { useState, useEffect } from 'react';
import {
    MDBBadge, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBTooltip,
} from "mdb-react-ui-kit";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProfileDetail from './ProfileDetail';
import GetAllProfileAmin from '../module/getAllProfileAmin';
import axios from 'axios';

export default function ListAccount() {
    const [showdetail, setShowdetail] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const { listUser, message } = GetAllProfileAmin();

    const submitshowdetail = async (e) => {
        e.preventDefault();
        setShowdetail(!showdetail);
    };

    const active = async (id, isActive) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/users/active/${id}`,
                { isActive: isActive }, // Data to be sent in the body of the request
                { withCredentials: true } // Configuration options
            );
            console.log('User activation status updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating user activation status:', error);
        }
        window.location.href = '/admin/listaccounts';
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredUsers = listUser.filter((user) => {
        const matchesSearchTerm = user.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || (filter === 'active' && user.isActive) || (filter === 'inactive' && !user.isActive);
        return matchesSearchTerm && matchesFilter;
    });

    return (
        <section className="gradient-custom-2">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="d-flex justify-content-center align-items-center">
                    <MDBCol md="12" xl="10">
                        <MDBCard className="mask-custom">
                            <MDBCardBody className="p-4 text-black">
                                <div className="text-center pt-3 pb-2 d-flex flex-row align-items-center justify-content-center">
                                    <img style={{ marginRight: '20px' }} src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp" alt="Check" height="50" width="50" />
                                    <h2 className="my-4 align-middle">Danh Sách Tài Khoản</h2>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search by username"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="form-control w-50"
                                    />
                                    <select
                                        value={filter}
                                        onChange={handleFilterChange}
                                        className="form-select w-25"
                                    >
                                        <option value="all">All</option>
                                        <option value="active">Danh Sách Đang Hoạt Động</option>
                                        <option value="inactive">Danh Sách Bị Ban</option>
                                    </select>
                                </div>
                                <MDBTable className="text-white mb-0">
                                    <MDBTableHead>
                                        <tr>
                                            <th scope="col">UserName</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Giới Tính</th>
                                            <th scope="col">Trạng Thái</th>
                                            <th scope="col">Thao Tác</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {message ? (
                                            <tr>
                                                <td colSpan="5" className="text-center">{message}</td>
                                            </tr>
                                        ) : filteredUsers.length > 0 ? (
                                            filteredUsers.map((e) => (
                                                <tr key={e._id} className="fw-normal">
                                                    <th className='d-flex flex-row align-items-center h-24'>
                                                        <img src={"http://localhost:5000" + e.avatar} alt="avatar 1" style={{ width: "45px", height: "auto" }} />
                                                        <span className="ms-2">{e.username}</span>
                                                    </th>
                                                    <td className="align-middle">
                                                        <span>{e.email}</span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <span>{e.gender === 'male' ? 'nam' : e.gender === 'female' ? 'nữ' : 'Khác'}</span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <h6 className="mb-0">
                                                            <MDBBadge className="mx-2" color={e.isActive ? "success" : "danger"}>
                                                                {e.isActive ? 'online' : 'offline'}
                                                            </MDBBadge>
                                                        </h6>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className='d-flex flex-row align-items-center'>
                                                            <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Ban-Unban">
                                                                {e.isActive
                                                                    ? <a type="button" onClick={() => active(e._id, false)} className="btn btn-danger">Ban</a>
                                                                    : <a type="button" onClick={() => active(e._id, true)} className="btn btn-success">Unban</a>}
                                                            </MDBTooltip>
                                                            <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Detail">
                                                                <svg onClick={submitshowdetail} style={{ marginLeft: '10px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                                </svg>
                                                            </MDBTooltip>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No user available.</td>
                                            </tr>
                                        )}
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
