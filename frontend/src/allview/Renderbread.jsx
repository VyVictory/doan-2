import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
function RenderBreadcrumbs(bread) {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x && x !== bread); // Filter out 'customer'
    return (
        <div className="d-flex flex-row fw-bold text-uppercase">
            <div>
                <Link
                    to="/"
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    trang chủ
                </Link>
            </div>
            {pathnames.map((value, index) => {
                const to = `/${bread}/${pathnames.slice(0, index + 1).join('/')}`;
                return (
                    <div key={to} className="ms-2">
                        {'> '}
                        <Link
                            to={to}
                            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            {
                                value === 'wishlist' ? 'Sản phẩm yêu thích' :
                                    value === 'return-tracking' ? 'Quản lý đổi trả' :
                                        value === 'account' ? 'Thông tin tài khoản' :
                                            value === 'historybuyandsell' ? 'Quản lý đơn hàng' :
                                                value === 'notification' ? 'Thông báo' : value
                            }
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default RenderBreadcrumbs;
