import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserBar from '../user/navbar/Navbar'
import Sellerbar from '../seller/sellerbar'
import Sellercenter from '../seller/sellercenter';
import Themsanpham from '../seller/themsanpham';
import Themanh from '../seller/yourcontainer'
import Home from '../user/Home'
import Xemchitiet from '../user/xemchitiet';
import Customer from '../user/customer/customer'
import Authmodule from '../module/authmodule';
import ChatBubble from '../chat/chat';
import Cart from '../user/cart/cart.jsx';
import RouterAdmin from './RouterAdmin.jsx';

function Routerr() {
    const [showNavbar, setShowNavbar] = useState(true);
    const [adminpage, setAdminpage] = useState(true);
    const { isTokenExist } = Authmodule();
    useEffect(() => {
        // Lấy đường dẫn hiện tại
        const currentPath = window.location.pathname;

        // Kiểm tra nếu đường dẫn là "/home" thì ẩn Navbar
        if (currentPath.startsWith('/kenhnguoiban')) {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
        if (currentPath.startsWith('/admin')) {
            setAdminpage(true);
        } else {
            setAdminpage(false);
        }
    }, []);
    return (
        <div  style={{ backgroundColor: '#F1F1F1', minHeight: '729px' }}>
            {
                adminpage && isTokenExist ?
                    <RouterAdmin/>
                    :
                    <Router>
                        {/* Hiển thị Navbar seller nếu showNavbar là true */}
                        {showNavbar ? <UserBar /> : <Sellerbar />}

                        {/* Chỉ hiển thị thành phần Sellercenter khi showNavbar đúng */}
                        {!showNavbar && isTokenExist && <Sellercenter />}
                        {/* Routes for Seller */}
                        <ChatBubble />
                        <chat />
                        <Routes>
                            {showNavbar ? (
                                <>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/xemchitiet" element={<Xemchitiet />} />

                                    {isTokenExist && <>
                                        <Route path="/customer/*" element={<Customer />} />
                                        <Route path='/cart/*' element={<Cart />} />
                                    </>}


                                </>
                            ) : (
                                isTokenExist ? (
                                    <>
                                        <Route path="/kenhnguoiban/quanlysanpham/themsanpham" element={<Themsanpham />} />
                                        <Route path="/kenhnguoiban/quanlysanpham/themanh" element={<Themanh />} />
                                    </>
                                ) : (
                                    null
                                )
                            )}
                        </Routes>
                    </Router>
            }

        </div>
    );
};

export default Routerr;