import React, { useState } from 'react';
import Authmodule from '../../module/authmodule';
import { Alert } from 'react-bootstrap';

function CheckAuth() {
    const { message, updateProfile } = Authmodule();
    const [profileUpdate, setProfileUpdate] = useState({
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div style={{width:'100%',paddingTop:'10%'}}>
            
        </div>

    );
}

export default CheckAuth;
