import styles from './css/seller.module.css'; // Import CSS modules
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
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
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
                                                <th>Đã Bán</th>
                                                <th>Trạng Thái</th>
                                                <th style={{ minWidth: "60px" }}>Hành Động</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-center' style={{ wordBreak: 'break-all' }}>
                                            {sanpham.map((product, index) => (
                                                <tr key={index}>
                                                    <td style={cellStyle}>{product.ten}</td>
                                                    <td>{product.danhmuc}</td>
                                                    <td>{product.gia}</td>
                                                    <td>{product.soluongton}</td>
                                                    <td>{product.soluongban}</td>
                                                    <td>
                                                        <button style={getButtonStyle(product.hidden)}>{product.hidden == "" ? "Còn Hàng" : "Hết Hàng"}</button>
                                                    </td>
                                                    <td>
                                                        <button style={{ "border": "none" }}>
                                                            <NavLink to={`/kenhnguoiban/quanlysanpham/thaydoisanpham/${product._id}`}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l2.65 2.651-10.5 10.5H6.3v-2.651l10.5-10.5z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.487 7.137 17.862 5.512a2.25 2.25 0 0 0-3.181 0l-10.5 10.5a2.25 2.25 0 0 0-.659 1.591V18.75a.75.75 0 0 0 .75.75h2.147a2.25 2.25 0 0 0 1.591-.659l10.5-10.5a2.25 2.25 0 0 0 0-3.181z" />
                                                                </svg>
                                                            </NavLink>
                                                        </button>
                                                        <button style={{ "border": "none" }}>
                                                            <img src={trash_0} alt="Trash" style={{ width: '24px', height: '24px' }} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Qlsp;
