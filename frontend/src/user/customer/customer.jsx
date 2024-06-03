import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import CustomerLeftBar from './CustomerLeftBar';
import Renderbread from '../../allview/Renderbread'
import CustomerCentter from './CustomerCentter';
function Customer() {
    return (
        <div  >
            <div className='container' style={{ 'width': '80%'}} >
                <div className='p-2'>
                    {Renderbread('customer')}

                </div>
                <div className='d-flex flex-row'>
                    <div className='p-2' style={{ marginRight: '20px', minWidth: '20%' }}>
                        <CustomerLeftBar />
                    </div>
                    <div className='' style={{ marginRight: '20px', minWidth: '80%' }}>
                        <CustomerCentter />
                    </div>
                </div>
                {/* <Outlet /> */}
            </div>
        </div>
    );
}

export default Customer;
