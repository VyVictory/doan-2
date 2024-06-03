import styles from './css/seller.module.css'; // Import CSS modu
import stylecenter from './css/sellercenter.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import trash_0 from './imgseller/recycle-bin.png'

const Qlsp = () => {

    const [list, setList] = useState('tatca'); // Initialize list as 'tatca'

    const handleSetList = (value) => {
        setList(value);
    };

    const cellStyle = {
        maxWidth: '200px',
        wordWrap: 'break-word',
    };
    const [sanpham, setSanpham] = useState([]); // Initialize sanpham as an empty array
    useEffect(() => {
        axios.get('http://localhost:5000/product')
            .then(response => {
                if (response.data) {
                    const sortedSanpham = response.data.sort((a, b) => {
                        const nameA = a.ten.toUpperCase(); // Chuyển tên sản phẩm thành chữ hoa để so sánh không phân biệt hoa thường
                        const nameB = b.ten.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return a.gia - b.gia; // Tên bằng nhau
                    });
                    setSanpham(sortedSanpham);
                } else {
                    alert('No data found');
                }
            })
            .catch(err => console.log(err));
    }, []); // Empty dependency array to run once on component mount
    const getButtonStyle = (e) => {
        return {
            marginRight: '10px',
            ...(e === "" || e === "no" ? { backgroundColor: 'green', color: 'white' } : {}),
        };
    };
    // const updatesanphamhidden = (id) => {
    //     const dataToSend = {
    //         hidden: 'yes',
    //     };

    //     axios.put('http://localhost:3000/product/' + id, dataToSend)
    //         .then(res => {}).catch(err => console.log(err));
    // };

    return (
        <div className="shadow p-3 mb-5 bg-body rounded" style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}>
            <Container fluid className='border'>
                {/* Header */}
                <Row className="text-white d-flex bg-slate-200" style={{ height: "40px", paddingTop: "10px", height: "100%" }}>
                    <Col className={`${list === 'tatca' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase mx-3`}>
                        <NavLink onClick={() => handleSetList("tatca")} className={`${list === 'tatca' ? styles.navlinkactive : styles.navlink}`}><h6 className={`${styles.hovertext} `}>Tất Cả</h6></NavLink>
                    </Col>
                    <Col className={`${list === 'danghoatdong' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase mx-3`}>
                        <NavLink onClick={() => handleSetList("danghoatdong")} className={`${list === 'danghoatdong' ? styles.navlinkactive : styles.navlink}`}><h6 className={`${styles.hovertext} `}>Đang Hoạt Động</h6></NavLink>
                    </Col>

                    <Col className={`${list === 'hethang' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase mx-3`}>
                        <NavLink onClick={() => handleSetList("hethang")} className={`${list === 'hethang' ? styles.navlinkactive : styles.navlink}`}><h6 className={`${styles.hovertext} `}>hết hàng</h6></NavLink>
                    </Col>
                    <Col className={`${list === 'choduyet' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase mx-3`}>
                        <NavLink onClick={() => handleSetList("choduyet")} className={`${list === 'choduyet' ? styles.navlinkactive : styles.navlink}`}><h6 className={`${styles.hovertext} `}>chờ duyệt</h6></NavLink>
                    </Col>
                    <Col className={`${list === 'vipham' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase mx-3`}>
                        <NavLink onClick={() => handleSetList("vipham")} className={`${list === 'vipham' ? styles.navlinkactive : styles.navlink}`}><h6 className={`${styles.hovertext} `}>vi phạm</h6></NavLink>
                    </Col>
                    <Col className={`${list === 'daan' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase mx-3`}>
                        <NavLink onClick={() => handleSetList("daan")} className={`${list === 'daan' ? styles.navlinkactive : styles.navlink}`}><h6 className={`${styles.hovertext} `}>đã ẩn</h6></NavLink>
                    </Col>
                </Row>

                {/* Body */}
                <Row>
                    <nav className="navbar navbar-expand-lg mt-2">
                        <div className="navbar-collapse w">
                            <nav className="navbar navbar-expand-lg mr-12 " style={{ width: '80%', marginLeft: '2%' }}>
                                <div className="navbar-collapse d-flex felx-row ">
                                    <select id="cars" className='border w-full h-full' name="cars" style={{ "height": "41px", "width": "10%" }}>
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="fiat">Fiat</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                    <div class="relative w-full">
                                        <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                                        <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                            <span class="sr-only">Search</span>
                                        </button>
                                    </div>
                                </div>
                            </nav>
                                <div >
                                    <NavLink type="submit" className={`${styles.hover} btn btn-outline-success`} style={{ height: "40px", marginRight: "24px", paddingTop: "10px" }} to="/kenhnguoiban/quanlysanpham/themsanpham"><h6 class="mb-0">Thêm Sản Phẩm</h6></NavLink>
                                </div>
                 
                        </div>
                    </nav>
                </Row>

                <Row className='pt-3'>
                    <Col>
                        {/* Nội dung của Body */}
                        <Container fluid>
                            <Row>
                                <Col>
                                    <Table responsive bordered hover style={{ whiteSpace: 'normal' }}>
                                        <thead >
                                            <tr className='text-center'>
                                                <th >Tên Sản Phẩm</th>
                                                <th>Phân Loại Hàng</th>
                                                <th>Giá</th>
                                                <th>Kho</th>
                                                <th>Doanh Số</th>
                                                <th>Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                sanpham.map(e => (
                                                    <tr key={e.id} style={{ fontSize: '12px' }}>
                                                        <td style={cellStyle}>{e.ten}<div style={{ fontSize: '10px', color: 'gray' }}>{e.mota}</div></td>
                                                        <td style={cellStyle}>objectid:{e.loai}</td>
                                                        <td style={cellStyle}>{e.gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span style={{ verticalAlign: "super" }}>đ</span></td>
                                                        <td style={cellStyle}>{e.soluong}</td>
                                                        <td style={cellStyle}>chưa cộng</td>
                                                        <td className='text-center' style={{ cellStyle, width: "180px" }}>
                                                            <button type="button" class="btn btn-outline-success" style={getButtonStyle(e.hidden)}> {/* onClick={updatesanphamhidden(e._id)} */}
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
                                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
                                                                </svg>
                                                            </button>
                                                            <button type="button" class="btn btn-outline-success" style={{ "margin-right": "10px" }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"></path>
                                                                </svg>
                                                            </button>
                                                            <button type="button" class="btn btn-outline-danger" >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                                                                </svg>
                                                            </button>
                                                        </td>

                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default Qlsp;
