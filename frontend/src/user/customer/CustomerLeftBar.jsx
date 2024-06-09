import React from 'react';
import img_avt from '../imguser/bar/user.png'
import stylesnavbar from '../css/Alluser.module.css';
import style from '../css/customer/CustomerLeftBar.module.css'
import useProfile from '../../module/profile.module';
function Customerleftbar() {
    const { profile } = useProfile();
    return (
        <div >
            <div className='d-flex flex-column'>
                <div className='d-flex flex-row'>
                    <img src={'http://localhost:5000'+profile.avatar||img_avt} style={{ "height": "50px", width: "50px", marginRight: '5px', border: '3px solid rgb(194, 225, 255)', borderRadius: '50%'  }} alt="Car Icon" />
                    <div className='d-flex align-items-center' style={{ marginLeft: '1%' }}>
                        <div className='d-block'>
                            <div className='form-label m-0' style={{ fontSize: '13px' }}>Tài Khoản Của</div>
                            <div>{profile.fullname}</div>
                        </div>
                    </div>
                </div>
                <div className='mt-1'>
                    <nav className=" bg-none flex-column"> {/* Sử dụng class "flex-column" để thiết lập thanh nav theo cột */}
                        <a className={`${stylesnavbar.button} ${style.selectnav} `} href="/customer/account" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            </svg>
                            <div className={`${style.textselect} `}>
                                Thông tin tài khoản
                            </div>
                        </a>
                        {/* <a className={`${stylesnavbar.button} ${style.selectnav}`} href="/customer/notification" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                            </svg>
                            <div className={`${style.textselect} `}>
                                Thông báo của tôi
                            </div>
                        </a> */}
                        <a className={`${stylesnavbar.button} ${style.selectnav}`} href="/customer/historybuyandsell" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-basket2" viewBox="0 0 16 16">
                                <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z" />
                                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z" />
                            </svg>
                            <div className={`${style.textselect} `}>
                                Quản lý đơn hàng
                            </div>
                        </a>
                        {/* <a className={`${stylesnavbar.button} ${style.selectnav}`} style={{ marginLeft: '2px' }} href="/customer/return-tracking" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <g clip-path="url(#clip0_955_70824)">
                                    <path d="M17.743 14.87L19.524 13.315C19.836 13.043 19.869 12.569 19.596 12.257C19.324 11.945 18.85 11.913 18.537 12.185L15.256 15.049C15.094 15.191 15 15.397 15 15.614C15 15.831 15.094 16.037 15.257 16.179L18.538 19.042C18.681 19.166 18.856 19.227 19.031 19.227C19.24 19.227 19.448 19.14 19.596 18.97C19.868 18.658 19.836 18.184 19.524 17.912L17.766 16.378C20.388 16.457 22.499 18.646 22.499 21.34V23.249C22.499 23.663 22.835 23.999 23.249 23.999C23.663 23.999 24 23.664 24 23.25V21.341C24 17.81 21.204 14.935 17.743 14.87Z" fill="#000000  " />
                                    <path d="M9.22029 0L4.36029 0.02C3.73029 0.02 3.14029 0.37 2.84029 0.92L0.300293 5.52L8.73029 5.5L9.22029 0Z" fill="#000000" />
                                    <path d="M19.6802 5.47998L17.1102 0.879981C16.8002 0.32998 16.2202 -0.0200195 15.5802 -0.0200195L10.7202 -1.95298e-05L11.2302 5.49998L19.6802 5.47998Z" fill="#000000" />
                                    <path d="M20.0002 10.18C19.7002 10.06 19.3702 9.99997 19.0302 9.99997C18.3702 9.99997 17.7302 10.24 17.2202 10.68L13.9402 13.54C13.3402 14.06 13.0002 14.82 13.0002 15.61C13.0002 16.41 13.3402 17.16 13.9402 17.69L16.5802 19.99L1.61023 20.03C1.60023 20.03 1.60023 20.03 1.60023 20.03C0.740234 20.03 0.0302344 19.32 0.0302344 18.45L-0.00976562 7.01997L9.24024 6.99997H10.7402L19.9902 6.96997L20.0002 10.18Z" fill="#000000" />
                                </g>
                                <defs>
                                    <clipPath  id="clip0_955_70824">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div className={`${style.textselect} `}>
                                Quản lý đổi trả
                            </div>
                        </a> */}
                        {/* <a className={`${stylesnavbar.button} ${style.selectnav}`} href="/customer/wishlist" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>
                            <div className={`${style.textselect} `}>
                                Sản phẩm yêu thích
                            </div>
                        </a> */}
                        {/* Sử dụng class "nav-link" cho các liên kết */}
                    </nav>
                </div>
            </div>

        </div>
    );
}

export default Customerleftbar;
