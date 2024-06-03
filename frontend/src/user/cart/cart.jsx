import React, { useEffect, useState, useRef } from 'react';
import img_search from '../imguser/bar/magnifying-glass.png';
import img_voucher from '../../seller/imgseller/voucher.png';
function Cart() {
    const [isFixed, setIsFixed] = useState(true);
    const YcheckRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (YcheckRef.current) {
                const YcheckPosition = YcheckRef.current.getBoundingClientRect().top + window.scrollY;
                const windowHeight = window.innerHeight;

                if (window.scrollY + windowHeight >= YcheckPosition) {
                    setIsFixed(false);
                } else {
                    setIsFixed(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const fixedStyle = isFixed
        ? {
            position: 'fixed',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '1000',
            width: '80%',
            height: '150px',

        }
        : {
            width: '100%',
        };

    const marginTopStyle = isFixed ? { marginTop: '140px' } : {};

    return (
        <div>
            <div className="p-3 border d-flex flex-row justify-content-center align-items-center" style={{ height: '6%' }}>
                <div style={{ fontSize: '30px', marginRight: '15%' }}>
                    Giỏ Hàng
                </div>
                <div style={{ width: '40%' }}>
                    <nav className="navbar navbar-light bg-none">
                        <div className="container-fluid flex-row-reverse">
                            <input className="form-control me-2" style={{ width: '100%' }} type="search" placeholder="Search" aria-label="Search" />
                            <img type="submit" src={img_search} style={{ height: '30px', position: 'absolute', marginRight: '15px' }} className="border-left-2" alt="Search Icon" />
                        </div>
                    </nav>
                </div>
            </div>

            <div className="container p-0" style={{ width: '80%', height: 'auto', marginBottom: '20px' }}>
                <div className="d-flex flex-column bd-highlight" style={{ backgroundColor: 'white', width: '100%', height: '80%' }}>
                    {/* Placeholder content for demonstration */}
                    {Array.from({ length: 30 }).map((_, index) => (
                        <div key={index} style={{ marginTop: '20px' }}>Cart Items</div>
                    ))}
                </div>
            </div>
            <div style={{ width: '100%', height: '170px' }}>
                <div className="container p-0 mb-4 " style={{ width: '80%', height: 'auto' }}>
                    <div className="d-flex flex-column bd-highlight" style={{ backgroundColor: 'white', width: '100%', height: '80%' }}>
                        <div>
                            <div className="d-flex align-items-end" style={{ width: '100%' }}>
                                <div className="border" style={{ backgroundColor: 'white', height: '150px', width: '100%', ...fixedStyle }}>
                                    <div className='' style={{ marginTop: '20px' }}>
                                        <div className='d-flex flex-row align-items-center' style={{ borderBottom: 'dashed gray 1px', height: '60px', paddingLeft: '2%', paddingRight: '10%' }}>
                                            <img src={img_voucher} style={{ width: '50px', height: '50px', marginRight: '1%' }}></img>
                                            {/* <button type="button" class="btn btn-success" style={{ marginLeft: '1%' }} >Chọn Voucher</button> */}
                                            <span className='text-nowrap'>
                                                Tổng Giảm:
                                                <span className='text-nowrap' style={{ float: 'right', color: 'red' }}>
                                                    9999999VND
                                                </span>
                                            </span>
                                        </div>
                                        {/* <div style={{ borderBottom: 'dashed gray 1px' }}>
                                        aaa
                                    </div> */}
                                        <div className='d-flex flex-row align-items-center p-1' style={{ height: '100%' }}>
                                            <div className='' style={{ width: '90%', height: '100%', paddingLeft: '2%', display: 'flex', flex: 'row', alignItems: 'center' }}>
                                                <div style={{ marginRight: '1%' }} class="form-check">
                                                    <input class="form-check-input" type="checkbox" value="" style={{ width: '30px', height: '30px' }} id="flexCheckDefault"></input>
                                                </div>
                                                <label style={{ marginRight: '10px' }} class="form-check-label text-nowrap" for="flexCheckDefault">
                                                    Chọn tất cả
                                                </label>
                                                <div style={{ marginRight: '10px' }}>
                                                    <button type="button" class="btn btn-outline-danger">Xóa</button>
                                                </div>
                                            </div>

                                            <h4 className='text-nowrap' style={{ marginRight: '10px' }}>
                                                Tổng thanh toán:
                                            </h4>
                                            <h4 className='text-nowrap' style={{ color: 'red' }}>
                                                1000000000000 VND
                                            </h4>
                                            <div className='d-block ' style={{ marginRight: '2%', marginLeft: '2%' }}>
                                                <button className=' btn btn-info border' >
                                                    Mua Hàng
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
            <div ref={YcheckRef} className="Ycheck" >
            </div>
            <div style={{ height: '500px', backgroundColor: 'gray', ...marginTopStyle }}>
                CÓ THỂ BẠN CŨNG THÍCH
            </div>


        </div>
    );
}

export default Cart;
