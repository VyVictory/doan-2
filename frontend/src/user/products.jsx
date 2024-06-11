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

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products?pageNumber=${currentPage}`);
                console.log(response)
                setTotalPages(response.data.pages)
                if (response.data && response.data.products) {
                    // Lọc sản phẩm theo tên
                    const filteredProducts = response.data.products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()) && product.Approve === true && product.countInStock !== 0);
                    setSanphams(filteredProducts);
                } else {
                    console.error('No data found');
                    setSanphams([]);
                }
            } catch (err) {
                console.error(err);
                setSanphams([]);
            }
        };
        fetchProductList();
    }, [name]); // Chạy lại useEffect khi tham số name thay đổi

    const webpage = (id, name, value) => {
        window.location.href = `/xemchitiet?chitietproduct=${id}`;
    };
    const handlePageChange = async (page) => {
        setCurrentPage(page);
        try {
            const response = await axios.get(`http://localhost:5000/api/products?pageNumber=${page}`);
            setTotalPages(response.data.pages);
            if (response.data && response.data.products) {
                const filteredProducts = response.data.products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()) && product.Approve === true && product.countInStock !== 0);
                setSanphams(filteredProducts);
            } else {
                console.error('No data found');
                setSanphams([]);
            }
        } catch (err) {
            console.error(err);
            setSanphams([]);
        }
    };


    const renderPageButtons = () => {
        const buttons = [];
        const maxButtons = 5; // Maximum number of buttons to display
        const halfMaxButtons = Math.floor(maxButtons / 2);

        if (totalPages <= maxButtons) {
            // If total pages are less than or equal to maxButtons, display all buttons
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <button key={i} onClick={() => handlePageChange(i)} className={`btn btn-danger m-2 ${currentPage === i ? styles.activePage : styles.pageButton}`}>
                        {i}
                    </button>
                );
            }
        } else {
            // Display a limited number of buttons with first, last, and a range around the current page
            if (currentPage <= halfMaxButtons) {
                // Display buttons from 1 to maxButtons
                for (let i = 1; i <= maxButtons; i++) {
                    buttons.push(
                        <button key={i} onClick={() => handlePageChange(i)} className={`btn btn-danger m-2 ${currentPage === i ? styles.activePage : styles.pageButton}`}>
                            {i}
                        </button>
                    );
                }
            } else if (currentPage >= totalPages - halfMaxButtons) {
                // Display buttons from (totalPages - maxButtons + 1) to totalPages
                for (let i = totalPages - maxButtons + 1; i <= totalPages; i++) {
                    buttons.push(
                        <button key={i} onClick={() => handlePageChange(i)} className={`btn btn-danger m-2 ${currentPage === i ? styles.activePage : styles.pageButton}`}>
                            {i}
                        </button>
                    );
                }
            } else {
                // Display buttons around the current page
                const startPage = currentPage - halfMaxButtons;
                const endPage = currentPage + halfMaxButtons;
                for (let i = startPage; i <= endPage; i++) {
                    buttons.push(
                        <button key={i} onClick={() => handlePageChange(i)} className={`btn btn-danger m-2 ${currentPage === i ? styles.activePage : styles.pageButton}`}>
                            {i}
                        </button>
                    );
                }
            }
        }

        return buttons;
    };



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
