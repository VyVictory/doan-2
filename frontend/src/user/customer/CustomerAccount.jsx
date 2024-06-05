import React, { useState } from 'react';
import avt_img from '../imguser/bar/user.png';
import Authmodule from '../../module/authmodule';

function CustomerAccount() {
  const [previewSrc, setPreviewSrc] = useState(null);
  const [img, setImg] = useState(null);

  const { message, errors,data, changeAvatar } = Authmodule();

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
    if (img) {
      await changeAvatar(img);
      console.log(message, errors,data);
    } else {
      console.log("No image selected");
    }
  };

  return (
    <div className="CustomerAccount p-3">
      <div className='mb-2'>
        <div className='text-gray-500'>Thông tin cá nhân</div>
      </div>
      <div>
        <div>
          <input type="file" id="fileInput" className='d-none' onChange={previewImage} />
          <label htmlFor="fileInput">
            <img
              src={previewSrc || avt_img}
              style={{ height: '100px', width: '100px', cursor: 'pointer', border: '3px solid rgb(194, 225, 255)', borderRadius: '50%' }}
              alt="Avatar Preview"
            />
          </label>
        </div>
        <div></div>
      </div>
      <div>
        <button className='btn btn-primary' onClick={handleSubmit}>Lưu Thay Đổi</button>
      </div>
    </div>
  );
}

export default CustomerAccount;
