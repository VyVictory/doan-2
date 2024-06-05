
import React from 'react';
import Spliturl from '../../module/spliturl';
import { } from 'react-router-dom';
import CustomerAccount from './CustomerAccount';
function CustomerCentter() {
    const afterCustomer = Spliturl("customer");
    return (
        <div className="align-items-center" >
            <h4 className='mt-3'>
                {
                    afterCustomer === 'wishlist' ? 'Sản phẩm yêu thích' :
                        afterCustomer === 'return-tracking' ? 'Quản lý đổi trả' :
                            afterCustomer === 'account' ? 'Thông tin tài khoản' :
                                afterCustomer === 'historybuyandsell' ? 'Đơn hàng của tôi' :
                                    afterCustomer === 'notification' ? 'Thông báo của tôi' : afterCustomer
                }
            </h4>
            <div className="container bg-light shadow-sm mb-5 bg-body rounded p-0" style={{minHeight:'450px'}}>
                {
                    afterCustomer === 'wishlist' ? 'Sản phẩm yêu thích' :
                        afterCustomer === 'return-tracking' ? 'Quản lý đổi trả' :
                            afterCustomer === 'account' ? <CustomerAccount /> :
                                afterCustomer === 'historybuyandsell' ? 'Đơn hàng của tôi' :
                                    afterCustomer === 'notification' ? 'Thông báo của tôi' : afterCustomer
                }
            </div>

        </div >
    );
}

export default CustomerCentter;
