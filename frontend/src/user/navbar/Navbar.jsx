import React, { useState, useEffect } from 'react';
import styles from '../css/Navber.module.css'; // Import CSS module
import FormL from '../LoginForm';
import FormR from '../RegistrationPage';
import ForgetPassword from '../forgetPassword';
import logo from '../imguser/bar/logo.png';
import img_search from '../imguser/bar/magnifying-glass.png';
import img_local from '../imguser/bar/place.png';
import img_car from '../imguser/bar/shopping-cart.png';
import img_thongbao from '../imguser/bar/thongbao.png';
import img_avt from '../imguser/bar/user.png';
import img_home from '../imguser/bar/home.png';
import authmodule from '../../module/authmodule';
import profileModule from '../../module/profile.module';
import UserAvatarName from '../../allview/useravtarname';
import Address from '../address';

const NavigationBar = () => {
  const [showaddress, setAddress] = useState(false);
  const [showFormL, setShowFormL] = useState(false);
  const [showFormR, setShowFormR] = useState(false);
  const [showFormF, setShowFormF] = useState(false);
  const [NameProduct, setNameProduct] = useState("");

  const { isTokenExist, handleLogout } = authmodule();
  const { profile } = profileModule();
  const submitshowaddress = async (e) => {
    e.preventDefault();
    if (!isTokenExist) {
      setShowFormL(true);
    } else { setAddress(!showaddress); }
  }
  const handleAddAddress = () => {
    setAddress(false); // Tắt hiển thị phần địa chỉ
    // Sau một khoảng thời gian nhất định, mở lại phần địa chỉ
    setTimeout(() => {
      setAddress(true);
    }, 1); // Thời gian đợi 1000ms (1 giây) trước khi hiển thị lại
  }
  /*
  const [isTokenExist, setIsTokenExist] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== '') {
      setIsTokenExist(true);
    } else {
      setIsTokenExist(false);
    }
  }, []); // useEffect này chạy chỉ một lần khi component mount
*/
  const toggleFormL = () => {
    setShowFormL(!showFormL);
    if (showFormL === true) {
      setShowFormR(false);
    }
  };
  const toggleFormF = () => {
    setShowFormL(false);
    setShowFormF(!showFormF);
  };
  const toggleFormR = () => {
    setShowFormR(!showFormR);
    if (showFormR === true) {
      setShowFormL(false);
    }
  };
  const linkcar = async (e) => {
    e.preventDefault();
    if (!isTokenExist) {
      setShowFormL(true);
    } else {
      window.location.href = '/cart'
    }
  }
  function handleClick(a) {
    if (a == 'home') {
      window.location.href = '/';
    } else if (a == 'thongbao') {
      window.location.href = '/customer/notification';
    } else {
      window.location.href = `/${a}`;
    }
  }
  return (
    <div style={{ "marginLeft": "0", "marginRight": "0", "width": "99.236438799999999%" }} className='border-bottom'>
      <div className={`${styles.barcustom, styles.barcontainer} row shadow-sm p-3  bg-body rounded`}>
        {/* left bar*/}
        <div onClick={(e) => { handleClick('home') }} className={`${styles.barcustom} col-sm-2 `}>
          <img src={logo} alt="Logo" className={`${styles.logo}`} />
        </div>
        {/* content bar*/}

        <div className={`${styles.barcustom}  col-sm-7  justify-content-center d-flex flex-column padding-0`}>
          <nav class="navbar navbar-light bg-light">
            <div class="container-fluid flex-row-reverse">
              <input onChange={(e) => setNameProduct(e.target.value)} class="form-control me-2" style={{ width: '100%', paddingRight: '40px' }} type="search" placeholder="Search" aria-label="Search"></input>
              <img onClick={(e) => { handleClick(`products?name=${NameProduct}`) }} type="submit" src={img_search} style={{ "height": "30px", position: 'absolute', marginRight: '15px' }} className='border-left-2' />
            </div>
          </nav>
          <div style={{ "marginTop": "2px", "height": "30px", "marginBottom": "-10px" }} className={`w-100 mt-10 bg-dark d-none`}>
            bbbbbnb
          </div>
        </div>
        {/* right bar*/}
        <div style={{ "paddingRight": "0px" }} className={`${styles.barcustom} col-sm-3`}>
          <div style={{ "height": "60%", "padding": "4px", "marginTop": "0.2%" }} className={`d-flex justify-content-end align-items-center`}>
            <div style={{ marginRight: '4%' }}>
              <div className={`${styles.container} `}>
                <button onClick={(e) => { handleClick('home') }} type='submit' className={`${styles.hover} ${styles.button} `} style={{ "height": "40px", "paddingLeft": "6px", "paddingRight": "6px", "marginLeft": "-20px" }}>
                  <img src={img_home} style={{ "height": "30px" }} alt="Car Icon" />
                </button>
              </div>
            </div>
            {/* {isTokenExist ? (
              <div style={{ marginRight: '8%' }}>
                <button onClick={(e) => { handleClick('thongbao') }} className={`${styles.hover} ${styles.button} position-relative`} style={{ "height": "40px", "width": "40px", "marginRight": "4%", "marginLeft": "5%", paddingLeft: '5px' }}>
                  <img src={img_thongbao} style={{ "height": "30px" }} alt="Car Icon" />
                  <span class="position-absolute translate-middle badge rounded-pill bg-danger" style={{ marginLeft: '30%', marginTop: '-63%' }}>
                    99+
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </button>
              </div>
            ) : (<></>)} */}
            {/* tk da dang nhap*/}
            {isTokenExist ? (
              <div className={`${styles.container} `} style={{ zIndex: '9999' }}>
                <div>
                  <UserAvatarName profile={profile} />
                </div>
                <ul className={styles.list}>

                  <li><a href='/customer/account'><button className={`${styles.hover} ${styles.listaccount}`}>thông tin tài khoản</button></a></li>
                  <li><a href='/customer/historybuyandsell'><button className={`${styles.hover} ${styles.listaccount}`}>đơn hàng của tôi</button></a></li>
                  <li><a href='/kenhnguoiban'><button className={`${styles.hover} ${styles.listaccount}`}>kênh người bán</button></a></li>
                  <li><button className={`${styles.hover} ${styles.listaccount}`} style={{ color: 'red' }} onClick={handleLogout}>Đăng Xuất</button></li>
                </ul>
              </div>
            ) : (
              <div className={`${styles.container}`}>
                <button type='submit' className={`${styles.hover} ${styles.button} d-flex flex-row`} style={{ "height": "40px", "paddingLeft": "12px", paddingTop: '5px' }}>
                  <img src={img_avt} style={{ "height": "30px", "marginLeft": "-4px" }} alt="Car Icon" />
                  <div className='' style={{ "minWidth": "100px" }}>
                    Tài Khoản
                  </div>
                </button>
                <ul className={styles.list} >
                  <li><button className={`${styles.hover} ${styles.listaccount}`} onClick={toggleFormL}>Đăng Nhập</button></li>
                  <li><button className={`${styles.hover} ${styles.listaccount}`} onClick={toggleFormR}>Đăng Ký</button></li>
                </ul>
              </div>
            )}
            {/*000000000*/}
            <div style={{ "height": "20px", "display": "block", "width": "1px", "marginLeft": "20px" }} className='bg-secondary'></div>
            <a onClick={linkcar} style={{ "marginRight": "10%", "marginLeft": "3%" }}>
              <button type='submit' className={`${styles.hover} ${styles.button} `} style={{ "height": "40px", "width": "40px", paddingLeft: '10px' }}>
                <img src={img_car} style={{ "height": "30px", "marginLeft": "-4px" }} alt="Car Icon" />
              </button>
            </a>

          </div>

          <div style={{ "height": "40%" }} className={`justify-content-center  align-items-center d-flex`}>
            <button onClick={submitshowaddress} style={{ "height": "30px" }} type='submit' className={`${styles.hover} ${styles.button} border-0 d-flex align-items-center justify-content-center bg-transparent`}>
              <img src={img_local} style={{ "height": "60%" }} alt="Location Icon" />
              <div>
                Địa Chỉ Giao Hàng
              </div>
            </button>
          </div>
        </div>
      </div>
      {showFormL && <FormL onClose={toggleFormL} onR={toggleFormR} onF={toggleFormF} />}
      {showFormR && <FormR onClose={toggleFormR} onL={toggleFormL} />}
      {showFormF && <ForgetPassword onClose={toggleFormF} />}
      {
        showaddress ?
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999, background: 'none', padding: '0px' }}
          >{isTokenExist ? <Address offaddress={submitshowaddress} onAddAddress={handleAddAddress} /> : ""}

          </div>
          : ''
      }
    </div>
  );
};

export default NavigationBar;


//bg-transparent