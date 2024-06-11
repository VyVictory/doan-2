import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBBadge, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBTooltip } from "mdb-react-ui-kit";

export default function ListAccount() {
    const [listUser, setListUser] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users', { withCredentials: true });
            setListUser(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const active = async (id, isActive) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/users/active/${id}`,
                { isActive: isActive },
                { withCredentials: true }
            );
            console.log('User activation status updated successfully.');
            fetchUsers(); // Refresh the list after updating
        } catch (error) {
            console.error('Error updating user activation status:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page when search term changes
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1); // Reset to the first page when filter changes
    };

    const filteredUsers = listUser.filter((user) => {
        const matchesSearchTerm = user.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || (filter === 'active' && user.isActive) || (filter === 'inactive' && !user.isActive);
        return matchesSearchTerm && matchesFilter;
    });

    // Calculate current items based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                                        {currentUsers.length > 0 ? (
                                            currentUsers.map((user) => (
                                                <tr key={user._id} className="fw-normal">
                                                    <th className='d-flex flex-row align-items-center h-24'>
                                                        <img src={"http://localhost:5000" + user.avatar} alt="avatar 1" style={{ width: "45px", height: "auto" }} />
                                                        <span className="ms-2">{user.username}</span>
                                                    </th>
                                                    <td className="align-middle">
                                                        <span>{user.email}</span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <span>{user.gender === 'male' ? 'nam' : user.gender === 'female' ? 'nữ' : 'Khác'}</span>
                                                    </td>
                                                    <td className="align-middle">
                                                        <h6 className="mb-0">
                                                            <MDBBadge className="mx-2" color={user.isActive ? "success" : "danger"}>
                                                                {user.isActive ? 'online' : 'offline'}
                                                            </MDBBadge>
                                                        </h6>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div className='d-flex flex-row align-items-center'>
                                                            <MDBTooltip tag="a" wrapperProps={{ href: "#!" }} title="Ban-Unban">
                                                                {user.isActive
                                                                    ? <a type="button" onClick={() => active(user._id, false)} className="btn btn-danger">Ban</a>
                                                                    : <a type="button" onClick={() => active(user._id, true)} className="btn btn-success">Unban</a>}
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
                                <ul className="pagination justify-content-center mt-4">
                                    {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                                        </li>
                                    ))}
                                </ul>
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
            {/* Pagination */}

        </section>
    );
}
