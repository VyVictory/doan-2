import React, { useEffect, useState, useRef } from 'react';
import img_search from '../imguser/bar/magnifying-glass.png';
import img_voucher from '../../seller/imgseller/voucher.png';
import { deleteProductCartById } from '../../module/deleteProductCartById';
import EventProductNew from '../eventProductNew';
import Order from '../order';
import { GetCart } from '../../module/getCart';

function Cart() {
    const [showdorder, setShoworder] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [urlpicture, setUrlpicture] = useState('http://localhost:5000');
    const [isFixed, setIsFixed] = useState(true);
    const YcheckRef = useRef(null);
    const [cart, setCart] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [summoney, setSummoney] = useState(0);
    const submitshoworder = async (e) => {
        e.preventDefault();
        setShoworder(!showdorder);
    }
    const handleChange = (id) => {
        setSelectedIds(prevIds => {
            if (prevIds.includes(id)) {
                // Nếu id đã tồn tại trong mảng, loại bỏ nó
                return prevIds.filter(itemId => itemId !== id);
            } else {
                // Nếu id chưa tồn tại trong mảng, thêm vào
                return [...prevIds, id];
            }
        });
    };

    useEffect(() => {
        const fetchCart = async () => {
            const cartData = await GetCart();
            setCart(cartData);
        };

        fetchCart();
    }, []);
    function handleClickLink(a) {
        window.location.href = '/xemchitiet?chitietproduct=' + a;
    }
    ///

    const handleSelectAll = () => {
        setSelectAllChecked(prevState => !prevState);
        setSelectedIds(prevIds => {
            if (!selectAllChecked) {
                return cart.cartItems.map(item => item.product._id);
            } else {
                return [];
            }
        });
    };
    const handleDeleteProductCartByid = async (id) => {
        try {
            await deleteProductCartById({ idproduct: id });
            window.alert('Xóa sản phẩm khỏi giỏ thành công!');
            window.location.href = '/cart';
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProductCartSelect = async () => {
        try {
            for (const id of selectedIds) {
                await handleDeleteProductCartByid(id);
            }
        } catch (error) {
            console.error(error);
        }
        console.log(selectedIds);
        window.alert('Xóa sản phẩm khỏi giỏ thành công!');
    };

    useEffect(() => {
        let sum = 0;
        if (cart && cart.cartItems) {
            cart.cartItems.forEach((item) => {
                if (selectedIds.includes(item.product._id)) {
                    sum += item.quantity * item.product.price;
                }
            });
        }
        setSummoney(sum);
    }, [selectedIds, cart]);
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
            position: 'fixed', bottom: '0', left: '50%', transform: 'translateX(-50%)', zIndex: '1000', width: '80%', height: '150px',
        } : { width: '100%', };
    const filteredCartItems = cart && cart.cartItems ? cart.cartItems.filter(item =>
        item.product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    ) : [];
    return (
        <div className='pb-5'>
            {
                showdorder ?
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999, background: 'none', padding: '0px' }}
                    ><Order offorder={submitshoworder} listproduct={selectedIds} />
                    </div>
                    : ''
            }
            <div className="p-3 border d-flex flex-row justify-content-center align-items-center" style={{ height: '6%' }}>
                <div style={{ fontSize: '30px', marginRight: '15%' }}>
                    Giỏ Hàng
                </div>
                <div style={{ width: '40%' }}>
                    <nav className="navbar navbar-light bg-none">
                        <div className="container-fluid flex-row-reverse">
                            <input className="form-control me-2 " style={{ width: '100%', paddingRight: '40px', paddingBottom: '10px' }}
                                type="search" placeholder="Search" aria-label="Search"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)} />
                            <img type="submit" src={img_search} style={{ height: '30px', position: 'absolute', marginRight: '15px' }} className="border-left-2" alt="Search Icon" />
                        </div>
                    </nav>
                </div>
            </div>
            <div className="container p-0" style={{ width: '80%', height: 'auto', marginBottom: '20px' }}>
                <div className=" mt-2 mb-2 rounded d-flex flex-row bd-highlight items-center" style={{ backgroundColor: 'white', width: '100%', height: '40px' }}>
                    <div className='d-flex justify-center' style={{ width: '40%' }}>
                        Sản phẩm
                    </div>
                    <div className='d-flex justify-center' style={{ width: '15%' }}>
                        Đơn giá
                    </div>
                    <div className='d-flex justify-center' style={{ width: '15%' }}>
                        Số lượng
                    </div>
                    <div className='d-flex justify-center' style={{ width: '15%' }}>
                        Thành tiền
                    </div>
                    <div className='d-flex justify-center' style={{ width: '15%' }}>
                        Thao tác
                    </div>
                </div>
                {filteredCartItems.map((item, index) => (
                    <div key={index} className=" mt-2 mb-2 rounded d-flex flex-row bd-highlight items-center p-2" style={{ backgroundColor: 'white', width: '100%', height: 'auto' }}>

                        <div className='d-flex flex-row items-center' style={{ width: '40%' }}>
                            <input
                                style={{ width: '30px', height: '30px' }}
                                class="form-check-input ml-2 mr-2"
                                type="checkbox"
                                id={"checkbox" + index}
                                checked={selectedIds.includes(item.product._id)}
                                onChange={() => handleChange(item.product._id)} // Truyền ID của sản phẩm vào hàm handleChange
                            />
                            <div onClick={(e) => { handleClickLink(item.product._id) }} className='h-140 d-flex flex-row items-center' style={{ height: '140px' }}>
                                <div className='mr-2 d-block' style={{ width: '160px' }}>
                                    <img
                                        style={{ maxHeight: '140px', maxWidth: '160px' }}
                                        src={urlpicture + item.product.image}
                                        className="p-1"
                                    />
                                    
                                </div>

                                <div
                                    className="card-text h-8 "
                                    style={{
                                        width: '200px', // Thêm chiều rộng cho phần chứa văn bản
                                        fontSize: '12px',
                                        textAlign: 'left',
                                        WebkitLineClamp: '2',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        margin: '0',
                                        wordWrap: 'break-word'
                                    }}
                                >
                                    {item.product.name}
                                </div>
                            </div>

                        </div>
                        <div className='d-flex justify-center' style={{ width: '15%' }}>
                            {(item.product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span style={{ verticalAlign: "super" }}>đ</span>
                        </div>
                        <div className='d-flex justify-center' style={{ width: '15%' }}>
                            {item.quantity}
                        </div>
                        <div className='d-flex justify-center' style={{ width: '15%' }}>

                            {(item.quantity * item.product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span style={{ verticalAlign: "super" }}>đ</span>
                        </div>
                        <div className='d-flex justify-center' style={{ width: '15%' }}>
                            <button
                                onClick={() => {
                                    handleDeleteProductCartByid(item.product._id);
                                }}
                                title="Xóa khỏi giỏ hàng " className='border rounded w-10 h-10 d-flex items-center justify-center mr-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-6">
                                    <path d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>
                            </button>
                            <button onClick={(e) => { handleClickLink(item.product._id) }} title="Xem Chi tiết" className='border rounded w-10 h-10 d-flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-6">
                                    <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ width: '100%', height: '150px' }}>
                <div className="container p-0 " style={{ width: '80%', height: 'auto' }}>
                    <div className="d-flex flex-column bd-highlight" style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
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
                                                    0 VND
                                                </span>
                                            </span>
                                        </div>
                                        {/* <div style={{ borderBottom: 'dashed gray 1px' }}>
                                        aaa
                                    </div> */}
                                        <div className='d-flex flex-row align-items-center p-1' style={{ height: '100%' }}>
                                            <div className='' style={{ width: '90%', height: '100%', paddingLeft: '2%', display: 'flex', flex: 'row', alignItems: 'center' }}>
                                                <input
                                                    style={{ width: '30px', height: '30px' }}
                                                    type="checkbox"
                                                    class="form-check-input mr-2"
                                                    id="selectAll"
                                                    checked={selectAllChecked}
                                                    onChange={handleSelectAll}
                                                />
                                                <label className="form-check-label mr-2" htmlFor="selectAll">
                                                    Chọn tất cả
                                                </label>
                                                <div style={{ marginRight: '10px' }}>
                                                    <button
                                                        onClick={() => {
                                                            handleDeleteProductCartSelect();
                                                        }}
                                                        type="button" class="btn btn-outline-danger">Xóa</button>
                                                </div>
                                            </div>

                                            <h4 className='text-nowrap' style={{ marginRight: '10px' }}>
                                                Tổng thanh toán:
                                            </h4>
                                            <h4 className='text-nowrap' style={{ color: 'red' }}>
                                                {summoney} VND
                                            </h4>
                                            <div className='d-block ' style={{ marginRight: '2%', marginLeft: '2%' }}>
                                                <button onClick={submitshoworder} className=' btn btn-info border' >
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
            <div className="container mt-4 pl-0 pb-1 bg-white rounded" style={{ width: '80%' }}>
                <EventProductNew />
            </div>


        </div>
    );
}

export default Cart;
