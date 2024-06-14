import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from './css/Home.module.css'; // Import CSS module
import axios from 'axios';
import GetProducts from '../module/getProducts';
import renderRatingStars from '../allview/renderRatingStart';

function Products() {
    const [urlpicture, setUrlpicture] = useState('http://localhost:5000');
    const [sanphams, setSanphams] = useState([]);
    const name = new URLSearchParams(window.location.search).get("name");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 6; // Number of products per page

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/allproducts`);
                console.log(response)
                if (response.data && response.data) {
                    // Lọc sản phẩm theo tên
                    const filteredProducts = response.data.filter(product => product.name.toLowerCase().includes(name.toLowerCase()) && product.Approve === true && product.countInStock !== 0);
                    setSanphams(filteredProducts);
                    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
                } else {
                    console.error('No data found');
                    setSanphams([]);
                    setTotalPages(1);
                }
            } catch (err) {
                console.error(err);
                setSanphams([]);
                setTotalPages(1);
            }
        };
        fetchProductList();
    }, [name]); // Chạy lại useEffect khi tham số name thay đổi

    const webpage = (id, name, value) => {
        window.location.href = `/xemchitiet?chitietproduct=${id}`;
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageButtons = () => {
        const buttons = [];
        const maxButtons = 5; // Maximum number of buttons to display
        const halfMaxButtons = Math.floor(maxButtons / 2);

        // Logic for rendering page buttons
        // (Similar to what you already have)

        return buttons;
    };

    // Calculate start and end index of products to display for the current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = currentPage * productsPerPage;



    return (
        <div className="Home">
            <div className="d-flex">
                <div className="container mt-1 bg-transparent p-4 mb-5 bg-body rounded">
                    <div className="d-flex flex-column mt-4 pb-2 bg-white rounded">
                        <label htmlFor="cardTitle" className='d-flex justify-center mt-1'><h5 className='text-red-400'>Danh Sách Sản Phẩm</h5></label>
                        <div className="container d-flex flex-wrap justify-center">
                            {sanphams.length > 0 ? (
                                sanphams.map((e) => (
                                    <button
                                        key={e._id}
                                        onClick={() => webpage(e._id, e.name, 0)}
                                        className={`${styles.hoversp} container p-0 card m-2 d-flex justify-center `}
                                        style={{ width: "12rem", maxWidth: "12rem", maxHeight: '360px', overflow: 'hidden', backgroundColor: 'white' }}
                                    >
                                        <div className='card-img-top d-flex justify-center h-140' style={{ height: '140px' }}>
                                            <img
                                                style={{ maxHeight: '140px' }}
                                                src={urlpicture + e.image}
                                                className="p-1"
                                                alt={e.name}
                                            />
                                        </div>
                                        <div className="card-body pt-2 pb-0 pl-1 pr-1 d-flex justify-center flex-column w-full">
                                            <div
                                                className="card-text h-8"
                                                style={{
                                                    fontSize: '12px',
                                                    textAlign: 'left',
                                                    WebkitLineClamp: '2',
                                                    overflow: 'hidden',
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    margin: '0'
                                                }}
                                            >
                                                {e.name}
                                            </div>
                                            <div
                                                className="card-text mt-1"
                                                style={{
                                                    fontSize: '10px',
                                                    textAlign: 'left',
                                                    WebkitLineClamp: '2',
                                                    overflow: 'hidden',
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    margin: '0'
                                                }}
                                            >
                                                {'thương hiệu:' + e.brand}
                                            </div>
                                            <div className='d-flex flex-row justify-center mt-1'>
                                                {renderRatingStars(e.rating, 15, 15)}
                                            </div>
                                            <h5 className="card-text mb-2 ml-3 text-truncate" style={{ maxWidth: '130px' }}>
                                                {e.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span style={{ verticalAlign: "super" }}>đ</span>
                                            </h5>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <p>No products available.</p>
                            )}


                        </div>
                    </div>
                    {/* Your existing code */}
                    <div className='w-full d-flex justify-center'>
                        <div className="pagination">
                            {renderPageButtons()}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Products;
