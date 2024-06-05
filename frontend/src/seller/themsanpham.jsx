import React, { useState, useEffect } from 'react';
import ImageInput from './imgthemanh';
import axios from 'axios';
import Getcategorys from '../module/getcategories.module';
import useProductData from '../module/Productmodule';

const ProductForm = () => {
  const { message, errors, postProduct } = useProductData();
  const { categorys } = Getcategorys();
  const [productData, setProductData] = useState({
    coverImage: null,
    images: [],
  });

  const [ten, setTen] = useState('');
  const [gia, setGia] = useState('');
  const [mota, setMota] = useState('');
  const [soluong, setSoluong] = useState('');
  const [loai, setLoai] = useState('');
  const [hidden, setHidden] = useState('no');

  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [savedImagePath, setSavedImagePath] = useState('');
  const [img, setImg] = useState(null);

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    // Tạo tên file mới với timestamp
    const newFileName = `${file.name}`;
    const imageUrl = URL.createObjectURL(file);
    setProductData({ ...productData, coverImage: file });
    setCoverImagePreview(imageUrl);
    // Lưu đường dẫn vào state
    setSavedImagePath(newFileName); // Giả sử bạn có useState('') là savedImagePath
  };
  const handleRemoveCoverImage = () => {
    setProductData({ ...productData, coverImage: null });
    setCoverImagePreview('');
    setSavedImagePath(''); // Đặt lại savedImagePath khi xóa ảnh
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 6 - imagePreviews.length;
    const selectedImages = files.slice(0, remainingSlots);
    const imageUrls = selectedImages.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...imageUrls]);
    setProductData({ ...productData, images: [...productData.images, ...selectedImages] });
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...productData.images];
    const updatedPreviews = [...imagePreviews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setProductData({ ...productData, images: updatedImages });
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // name: ten,
    // price: +gia,
    // description: mota,
    // quantity: +soluong,
    // image: savedImagePath,
    // brand: '12',
    // category: loai,
    // rating:0,
    // numReviews:0,
    // countInStock:2,
    const formData = ({
      name:"aten",
      price: 12,
      description: "mota",
      quantity: 12,
      image: "savedImagePathd",
      brand: '12',
      category: "665e7a673a54e4e4ad90a8e9",
      rating:0,
      numReviews:0,
      countInStock:2,

    });
    // try {// name, description, price, category, quantity, brand, image 

    console.log(formData)
    await postProduct(formData);
    // const token = localStorage.getItem('token');
    // const response = await axios.post('http://localhost:5000/product', {

    // }, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // });
    // if (!response.ok) {
    //   alert('Thêm sản phẩm thành công');
    // } else {
    //   alert('Thêm sản phẩm thất bại');
    // }
    // if (img) {
    //   const formData = new FormData();
    //   formData.append('file', img, savedImagePath);

    //   const response = await fetch('http://localhost:5000/upload', {
    //     method: 'POST',
    //     body: formData,
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   })

    //   if (!response.ok) {
    //     throw new Error('Cover image upload failed');
    //   }

    //   const responseData = await response.json();
    //   setSavedImagePath(responseData.filePath);
    // }
    // // Handle response if needed
    // console.log('Product created:', response.data);

    // } catch (error) {
    //   // Handle errors
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.error('Server responded with an error:', error.response.data);
    //     console.error('Status code:', error.response.status);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     console.error('No response received from server:', error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.error('Error setting up the request:', error.message);
    //   }
    // }

    // // Reset form after submit
    // setTen('');
    // setGia('');
    // setMota('');
    // setSoluong('');
    // setLoai('');
    // setProductData({ coverImage: null, images: [] });
    // setCoverImagePreview('');
    // setImagePreviews([]);
  };
  return (
    <div className="container mt-5 mb-5">
      <div className='d-flex justify-center'>
        <h2>Thêm Sản Phẩm</h2>
      </div>
      <div>
        {/* Hiển thị thông điệp thành công hoặc thất bại */}
        {message && <p>{message}</p>}
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={handleSubmit} >
        <div className='d-flex flex-row '>
          <div className="mb-3 justify-content-center border-end">
            <div className='d-flex flex-row align-items-center'>
              <h5 className='text-rose-500'>*</h5><label htmlFor="coverImage" className="form-label">Ảnh Bìa:</label>
            </div>
            <div className='mr-5'>
              {coverImagePreview && (
                <div className="mb-3 d-flex flex-column content-center ">
                  <img className='border' src={coverImagePreview} alt="Cover Preview" style={{ maxWidth: '200px', marginBottom: '10px' }} />
                  <button type="button" className="btn btn-danger m-1" onClick={handleRemoveCoverImage}>Xóa Ảnh Bìa</button>
                </div>
              )}
              {!coverImagePreview && (
                <ImageInput
                  onChange={handleCoverImageChange}
                  multiple={false} />
              )}
            </div>
          </div>
          <div className="mb-3 ml-4">
            <div className='d-flex flex-row align-items-center'>
              <h5 className='text-rose-500'>*</h5><label htmlFor="images" className="form-label">Hình Ảnh Khác:</label>
            </div>

            <div className='d-flex flex-wrap'>
              {imagePreviews.map((imageUrl, index) => (
                <div key={index} className="mb-3 d-flex justify-content-center align-items-center flex-column mx-1  p-2">
                  <img src={imageUrl} alt={`Product Image ${index}`} className="img-fluid border" style={{ maxWidth: '200px', minHeight: '100px', maxHeight: "100px", marginBottom: '10px' }} />
                  <button type="button" className="btn  btn-danger btn-sm" onClick={() => handleRemoveImage(index)}>Xóa Ảnh</button>
                </div>
              ))}
              {imagePreviews.length < 6 && (
                <div className='d-flex justify-content-center align-items-center '>
                  <ImageInput
                    onChange={handleImageChange}
                    multiple={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='d-flex flex-row'>
          <div className="mb-3 pr-5" style={{ minWidth: '50%' }}>
            <div className='d-flex flex-row align-items-center'>
              <h5 className='text-rose-500'>*</h5><label htmlFor="productName" className="form-label">Tên Sản Phẩm:</label>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Tên Sản Phẩm"
              value={ten}
              onChange={(e) => setTen(e.target.value)}
            />
          </div>
          <div className="mb-3" style={{ minWidth: '50%' }}>
            <div className='d-flex flex-row align-items-center'>
              <h5 className='text-rose-500'>*</h5><label htmlFor="gia" className="form-label">Giá:</label>

            </div>

            <input
              type="number"
              className="form-control"
              value={gia}
              onChange={(e) => setGia(e.target.value)}
              placeholder="Giá Sản Phẩm"
            />
          </div>
        </div>
        <div className='d-flex flex-row'>
          <div className="mb-3 pr-5" style={{ minWidth: '50%' }}>
            <div className='d-flex flex-row align-items-center'>
              <h5 className='text-rose-500'>*</h5><label htmlFor="soluong" className="form-label">Số lượng:</label>
            </div>
            <input
              type="number"
              className="form-control"
              value={soluong}
              onChange={(e) => setSoluong(e.target.value)}
              placeholder="Số Lượng Sản Phẩm"
            />
          </div>
          <div className="mb-3" style={{ minWidth: '50%' }}>
            <div className='d-flex flex-row align-items-center'>
              <h5 className='text-rose-500'>*</h5><label htmlFor="category" className="form-label">Ngành Hàng:</label>
            </div>
            <select
              className="form-select"
              id="category"
              name="category"
              value={loai}
              onChange={(e) => setLoai(e.target.value)}
            >
              {
                categorys.map(e => (
                  <option value={e._id}>{e.name}</option>
                ))
              }

            </select>
          </div>
        </div>
        <div className="mb-3">
          <div className='d-flex flex-row align-items-center'>
            <h5 className='text-rose-500'>*</h5><label htmlFor="description" className="form-label">Mô Tả Sản Phẩm:</label>
          </div>
          <textarea
            className="form-control"
            value={mota}
            onChange={(e) => setMota(e.target.value)}
            placeholder="Mô Tả Sản Phẩm"
          />
        </div>
        <div className='d-flex justify-center'>
          <button type="submit" className="btn btn-primary w-full">Thêm Sản Phẩm</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
