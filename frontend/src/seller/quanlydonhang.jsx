import React, { useState } from 'react';
import styles from './css/seller.module.css'; // Import CSS module
import stylecenter from './css/sellercenter.module.css';
import img_search from "../user/imguser/bar/magnifying-glass.png"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Qldonhang = () => {
    const [list, setList] = useState([]);
    if (list === '') {
        setList('tatca');
    }
    const handleSetList = (value) => {
        setList(value);
    };
    const cellStyle = {
        maxWidth: '200px',
        wordWrap: 'break-word',
    };
    return (
        <div className="shadow p-3 mb-5 bg-body rounded" style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}>
            <Container fluid className='border'>
                {/* Header */}
                <Row className="text-white d-flex bg-slate-200" style={{ height: "40px"}}>
                    <Col className={`${list === 'tatca' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase small fw-bold`}>
                        <NavLink onClick={() => handleSetList("tatca")} className={`${list === 'tatca' ? styles.navlinkactive : styles.navlink}`}>
                            <div className={`${styles.hovertext}`}>Tất Cả</div>
                        </NavLink>
                    </Col>
                    <Col className={`${list === 'choxacnhan' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase small fw-bold`}>
                        <NavLink onClick={() => handleSetList("choxacnhan")} className={`${list === 'choxacnhan' ? styles.navlinkactive : styles.navlink}`}>
                            <div className={`${styles.hovertext}`}>Chờ Xác Nhận</div>
                        </NavLink>
                    </Col>
                    {/* <Col className={`${list === 'cholayhang' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase small fw-bold`}>
                        <NavLink onClick={() => handleSetList("cholayhang")} className={`${list === 'cholayhang' ? styles.navlinkactive : styles.navlink}`}>
                            <div className={`${styles.hovertext}`}>Chờ Lấy Hàng</div>
                        </NavLink>
                    </Col> */}
                    <Col className={`${list === 'danggiao' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase small fw-bold`}>
                        <NavLink onClick={() => handleSetList("danggiao")} className={`${list === 'danggiao' ? styles.navlinkactive : styles.navlink}`}>
                            <div className={`${styles.hovertext}`}>Đang Giao</div>
                        </NavLink>
                    </Col>
                    <Col className={`${list === 'dagiao' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase small fw-bold`}>
                        <NavLink onClick={() => handleSetList("dagiao")} className={`${list === 'dagiao' ? styles.navlinkactive : styles.navlink}`}>
                            <div className={`${styles.hovertext}`}>Đã Giao</div>
                        </NavLink>
                    </Col>
                    <Col className={`${list === 'dahuy' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase small fw-bold`}>
                        <NavLink onClick={() => handleSetList("dahuy")} className={`${list === 'dahuy' ? styles.navlinkactive : styles.navlink}`}>
                            <div className={`${styles.hovertext}`}>Đã Hủy</div>
                        </NavLink>
                    </Col>
                    <Col className={`${list === 'trahang' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase small fw-bold`}>
                        <NavLink onClick={() => handleSetList("trahang")} className={`${list === 'trahang' ? styles.navlinkactive : styles.navlink}`}>
                            <div className={`${styles.hovertext}`}>Trả Hàng/Hoàn Tiền</div>
                        </NavLink>
                    </Col>
                    <Col className={`${list === 'giaokhongthanhcong' ? styles.gachchanactive : styles.gachchan} text-center align-content-center text-uppercase small fw-bold`}>
                        <NavLink onClick={() => handleSetList("giaokhongthanhcong")} className={`${list === 'giaokhongthanhcong' ? styles.navlinkactive : styles.navlink}`}>
                            <div className={`${styles.hovertext}`}>Giao Không Thành Công</div>
                        </NavLink>
                    </Col>
                </Row>

                {/* Body */}
                <Row className='justify-center'>
                    <nav className="navbar navbar-expand-lg mt-3" style={{ width: '96%' }}>
                        <div className="navbar-collapse d-flex flex-row">
                            <select id="cars" className='border w-full h-full' name="cars" style={{ height: "41px", width: "10%" }}>
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="fiat">Fiat</option>
                                <option value="audi">Audi</option>
                            </select>
                            <div className="relative w-full">
                                <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                                <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
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
                                    <Table responsive striped bordered hover style={{ whiteSpace: 'normal' }}>
                                        <thead>
                                            <tr className='text-center'>
                                                <th>Sản Phẩm</th>
                                                <th>Tổng Đơn Hàng</th>
                                                <th>Trạng Thái</th>
                                                <th>Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={cellStyle}>1</td>
                                                <td style={cellStyle}>aa</td>
                                                <td style={cellStyle}>Otto</td>
                                                <td style={cellStyle}>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td style={cellStyle}>2</td>
                                                <td style={cellStyle}>Jacob</td>
                                                <td style={cellStyle}>Thornton</td>
                                                <td style={cellStyle}>@fat</td>
                                            </tr>
                                            <tr>
                                                <td style={cellStyle}>3</td>
                                                <td style={cellStyle}>Larry</td>
                                                <td style={cellStyle}>the Bird</td>
                                                <td style={cellStyle}>@twitter</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Qldonhang;
