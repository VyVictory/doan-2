import React, { useState } from 'react';
import Authmodule from '../module/authmodule';
import { Alert } from 'react-bootstrap';
function EditPhone() {
    const { message, updateProfile } = Authmodule();
    const [profileUpdate, setProfileUpdate] = useState({
        phone: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (profileUpdate.phone !== '') {
            await updateProfile(profileUpdate);
        } else {
            console.log("No phone");
        }
        window.location.href = '/admin';
    };

    return (
        <div className='d-flex justify-center' style={{width:'100%',paddingTop:'10%'}}>
            <div className="d-flex justify-content-center flex-column items-center bg-white w-1/2 pt-4 pb-4 border rounded">
                                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3 d-flex flex-row items-center">
                        <label htmlFor="phone" className='mb-1 mr-3'>Phone:</label>
                        <input
                            type="phone"
                            className="form-control"
                            style={{ width: '400px' }}
                            id="phone"
                            value={profileUpdate.phone}
                            onChange={(e) => setProfileUpdate({ ...profileUpdate, phone: e.target.value })}
                            placeholder="Nhập phone"
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

export default EditPhone;
