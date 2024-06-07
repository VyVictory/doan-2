import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from './css/Home.module.css'; // Import CSS module
import axios from 'axios';
import renderRatingStars from '../allview/renderRatingStart';
import { GetProductsTop } from '../module/getProductsTop'; // Correct the import statement

function TopProduct() {
    const [urlpicture, setUrlpicture] = useState('http://localhost:5000');
    const [sanphams, setSanphams] = useState([]);

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const { sanphams } = await GetProductsTop(); // Call the GetProductsTop function
                setSanphams(sanphams);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductList();
    }, []);

    const webpage = (id, name, index) => {
        // Navigate here
        window.location.href = `/xemchitiet?chitietproduct=${id}`;
    };

    return (
        <div className=" pb-2">
            <label htmlFor="cardTitle " className='d-flex justify-center' >
                <h2 className='m-2 mb-1 text-red-400'  >Sản Phẩm Hot</h2></label>
            <div className="  d-flex flex-wrap d-flex justify-center items-center">
                {sanphams.length > 0 ? (
                    sanphams.map((e) => (
                        <button
                            key={e._id}
                            onClick={() => webpage(e._id, e.name, 0)}
                            className={`${styles.hoversp} container card m-2 d-flex justify-center p-0`}
                            style={{ width: "12rem", maxWidth: "12rem", overflow: 'hidden',backgroundColor:'white' }}
                        >
                            <div className='card-img-top d-flex justify-center h-140' style={{ height: '140px' }}>
                                <img
                                    style={{ maxWidth: '140px', minWidth: '140px', maxHeight: '140px' }}
                                    src={urlpicture + e.image}
                                    className="p-1"
                                    alt={e.name}
                                />
                            </div>
                            <div className="card-body  pb-0 pl-1 pr-1  d-flex justify-center flex-column w-full">
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
    );
}

export default TopProduct;
