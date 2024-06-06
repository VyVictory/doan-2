import React, { useState } from 'react';
import Authmodule from '../module/authmodule';
import { Alert } from 'react-bootstrap';

function EditEmail() {
    const { message, errors, changeAvatar, updateProfile } = Authmodule();
    const [profileUpdate, setProfileUpdate] = useState({
        email: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (profileUpdate.email !== '') {
            await updateProfile(profileUpdate);
        } else {
            console.log("No email");
        };
        window.location.href = '/customer/account';
    };

    return (
        <div style={{width:'100%',paddingTop:'10%'}}>
            <div className="d-flex justify-content-center flex-column items-center">
                {message ? <Alert variant="success" className='d-flex justify-center items-center' style={{ width: '500px' }}>
                    <p>{message}</p>
                </Alert> : <></>}



                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3 d-flex flex-row items-center">
                        <label htmlFor="email" className='mb-1 mr-3'>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            style={{ width: '400px' }}
                            id="email"
                            value={profileUpdate.email}
                            onChange={(e) => setProfileUpdate({ ...profileUpdate, email: e.target.value })}
                            placeholder="Nhập email"
                            required
                        />
                    </div>
                    <div className='d-flex justify-center'>
                        <button type="submit" className="btn btn-primary">Lưu Thay Đổi</button>
                    </div>

                </form>
                {message ? <Alert variant="success" className='d-flex justify-center items-center mt-5' style={{ width: '500px' }}>
                    <p>{message}</p>
                </Alert> : <></>}
            </div>
        </div>

    );
}

export default EditEmail;
