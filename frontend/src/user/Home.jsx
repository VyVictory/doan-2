import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from './css/Home.module.css'; // Import CSS module
import axios from 'axios';
import GetProduct from '../module/getproduct';

function Home() {
    const [sanpham, setSanpham] = useState([]); // Initialize sanpham as an empty array
    const [urlpicture, setUrlpicture] = useState('http://localhost:upload/product/');
    const { sanphams } = GetProduct();
    const webpage = (a, b, c) => {
        // Chuyển hướng ở đây
        window.location.href = '/xemchitiet?' + 'chitietproduct=' + a;
    };
    console.log(sanphams)
    return (
        <div className="Home">
            <div className="d-flex" >
                <div className="container mt-1 bg-light border p-2 shadow-sm mb-5 bg-body rounded">
                    <div>
                        cac event
                    </div>

                    <div className="container  ">
                        <label htmlFor="cardTitle"><h2>Gợi ý hôm nay</h2></label>
                        <div className="container d-flex flex-wrap">
                            {sanphams.length > 0 ? (
                                    sanphams.map((e) => (
                                        <button onClick={() => webpage(e._id, e.name, 0)} className={`${styles.hoversp} container card m-2`} style={{ width: "12rem", maxWidth: "12rem", overflow: 'hidden' }}>
                                            <div className='card-img-top d-block justify-content-center h-140' style={{ 'height': '140px' }}>
                                                <img style={{ maxWidth: '140px', minWidth: '140px', maxHeight: '140px' }} src={urlpicture + e.image} className="p-1" alt={urlpicture + e.image} />
                                            </div>
                                            <div className="card-body" >
                                                <div className="card-text" style={{ fontSize: '12px', textAlign: 'left', '-webkit-line-clamp': '2', overflow: 'hidden', display: '-webkit-box', '-webkit-box-orient': 'vertical', margin: '0' }}>
                                                    Some quick example text to build on the card title and make up the bulk of the card's content.
                                                </div>
                                                <h5 className="card-text mt-4 mb-2 text-truncate" style={{ 'max-width': '130px' }}>
                                                    {e.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span style={{ verticalAlign: "super" }}>đ</span>
                                                </h5>
                                                <a href="#" className="btn btn-primary">Go somewhere</a>
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
        </div >
    );
}

export default Home;


