import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeAdmin from '../admin/homeadmin';
import AdminMenu from '../admin/AdminMenu';
import ListAccount from '../admin/ListAccount';
import ChatBubble from '../chat/chat';
import Listproduct from '../admin/Listproduct';
import EditPassword from '../admin/EditPass';
import EditEmail from '../admin/EditEmail';
import EditPhone from '../admin/EditPhone';
import CategoryListPage from '../admin/CategoryListPage';
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

                    <Route path='/admin/EditEmail' element={<EditEmail />} />
                    <Route path='/admin/EditPassword' element={<EditPassword />} />
                    <Route path='/admin/EditPhone' element={<EditPhone />} />
                    <Route path='/admin/EditPhone' element={<EditPhone />} />
                    <Route path='/admin/listproducttypes' element={<CategoryListPage />} />
                </Routes>
            </Router>
        </div>

    );
};

export default RouterAdmin;
