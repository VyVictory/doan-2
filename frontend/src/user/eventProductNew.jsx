import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './css/Home.module.css'; // Import CSS module
import axios from 'axios';
import renderRatingStars from '../allview/renderRatingStart';
import { GetProductsTop } from '../module/getProductsTop'; // Correct the import statement
import GetProducts from '../module/getProducts';

function EventProductNew() {
    const [urlpicture, setUrlpicture] = useState('http://localhost:5000');
    const [sanphams, setSanphams] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const { sanphams } = await GetProducts(); // Call the GetProducts function
                const approvedProducts = sanphams.filter(product => product.countInStock !==0);
    
                setSanphams(approvedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductList();
    }, []);

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 3);
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 6000);
        return () => clearInterval(interval);
    }, [currentIndex, sanphams]); // Thêm dependencies vào useEffect
    
    const handleNext = () => {
        // Kiểm tra nếu currentIndex đã nhỏ hơn hoặc bằng sanphams.length - 6
        // Thay vì currentIndex < sanphams.length - 6
        if (currentIndex <= sanphams.length - 6) {
            setCurrentIndex((prevIndex) => prevIndex + 3);
        }
    };
    return (
        <div>
            <label htmlFor="cardTitle " className='d-flex justify-center' >
                <h5 className='m-2 mb-1 text-red-400'  >Sản Phẩm Top</h5></label>
            <div className='d-flex flex-row' style={{ alignItems: 'center' }}>
                <button onClick={handleBack} className='p-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                    </svg>

                </button>
                <div className='d-flex' style={{ flex: 1, overflow: 'hidden', height: '', display: 'flex' }}>
                    <TransitionGroup className='d-flex' style={{ width: `${sanphams.length * 50}%`, transform: `translateX(-${currentIndex * (100 / sanphams.length)}%)`, transition: 'transform 500ms' }}>
                        {sanphams.length > 0 && sanphams.map((e, index) => (
                            <CSSTransition
                                key={e._id}
                                timeout={500}
                                classNames="slide"
                            >
                                <NavLink

                                    to={`/xemchitiet?chitietproduct=${e._id}`}
                                    className={`${styles.hoversp} container  card m-2 d-flex justify-center  p-0 no-underline`}
                                    style={{ width: `${100 / sanphams.length}%`, overflow: 'hidden', backgroundColor: 'white' }}
                                >
                                    <div className='card-img-top d-flex justify-center h-140' style={{ height: '140px', width: '11.5rem' }}>
                                        <img
                                            style={{ maxHeight: '140px' }}
                                            src={urlpicture + e.image}
                                            className="p-1"
                                            alt={e.name}
                                        />
                                    </div>
                                    <div className="card-body  pb-0 pl-1 pr-1 pt-2 justify-center flex-column w-full">
                                        <div
                                            className="card-text h-10"
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
                                        <h5 className="card-text ml-3 mb-2 text-truncate text-center" style={{ maxWidth: '130px' }}>
                                            {e.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span style={{ verticalAlign: "super" }}>đ</span>
                                        </h5>
                                    </div>
                                </NavLink>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <button onClick={handleNext} className='p-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                    </svg>
                </button>

                <style>
                    {`
                    .slide-enter {
                        transform: translateX(${100 / sanphams.length}%);
                    }
                    .slide-enter-active {
                        transform: translateX(0%);
                        transition: transform 500ms;
                    }
                    .slide-exit {
                        transform: translateX(0%);
                    }
                    .slide-exit-active {
                        transform: translateX(-${100 / sanphams.length}%);
                        transition: transform 500ms;
                    }
                `}
                </style>
            </div>
        </div>

    );
}

export default EventProductNew;
