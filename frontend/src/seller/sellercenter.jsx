
import { useEffect, useState } from 'react';
import styles from '../user/css/Navber.module.css'; // Import CSS modu
import stylecenter from './css/sellercenter.module.css';
import img_sanpham from './imgseller/sanpham.png';
import img_voucher from './imgseller/voucher.png';
import img_list from './imgseller/to-do-list.png';
import img_ewallet from './imgseller/ewallet.png';
import img_shop from './imgseller/shop.png';

import FormQlsp from './quanlysanpham';
import FormHome from './homeseller';
import FormQldh from './quanlydonhang';

import { BrowserRouter as Router, Route, Link, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Sellercenter = () => {
    const [locationState, setLocationState] = useState({
        showFormHome: false,
        showQlsp: false,
        showQldh: false,
    });
    const { showFormHome, showQlsp, showQldh } = locationState;

    const location = useLocation();

    useEffect(() => {
        const currentPath = window.location.pathname;
        let newState = {
            showFormHome: false,
            showQlsp: false,
            showQldh: false,
        };

        if (currentPath === '/kenhnguoiban') {
            newState.showFormHome = true;
        } else if (currentPath === '/kenhnguoiban/quanlysanpham') {
            newState.showQlsp = true;
        } else if (currentPath === '/kenhnguoiban/quanlydonhang') {
            newState.showQldh = true;
        }

        setLocationState(newState);
    }, [location.pathname]);

    // Sử dụng locationState.showFormHome, locationState.showQlsp, locationState.showQldh ở đâyy

    const isActive = location.pathname === '/kenhnguoiban/quanlysanpham';
    return (
        <div className="center" style={{ width: "99.136438799999999%" }}>
            {location.pathname !== "/kenhnguoiban/quanlysanpham/themsanpham" && (
            <div class="row bg-primary">
                <div class="col-2 bg-light shadow-sm p-2  bg-body minWidth-100">
                    <button type="submit" className={`${stylecenter.buttonlist}`} aria-label="Search" style={{ minHeight: "40px", padding: "10px", width: "104%", marginLeft: "6px" }}>
                        <img src={img_list} style={{ height: "30px", float: "left", paddingRight: '10px' }} alt="User Avatar" />
                        <span className="" style={{ minWidth: "100px", float: "left" }}>
                            <NavLink to="/kenhnguoiban/quanlydonhang" className={`${location.pathname === '/kenhnguoiban/quanlydonhang' ? stylecenter.navlinkactive : stylecenter.navlink}`}>Quản Lý Đơn Hàng</NavLink>
                        </span>
                    </button>
                    <button type="submit" className={`${stylecenter.buttonlist}`} aria-label="Search" style={{ minHeight: "40px", padding: "10px", width: "104%", marginLeft: "6px" }}>
                        <img src={img_sanpham} style={{ height: "30px", float: "left", paddingRight: '10px' }} alt="User Avatar" />
                        <span className="" style={{ minWidth: "100px", float: "left" }}>
                            <NavLink to="/kenhnguoiban/quanlysanpham" className={`${location.pathname === '/kenhnguoiban/quanlysanpham' ? stylecenter.navlinkactive : stylecenter.navlink}`}>Quản Lý Sản Phẩm</NavLink>
                        </span>
                    </button>
                    {/* <button type="submit" className={`${stylecenter.buttonlist}`} aria-label="Search" style={{ minHeight: "40px", padding: "10px", width: "104%", marginLeft: "6px" }}>
                        <img src={img_voucher} style={{ height: "30px", float: "left", paddingRight: '10px' }} alt="User Avatar" />
                        <span className="" style={{ minWidth: "100px", float: "left" }}>

                            <NavLink to="/kenhnguoiban/quanlyvoucher" className={`${location.pathname === '/kenhnguoiban/quanlyvoucher' ? stylecenter.navlinkactive : stylecenter.navlink}`}>Quản Lý Voucher</NavLink>
                        </span>
                    </button>
                    <button type="submit" className={`${stylecenter.buttonlist}`} aria-label="Search" style={{ minHeight: "40px", padding: "10px", width: "104%", marginLeft: "6px" }}>
                        <img src={img_ewallet} style={{ height: "30px", float: "left", paddingRight: '10px' }} alt="User Avatar" />
                        <span className="" style={{ minWidth: "100px", float: "left" }}>
                            <NavLink to="/kenhnguoiban/quanlytaichinh" className={`${location.pathname === '/kenhnguoiban/quanlytaichinh' ? stylecenter.navlinkactive : stylecenter.navlink}`}>Quản Lý Tài Chính</NavLink>
                        </span>
                    </button> */}
                    <button type="submit" className={`${stylecenter.buttonlist}`} aria-label="Search" style={{ minHeight: "40px", padding: "10px", width: "104%", marginLeft: "6px" }}>
                        <img src={img_shop} style={{ height: "30px", float: "left", paddingRight: '10px' }} alt="User Avatar" />
                        <span className="" style={{ minWidth: "100px", float: "left" }}>
                            <NavLink to="/kenhnguoiban/quanlyshop" className={`${location.pathname === '/kenhnguoiban/quanlyshop' ? stylecenter.navlinkactive : stylecenter.navlink}`}>Quản Lý Shop</NavLink>
                        </span>
                    </button>
                </div>
                <div class="col-10 " style={{ backgroundColor: "#E8D2D2" }}>
                    {showFormHome && <FormHome />}
                    {showQlsp && <FormQlsp />}
                    {showQldh && <FormQldh />}
                </div>
            </div>
            )}
        </div>
    );
}

export default Sellercenter;
