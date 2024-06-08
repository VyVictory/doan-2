import styles from './css/seller.module.css'; // Import CSS modules
import stylecenter from './css/sellercenter.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import trash_0 from './imgseller/recycle-bin.png'
import useProfile from '../module/profile.module';
import { DeleteProductById } from '../module/deleteproductById';

const Qlsp = () => {
    const { profile } = useProfile();
    const [list, setList] = useState('tatca'); // Initialize list as 'tatca'

    const handleSetList = (value) => {
        setList(value);
    };
    const handleDeleteProductByid = async (id, name) => {
        try {
            await DeleteProductById({ idproduct: id });
            toast.success(`Xóa sản phẩm ${name} thành công!`, { autoClose: 2000 });
            //cap nhat lai danh sach
            setSanpham(sanpham.filter(product => product._id !== id));
        } catch (error) {
            console.error(error);
            toast.error(`Xóa sản phẩm ${name} thất bại.`, { autoClose: 2000 });
        }
    };
    const cellStyle = {
        maxWidth: '200px',
        wordWrap: 'break-word',
    };
    const [sanpham, setSanpham] = useState([]); // Initialize sanpham as an empty arrayy
    console.log(profile._id)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/shop/${profile._id}`, { withCredentials: true });
                if (response.data) {
                    const sortedSanpham = response.data.sort((a, b) => {
                        const nameA = a.name.toUpperCase(); // Chuyển tên sản phẩm thành chữ hoa để so sánh không phân biệt hoa thường
                        const nameB = b.name.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return a.price - b.price; // Tên bằng nhau thì so sánh giá
                    });
                    setSanpham(sortedSanpham);
                } else {
                    alert('No data found');
                }
            } catch (err) {
                console.log(err);
            }
        };

        if (profile && profile._id) {
            fetchData();
        }
    }, [profile]); // Dependency array with profile to refetch if profile changes
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
             <ToastContainer />
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

                                            {
                                                sanpham.length > 0 ? (
                                                    sanpham.map((product, index) => (
                                                        <tr key={index}>
                                                            <td style={cellStyle}>
                                                                <div className='d-flex flex-column justify-center'>
                                                                    <div className='d-flex justify-center'>
                                                                        <img style={{ maxHeight: '100px', maxWidth: '200px' }} src={'http://localhost:5000' + product.image}></img>
                                                                    </div>

                                                                    {product.name}
                                                                </div>

                                                            </td>
                                                            <td >
                                                                {product.category.name}
                                                            </td>
                                                            <td>{(product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span style={{ verticalAlign: "super" }}>đ</span></td>

                                                            <td>{product.countInStock}</td>
                                                            <td>{product.quantity - product.countInStock}</td>
                                                            <td>
                                                                {product.countInStock == 0 ? (<div className='text-red-500'>Hết Hàng</div>) : (<div className='text-green-500'>Còn Hàng</div>)}

                                                            </td>
                                                            <td>
                                                                <button className='m-3' style={{ "border": "none" }}>
                                                                    <NavLink to={`/kenhnguoiban/quanlysanpham/thaydoisanpham?chitietproduct=${product._id}`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                        </svg>
                                                                    </NavLink>
                                                                </button>
                                                                <button  onClick={(e) => { handleDeleteProductByid(product._id,product.name) }} style={{ "border": "none" }}>
                                                                    <img src={trash_0} alt="Trash" style={{ width: '24px', height: '24px' }} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <p>No products available.</p>
                                                )}
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
