import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserBar from '../user/navbar/Navbar';
import Sellerbar from '../seller/sellerbar';
import Sellercenter from '../seller/sellercenter';
import Themsanpham from '../seller/themsanpham';
import Themanh from '../seller/yourcontainer';
import Home from '../user/Home';
import Xemchitiet from '../user/xemchitiet';
import Customer from '../user/customer/customer';
import Authmodule from '../module/authmodule';
import ChatBubble from '../chat/chat';
import Cart from '../user/cart/cart.jsx';
import RouterAdmin from './RouterAdmin.jsx';
import ResetPassword from '../user/resetPassword.jsx';
import Editproduct from '../seller/editproduct.jsx';
import useProfile from '../module/profile.module.jsx';
import Products from '../user/products.jsx';

function Routerr() {
    const [showNavbar, setShowNavbar] = useState(true);
    const [adminpage, setAdminpage] = useState(false); // Default should be false
    const { isTokenExist } = Authmodule();
    const { profile, loading } = useProfile(); // Add loading state

    useEffect(() => {
        // Lấy đường dẫn hiện tại
        const currentPath = window.location.pathname;
        // Kiểm tra nếu đường dẫn là "/kenhnguoiban" thì ẩn Navbar
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
    }, [window.location.pathname]); // Add pathname as dependency

    // Display loading spinner while fetching profile
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ backgroundColor: '#F1F1F1', minHeight: '729px' }}>
            {adminpage && profile?.isAdmin ? (
                <RouterAdmin />
            ) : (
                <Router>
                    {/* Hiển thị Navbar seller nếu showNavbar là true */}
                    {window.location.pathname.startsWith('/resetPassword') ? null : (showNavbar ? <UserBar /> : <Sellerbar />)}

                    {/* Chỉ hiển thị thành phần Sellercenter khi showNavbar đúng */}
                    {!showNavbar && isTokenExist && <Sellercenter />}
                    
                    <ChatBubble />
                    
                    <Routes>
                        {showNavbar ? (
                            <>
                                <Route path="/resetPassword/*" element={<ResetPassword />} />
                                <Route path="/" element={<Home />} />
                                <Route path="/products*" element={<Products />} />
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
                                    <Route path='/kenhnguoiban/quanlysanpham/thaydoisanpham' element={<Editproduct />} />
                                </>
                            ) : (
                                null
                            )
                        )}
                    </Routes>
                </Router>
            )}
        </div>
    );
}

export default Routerr;
