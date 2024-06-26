import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import trash_0 from './imgseller/recycle-bin.png';
import useProfile from '../module/profile.module';
import { DeleteProductById } from '../module/deleteproductById';

const Qlsp = () => {
    const { profile } = useProfile();
    const [list, setList] = useState('tatca');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSanpham, setFilteredSanpham] = useState([]);
    const [sanpham, setSanpham] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState('name');
    const [searchValue, setSearchValue] = useState('');

    const handleSetList = (value) => {
        setList(value);
    };

    const handleDeleteProductByid = async (id, name) => {
        try {
            await DeleteProductById({ idproduct: id });
            toast.success(`Xóa sản phẩm ${name} thành công!`, { autoClose: 2000 });
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/shop/${profile._id}`, { withCredentials: true });
                if (response.data) {
                    const sortedSanpham = response.data.sort((a, b) => {
                        const nameA = a.name.toUpperCase();
                        const nameB = b.name.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return a.price - b.price;
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
    }, [profile]);

    useEffect(() => {
        if (searchTerm) {
            setFilteredSanpham(
                sanpham.filter(product =>
                    product[searchCriteria].toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredSanpham(sanpham);
        }
    }, [searchTerm, searchCriteria, sanpham]);

    const handleSearch = () => {
        setSearchTerm(searchValue);
    };

    return (
        <div className="shadow p-3 mb-5 bg-body rounded" style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>
            <ToastContainer />
            <Container fluid className="border">
                <Row className="text-white d-flex bg-slate-200" style={{ height: '40px', paddingTop: '10px', height: '100%' }}>
                    {/* Navigation links */}
                </Row>

                <Row>
                    <nav className="navbar navbar-expand-lg mt-2">
                        <div className="navbar-collapse w">
                            <nav className="navbar navbar-expand-lg mr-12 " style={{ width: '80%', marginLeft: '2%' }}>

                                <select
                                    id="search-criteria"
                                    value={searchCriteria}
                                    onChange={(e) => setSearchCriteria(e.target.value)}
                                    className='border w-full h-full' name="cars" style={{ height: "41px", maxWidth: "20%" }}>
                                    <option value="name">Tên Sản Phẩm</option>
                                    <option value="price">Giá</option>
                                    <option value="countInStock">Kho</option>
                                    <option value="quantity">Đã Bán</option>
                                </select>
                                <div className="relative w-full">
                                    <input
                                        type="search"
                                        id="search-dropdown"
                                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                        placeholder="Nội Dung Tìm Kiếm"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={handleSearch}
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </nav>
                            <div>
                                <NavLink
                                    type="submit"
                                    className="btn btn-outline-success text-nowrap"
                                    style={{ height: '40px', marginRight: '24px', paddingTop: '10px' }}
                                    to="/kenhnguoiban/quanlysanpham/themsanpham"
                                >
                                    <h6 className="mb-0">Thêm Sản Phẩm</h6>
                                </NavLink>
                            </div>
                        </div>
                    </nav>
                </Row>
                <Row className="pt-3">
                    <Col>
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
                                                filteredSanpham.length > 0 ? (
                                                    filteredSanpham.map((product, index) => (
                                                        <tr key={index}>
                                                            <td style={cellStyle}>
                                                                <div className='d-flex flex-column justify-center'>
                                                                    <div className='d-flex justify-center'>
                                                                        <img style={{ maxHeight: '100px', maxWidth: '200px' }} src={'http://localhost:5000' + product.image} alt="Product" />
                                                                    </div>
                                                                    {product.name}
                                                                </div>
                                                            </td>
                                                            <td>{product.category.name}</td>
                                                            <td>{(product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span style={{ verticalAlign: "super" }}>đ</span></td>
                                                            <td>{product.countInStock}</td>
                                                            <td>{product.quantity - product.countInStock}</td>
                                                            <td>
                                                                {product.countInStock === 0 ? (<div className='text-red-500'>Hết Hàng</div>) : (<div className='text-green-500'>Còn Hàng</div>)}
                                                            </td>
                                                            <td>
                                                                <button className='m-3' style={{ "border": "none" }}>
                                                                    <NavLink to={`/kenhnguoiban/quanlysanpham/thaydoisanpham?chitietproduct=${product._id}`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                        </svg>
                                                                    </NavLink>
                                                                </button>
                                                                <button onClick={() => handleDeleteProductByid(product._id, product.name)} style={{ "border": "none" }}>
                                                                    <img src={trash_0} alt="Trash" style={{ width: '24px', height: '24px' }} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7" className="text-center">No products available.</td>
                                                    </tr>
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
    );
};

export default Qlsp;
