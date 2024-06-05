import React, { useState } from 'react';
import Authmodule from '../../module/authmodule';
import useProfile from '../../module/profile.module';
import { Alert } from 'react-bootstrap';

function EditPassword() {
    const { message, updateProfile } = Authmodule();
    const { profile } = useProfile();
    // const [emailold, setEmailold] = useState(profile.email);
    // const [passwordold, setPasswordold] = useState('password');
    // const [accect, setAccect] = useState('');
    const [profileUpdate, setProfileUpdate] = useState({
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    // const loginfunction = async (formdata) => {
    //     try {
    //         const response = await axios.post(`http://localhost:5000/api/users/auth`, formdata);
    //         setAccect('accect');
    //     } catch (error) {
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (profileUpdate.password === profileUpdate.confirmPassword && profileUpdate.password !== '') {
            await updateProfile({ password: profileUpdate.password });
            window.location.href = '/customer/account';
        } else {
            setError("Passwords do not match or are empty");
        }
    };

    return (
        <div style={{ width: '100%', paddingTop: '10%' }}>
            <div className="d-flex justify-content-center flex-column items-center">
                <form onSubmit={handleSubmit}>
                    {/* <div className="form-group mb-3 d-flex flex-row items-center">
                        <label htmlFor="passwordold" className='mb-1 mr-3 w-36'>Mật khẩu cũ:</label>
                        <input
                            type="password"
                            className="form-control"
                            style={{ width: '400px' }}
                            id="passwordold"
                            value={passwordold}
                            onChange={(e) => setPasswordold(e.target.value)}
                            placeholder="Mật khẩu"
                            required
                        />
                    </div> */}
                    <div className="form-group mb-3 d-flex flex-row items-center">
                        <label htmlFor="password" className='mb-1 mr-3 w-36'>Mật khẩu:</label>
                        <input
                            type="password"
                            className="form-control"
                            style={{ width: '400px' }}
                            id="password"
                            value={profileUpdate.password}
                            onChange={(e) => setProfileUpdate({ ...profileUpdate, password: e.target.value })}
                            placeholder="Mật khẩu"
                            required
                        />
                    </div>
                    <div className="form-group mb-3 d-flex flex-row items-center">
                        <label htmlFor="confirmPassword" className='mb-1 mr-3 w-36'>Nhập lại mật khẩu:</label>
                        <input
                            type="password"
                            className="form-control"
                            style={{ width: '400px' }}
                            id="confirmPassword"
                            value={profileUpdate.confirmPassword}
                            onChange={(e) => setProfileUpdate({ ...profileUpdate, confirmPassword: e.target.value })}
                            placeholder="Nhập lại mật khẩu"
                            required
                        />
                    </div>
                    <div className='d-flex justify-center'>
                        <button type="submit" className="btn btn-primary">Lưu Thay Đổi</button>
                    </div>
                </form>
                {message &&
                    <Alert variant="success" className='d-flex justify-center items-center mt-5' style={{ width: '500px' }}>
                        <p>{message}</p>
                    </Alert>
                }
                {error &&
                    <Alert variant="danger" className='d-flex justify-center items-center mt-5' style={{ width: '500px' }}>
                        <p>{error}</p>
                    </Alert>
                }
            </div>
        </div>
    );
}

export default EditPassword;
