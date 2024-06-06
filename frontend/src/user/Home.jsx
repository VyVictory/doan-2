import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from './css/Home.module.css'; // Import CSS module
import axios from 'axios';
import GetProducts from '../module/getProducts';
import renderRatingStars from '../allview/renderRatingStart';
import TopProduct from './topProduct';
function Home() {
    const [urlpicture, setUrlpicture] = useState('http://localhost:5000');
    const [sanphams, setSanphams] = useState([]);
    useEffect(() => {
        const fetchProductList = async () => {
            const { sanphams } = await GetProducts();
            setSanphams(sanphams);
        };
        fetchProductList();
    }, []);
    //console.log(sanphams)
    const webpage = (a, b, c) => {
        // Chuyển hướng ở đây
        window.location.href = '/xemchitiet?' + 'chitietproduct=' + a;
    };
    return (
        <div className="Home">
            <div className="d-flex">
                <div className="container mt-1 bg-light border p-2 shadow-sm mb-5 bg-body rounded">
                    <div>
                        cac event
                    </div>
                    <TopProduct />
                    <div className="container">
                        <label htmlFor="cardTitle"><h2>Gợi ý hôm nay</h2></label>
                        <div className="container d-flex flex-wrap">
                            {sanphams.length > 0 ? (
                                sanphams.map((e) => (
                                    <button
                                        key={e._id}
                                        onClick={() => webpage(e._id, e.name, 0)}
                                        className={`${styles.hoversp} container card m-2 d-flex justify-center`}
                                        style={{ width: "12rem", maxWidth: "12rem", overflow: 'hidden' }}
                                    >
                                        <div className='card-img-top d-flex justify-center h-140' style={{ height: '140px' }}>
                                            <img
                                                style={{ maxWidth: '140px', minWidth: '140px', maxHeight: '140px' }}
                                                src={urlpicture + e.image}
                                                className="p-1"
                                                alt={e.name}
                                            />
                                        </div>
                                        <div className="card-body d-flex justify-center flex-column w-full">
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
                                                {e.description}
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
                                            <h5 className="card-text mb-2 text-truncate" style={{ maxWidth: '130px' }}>
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
                </div>
            </div>
        </div>
    );
}

export default Home;


