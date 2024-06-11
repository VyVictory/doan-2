import React, { useEffect, useState } from 'react';
import avt_img from '../imguser/bar/user.png';
import Authmodule from '../../module/authmodule';
import useProfile from '../../module/profile.module';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CustomerAccount() {
  const [previewSrc, setPreviewSrc] = useState(null);
  const [number, setNumber] = useState(0);
  const [profileUpdate, setProfileUpdate] = useState({
    username: '',
    fullname: '',
    born: '',
    gender: '',
    avatar: ''
  });
  const [img, setImg] = useState(null);
  const { profile } = useProfile();
  const { message, errors, data, changeAvatar, updateProfile } = Authmodule();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded && profile.username) {
      setProfileUpdate({
        username: profile.username,
        fullname: profile.fullname,
        born: profile.born,
        gender: profile.gender,
        avatar: profile.avatar,
      });
      setLoaded(true);
    }
  }, [profile, loaded]);

  const previewImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (img) { // Check if an image is selected
      await changeAvatar(img);
      // console.log(message, errors, data);
      if (data.image) {
        setProfileUpdate((prevProfile) => ({
          ...prevProfile,
          avatar: data.image,
        }));
        if (number == 0) {
          toast.success('bấm lại để xác nhận', { autoClose: 2000 });
          setNumber(1);
        } if (number == 1) {
          await updateProfile(profileUpdate);
          toast.success('Cập nhật thông tin thành công!', { autoClose: 2000 });
          window.location.href ='/customer/account'
        }
      }
    } else {
      await updateProfile(profileUpdate);
      toast.success('Cập nhật thông tin thành công!', { autoClose: 2000 });
      console.log("No image selected");
    }
  };
  // Get today's date in YYYY-MM-DD format
  const today = new Date();
  const maxDate = new Date(today.setDate(today.getDate() - 1)).toISOString().split('T')[0];

  const handleDateChange = (e) => {
    const inputDate = new Date(e.target.value);
    if (inputDate > new Date(maxDate)) {
      e.target.value = maxDate; // Set value to maxDate if input date exceeds it
    }
    setProfileUpdate({ ...profileUpdate, born: e.target.value });
  };
  return (
    <div className='d-flex ml-5' style={{ marginLeft: '25px' }}>
      <ToastContainer />
      <div className='d-flex flex-row' style={{ width: '800px' }}>
        <div className="CustomerAccount pr-3 border-end mt-3 mb-3" style={{ paddingRight: '5%', marginLeft: '5%' }}>
          <div style={{ width: '100%' }}>
            <div className='mb-2 items-center text-lg'>
              <div className='text-gray-500'>Thông tin cá nhân</div>
            </div>
            <div className='d-flex flex-row'>
              <div style={{ minWidth: '100px' }}>
                <input type="file" id="fileInput" className='d-none' onChange={previewImage} />
                <label htmlFor="fileInput">
                  <img
                    src={previewSrc || 'http://localhost:5000' + profile.avatar || 'avt_img'}
                    style={{ height: '100px', width: '100px', cursor: 'pointer', border: '3px solid rgb(194, 225, 255)', borderRadius: '50%' }}
                    alt="Avatar Preview"
                  />
                </label>
              </div>
              <div className='d-flex flex-row ' style={{ width: '100%' }}>
                <div className='d-flex flex-column ml-4 justify-center mr-3'>
                  <label htmlFor="usernameinput" style={{ height: '37.6px' }} className='text-nowrap pt-1'>
                    Tên Đăng Nhập:
                  </label>
                  <div className='h-4'>
                  </div>
                  <label style={{ height: '37.6px' }} htmlFor="fullnameinput" className='text-nowrap pt-1'>
                    Họ & Tên:
                  </label>
                </div>
                <div className='d-flex flex-column justify-center'>
                  <input
                    type="text"
                    className="form-control"
                    id='usernameinput'
                    value={profileUpdate.username}
                    onChange={(e) => setProfileUpdate({ ...profileUpdate, username: e.target.value })}
                    placeholder="Nhập tên đăng nhập"
                  />
                  <div className='h-4'>
                  </div>
                  <input
                    type="text"
                    className="form-control "
                    id='fullnameinput'
                    value={profileUpdate.fullname}
                    onChange={(e) => setProfileUpdate({ ...profileUpdate, fullname: e.target.value })}
                    placeholder="Nhập họ và tên"
                  />
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <div className='d-flex flex-row mt-3'>
                <label htmlFor="borninput" style={{ height: '37.6px', width: '21%' }} className='text-nowrap pt-1 mr-5'>
                  Ngày sinh:
                </label>
                <input
                  type="date"
                  className="form-control "
                  id='dateinput'
                  value={profileUpdate.born}
                  onChange={handleDateChange}
                  max={maxDate}
                  placeholder="Nhập ngày sinh"
                />
              </div>
              <div className='d-flex flex-row mt-3'>
                <label htmlFor="genderinput" style={{ height: '37.6px', width: '21%' }} className='text-nowrap pt-1 mr-5'>
                  giới tính:
                </label>
                <select
                  className="form-control"
                  id="genderinput"
                  value={profileUpdate.gender}
                  onChange={(e) => setProfileUpdate({ ...profileUpdate, gender: e.target.value })}
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
            <div className='mt-4 d-flex justify-content-center' style={{ width: '100%' }}>
              <button className='btn btn-primary' onClick={handleSubmit}>Lưu Thay Đổi</button>
            </div>
          </div>
        </div>
        <div style={{ width: '120px', marginLeft: '5%' }}>
          <div className="CustomerAccount pl-3 pr-3 mt-3 mb-3">
            <div style={{ width: '500px' }}>
              <div className=' mb-3 text-lg text-gray-500'>
                Số điện thoại & email
              </div>
              <div className='d-flex justify-content-between flex-row items-center w-60 mb-3'>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <div className='ml-3'>
                  <div className='text-nowrap w-36'>
                    Số điện thoại
                  </div>
                  <div >
                    {profile.phone}
                  </div>
                </div>
                <a href='/customer/editphone' className='ml-5 btn btn-info text-nowrap'>
                  Thay đổi
                </a>
              </div>
              <div className='d-flex justify-content-between flex-row items-center w-60' >
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>

                </div>
                <div className='ml-3'>
                  <div className='text-nowrap w-36'>
                    Địa chỉ email
                  </div>
                  <div className='text-nowrap'>
                    {profile.email}
                  </div>
                </div>
                <a href='/customer/editemail' style={{ float: 'right' }} className='ml-5 btn btn-info text-nowrap'>
                  Thay đổi
                </a>
              </div>
            </div>
            <div style={{ width: '500px' }}>
              <div className=' mb-3 mt-4 text-lg text-gray-500 text-nowrap '>
                Bảo mật
              </div>
              <div className='d-flex justify-content-between flex-row items-center w-60 mb-3'>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>

                </div>
                <div className='ml-3 text-nowrap'>
                  <div className='w-36'>
                    Mật Khẩu
                  </div>
                </div>
                <a href='/customer/editpassword' className='ml-5 btn btn-info text-nowrap'>
                  Thay đổi
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}

export default CustomerAccount;
