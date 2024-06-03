import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeAdmin from '../admin/homeadmin';
import AdminMenu from '../admin/AdminMenu';
import ListAccount from '../admin/ListAccount';
import ChatBubble from '../chat/chat';
import Listproduct from '../admin/Listproduct';
function RouterAdmin() {

    return (
        <div>
            <Router>
                {/* noi bar */}
                <AdminMenu />
                <ChatBubble />
                <Routes>
                    <Route path="/admin" element={<HomeAdmin />} />
                    <Route path='/admin/listaccounts' element={<ListAccount />} />
                    <Route path='/admin/listproducts' element={<Listproduct />} />
                </Routes>
            </Router>
        </div>

    );
};

export default RouterAdmin;
