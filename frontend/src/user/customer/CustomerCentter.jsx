
import React from 'react';
import Spliturl from '../../module/spliturl';
import { } from 'react-router-dom';
import CustomerAccount from './CustomerAccount';
import EditEmail from './EditEmail';
import EditPassword from './EditPass';
import EditPhone from './EditPhone';
function CustomerCentter() {
    const afterCustomer = Spliturl("customer");
    return (
        <div className="align-items-center" >
            <h4 className='mt-3'>
                {
                    afterCustomer === 'wishlist' ? 'Sản phẩm yêu thích' :
                        afterCustomer === 'return-tracking' ? 'Quản lý đổi trả' :
                            afterCustomer === 'editphone' ? 'Sửa số điện thoại' :
                                afterCustomer === 'editpassword' ? 'Đổi mật khẩu' :
                                    afterCustomer === 'editemail' ? 'Đổi email' :
                                        afterCustomer === 'account' ? 'Thông tin tài khoản' :
                                            afterCustomer === 'historybuyandsell' ? 'Đơn hàng của tôi' :
                                                afterCustomer === 'notification' ? 'Thông báo của tôi' : afterCustomer
                }
            </h4>
            <div className="container bg-light shadow-sm mb-5 bg-body rounded p-0 d-flex flex-row" style={{ minHeight: '300px' }}>
                {
                    afterCustomer === 'wishlist' ? 'Sản phẩm yêu thích' :
                        afterCustomer === 'return-tracking' ? 'Quản lý đổi trả' :
                            afterCustomer === 'account' ? <CustomerAccount /> :
                                afterCustomer === 'editphone' ? <EditPhone/> :
                                    afterCustomer === 'editpassword' ? <EditPassword/> :
                                        afterCustomer === 'editemail' ? <EditEmail/> :
                                            afterCustomer === 'historybuyandsell' ? 'Đơn hàng của tôi' :
                                                afterCustomer === 'notification' ? 'Thông báo của tôi' : afterCustomer
                }
            </div>

        </div >
    );
}

export default CustomerCentter;
