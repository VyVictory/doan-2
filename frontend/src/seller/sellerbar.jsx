import React, { useState, useEffect } from 'react';
import { Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import img_avt from '../user/imguser/bar/user.png';
import img_thongbao from '../user/imguser/bar/thongbao.png';
import styles from '../user/css/Navber.module.css'; // Import CSS module
import logo from './imgseller/shops.png';
import stylesin from './css/sellerbar.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import FormL from '../user/LoginForm';
import FormR from '../user/RegistrationPage';
import authmodule from '../module/authmodule';
import Notification from './Notification'; // Import component thông báo
import UserAvatarName from '../allview/useravtarname';
import profileModule from '../module/profile.module';

const NavigationBar = () => {
  const [open, setOpen] = useState(false);
  const [pageName, setPageName] = useState('');
  const location = useLocation();
  const { profile } = profileModule();
  const { isTokenExist, handleLogout } = authmodule();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/kenhnguoiban/quanlysanpham") {
      setPageName(' > SẢN PHẨM');
    } else if (path === "/kenhnguoiban/quanlydonhang") {
      setPageName(' > ĐƠN HÀNG');
    } else {
      setPageName('');
    }
  }, [location.pathname]); // Kích hoạt mỗi khi location.pathname thay đổi

  const [showFormL, setShowFormL] = useState(false);
  const [showFormR, setShowFormR] = useState(false);
  // const [notifications, setNotifications] = useState([]);

  const toggleFormL = () => {
    setShowFormL(!showFormL);
    if (showFormL === true) {
      setShowFormR(false);
    }
  };

  const toggleFormR = () => {
    setShowFormR(!showFormR);
    if (showFormR === true) {
      setShowFormL(false);
    }
  };

  // const fetchNotifications = async () => {
  //   try {
  //     const response = await fetch('your_api_endpoint');
  //     if
  //       (!response.ok) {
  //       throw new Error('Failed to fetch notifications');
  //     }
  //     const data = await response.json();
  //     setNotifications(data);
  //   } catch (error) {
  //     console.error('Error fetching notifications:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchNotifications();
  // }, []); // Fetch notifications on component mount

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm  bg-body rounded" style={{ backgroundColor: "#FFB4B4" }}>
        <div className="container-fluid ">
          <NavLink to="/kenhnguoiban" className="navbar-brand " style={{ marginLeft: "40px" }}>
            <img src={logo} alt="Logo" className={`${styles.logo} ${stylesin.logo}`} />
          </NavLink>
          <button className="navbar-toggler" type="button" onClick={() => setOpen(!open)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <Collapse in={open}>
            <div className="navbar-collapse">
              <div className="navbar-nav me-auto mb-2 mb-lg-0">
                HOME{pageName}
              </div>
              <div style={{ marginRight: '2%' }}>
                <button  className={`${styles.hover} ${styles.button} position-relative`} style={{ "height": "40px", "width": "40px", "marginRight": "4%", "marginLeft": "5%", paddingLeft: '5px' }}>
                  <img src={img_thongbao} style={{ "height": "30px" }} alt="Car Icon" />
                  <span class="position-absolute translate-middle badge rounded-pill bg-danger" style={{ marginLeft: '30%', marginTop: '-63%' }}>
                    99+
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </button>
              </div>

              <div className="d-flex" style={{ marginRight: "60px" }}>
                <div className={`${styles.container}`}>

                  {/* tk da dang nhap*/}
                  {isTokenExist ? (
                    <>
                      <div>
                        <UserAvatarName profile={profile} />
                      </div>
                      <ul className={styles.list} style={{ zIndex: 10 }}>
                        <li><button className={`${styles.hover} ${styles.listaccount}`}>Thông Báo</button></li>
                        <li><button className={`${styles.hover} ${styles.listaccount}`}>Hỗ Trợ</button></li>
                        <li><button className={`${styles.hover} ${styles.listaccount}`} onClick={handleLogout}>Đăng Xuất</button></li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <button type="submit" className={`${styles.hover} ${styles.button} d-flex flex-row `} aria-label="Search" style={{ height: "40px", marginLeft: "2px", paddingLeft: "12px", paddingTop: '5px', paddingRight: "20px" }}>
                        <img src={img_avt} style={{ height: "30px", marginLeft: "-4px" }} alt="User Avatar" />
                        <span className="" style={{ minWidth: "100px" }}>
                          Tài Khoản
                        </span>
                      </button>
                      <ul className={styles.list}>
                        <li><button className={`${styles.hover} ${styles.listaccount}`} onClick={toggleFormL}>Đăng Nhập</button></li>
                        <li><button className={`${styles.hover} ${styles.listaccount}`} onClick={toggleFormR}>Đăng Ký</button></li>
                      </ul>
                    </>
                  )}
                  {/*000000000*/}
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </nav>
      {showFormL && <FormL onClose={toggleFormL} onR={toggleFormR} />}
      {showFormR && <FormR onClose={toggleFormR} onL={toggleFormL} />}
      {/* <Notification notifications={notifications} /> */}
    </div>
  );
};

export default NavigationBar;

