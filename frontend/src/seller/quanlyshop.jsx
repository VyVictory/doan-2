
import React, { useState } from 'react';
import styles from './css/seller.module.css'; // Import CSS modu
import stylecenter from './css/sellercenter.module.css';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Qlshop = () => {

    const [list, setList] = useState([]);
    if(list==''){
        setList('tatca')
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
                <Row className="text-white d-flex" style={{ height: "40px", paddingTop: "10px", borderBottom: "gray 1px solid", height: "100%" }}>
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
                <Row><nav className="navbar navbar-expand-lg mt-2">

                    <div className="navbar-collapse">
                        <div className="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft:"24px"}}>
                            HOME
                        </div>

                        <button type="submit" className={`${styles.hover} btn btn-outline-success`} aria-label="Search" style={{ height: "40px", marginRight: "24px"}}>
                            <span className="">
                                Thêm Sản Phẩm
                            </span>
                        </button>
                    </div>
                </nav>
                </Row>
                <Row className='pt-3'>

                    <Col>


                        {/* Nội dung của Body */}
                        <Container fluid >
                            <Row>
                                <Col>
                                    <Table responsive striped bordered hover style={{ whiteSpace: 'normal' }}>
                                        <thead>
                                            <tr className='text-center'>
                                                <th>Tên Sản Phẩm</th>
                                                <th>Phân Loại Hàng</th>
                                                <th>Giá</th>
                                                <th>Kho</th>
                                                <th>Doanh Số</th>
                                                <th>Thao Tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={cellStyle}>1</td>
                                                <td style={cellStyle}>aa</td>
                                                <td style={cellStyle}>Otto</td>
                                                <td style={cellStyle}>@mdo</td>
                                                <td style={cellStyle}>Otto</td>
                                                <td style={cellStyle}>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td style={cellStyle}>2</td>
                                                <td style={cellStyle}>Jacob</td>
                                                <td style={cellStyle}>Thornton</td>
                                                <td style={cellStyle}>@fat</td>
                                                <td style={cellStyle}>Otto</td>
                                                <td style={cellStyle}>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td style={cellStyle}>3</td>
                                                <td style={cellStyle}>Larry</td>
                                                <td style={cellStyle}>the Bird</td>
                                                <td style={cellStyle}>@twitter</td>
                                                <td style={cellStyle}>Otto</td>
                                                <td style={cellStyle}>@mdo</td>
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

export default Qlshop;
