import React, { useState, useEffect } from 'react';
import ImageInput from './imgthemanh';
import axios from 'axios';
import Getcategorys from '../module/getcategories.module';
import useProductData from '../module/Productmodule';
import GetProduct from '../module/getproduct';
const EditProduct = () => {
  const { message, errors, changeImgProduct, updateProduct,updateProductQuality } = useProductData();
  const { categorys } = Getcategorys();

  const [productData, setProductData] = useState({
    coverImage: null,
    images: [],
  });
  const [soluongold, setSoluongold] = useState(0);
  const [ten, setTen] = useState('');
  const [gia, setGia] = useState('');
  const [mota, setMota] = useState('');
  const [brand, setBrand] = useState('');
  const [soluong, setSoluong] = useState(0);
  const [loai, setLoai] = useState('');
  const [imageproduct, setImageproduct] = useState('');
  useEffect(() => {
    const fetchProductList = async () => {
      const { sanpham } = await GetProduct();
      setImageproduct(sanpham.image);
      setLoai(sanpham.category);
      setSoluong(sanpham.quantity);
      setSoluongold(sanpham.quantity);
      setBrand(sanpham.brand);
      setMota(sanpham.description);
      setGia(sanpham.price);
      setTen(sanpham.name);
    };
    fetchProductList();
  }, []);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setProductData({ ...productData, coverImage: file });
    const imageUrl = URL.createObjectURL(file);
    setCoverImagePreview(imageUrl);
  };

  const handleRemoveCoverImage = () => {
    setProductData({ ...productData, coverImage: null });
    setCoverImagePreview('');
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

    // Validate required fields
    if (ten === '' || gia === '' || loai === '' || soluong === '' || mota === '') {
      alert('Vui lòng chọn ảnh và điền đầy đủ thông tin cần thiết.');
      return;
    }

    const formData = new FormData();
    formData.append('name', ten);
    formData.append('description', mota);
    formData.append('price', +gia);
    formData.append('category', loai);
    formData.append('quantity', +soluongold);
    formData.append('brand', brand);

    if (!productData.coverImage) {
      formData.append('image', imageproduct);
    } else {
      const uploadedImageData = await changeImgProduct(productData.coverImage);
      if (uploadedImageData.image) {
        setImageproduct( uploadedImageData.image)
        formData.append('image', uploadedImageData.image);
      }
    }
    
    console.log(formData.get('name'));

    try {
      if (soluongold == soluong) {
        await updateProduct(formData);
      } else {
        try {
          const { sanpham } = await GetProduct();
          const response = await axios.patch(`http://localhost:5000/api/products/countStock/${sanpham._id}?productId=${sanpham._id}`, {
            "quantity":+soluong
          }, { withCredentials: true });
          console.log('Update product successful!', response);
        } catch (error) {
          if (error.response) {
            if (error.response.data.errors) {
              console.log(error.response.data.errors);
              console.log('Update product failed. Please check your inputs.');
            } else {
              console.log(error.response.data.message || 'Update product failed. Please try again.',soluong);
            } 
          } else {
            console.log('An error occurred. Please try again later.');
          }
        }
      }
      // Reset form state after successful submission
      alert('Sửa sản phẩm thành công!');
      window.location.href = '/kenhnguoiban/quanlysanpham';
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Có lỗi xảy ra khi sửa sản phẩm.');
    }

    setProductData({
      coverImage: null,
      images: [],
    });
  };


  return (
    <div className="container mt-5 mb-5">
      <div id='thongbao'></div>
      <div className='d-flex justify-center'>
        <h2>Sửa Thông Tin Sản Phẩm</h2>
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

              <div className="mb-3 d-flex flex-column content-center">
                <label htmlFor="coverImageInput" style={{ cursor: 'pointer' }}>
                  <img
                    className='border'
                    src={coverImagePreview || 'http://localhost:5000' + imageproduct}
                    alt="Cover Preview"
                    style={{ maxWidth: '200px', marginBottom: '10px' }}
                  />
                </label>
                {!coverImagePreview && (
                  <input
                    id="coverImageInput"
                    type="file"
                    onChange={handleCoverImageChange}
                    style={{ display: 'none' }}
                  />
                )}
                {/* <button type="button" className="btn btn-danger m-1" onClick={handleRemoveCoverImage}>Xóa Ảnh Bìa</button> */}
              </div>
              {coverImagePreview && (
                <div className="mb-3 d-flex flex-column content-center ">
                  <button type="button" className="btn btn-danger m-1" onClick={handleRemoveCoverImage}>Xóa Ảnh Bìa</button>
                </div>
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
              required
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
              required
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
              required
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
              required
            >
              <option value="">Chọn Loại Sản Phẩm</option> {/* Empty default option */}
              {categorys.map((e) => (
                <option key={e._id} value={e._id}>{e.name}</option>
              ))}
            </select>

          </div>
        </div>


        <div className='d-flex flex-row'>
          <div className="mb-3 pr-5" style={{ minWidth: '50%' }}>
            <div className='d-flex flex-row align-items-center'>
              <h5 className='text-rose-500'>*</h5><label htmlFor="productName" className="form-label">Thương hiệu Sản Phẩm:</label>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Thương hiệu Sản Phẩm"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>

          <div className="mb-3" style={{ minWidth: '50%' }}>
            <div className='d-flex flex-row align-items-center'>
              <h5 className='text-rose-500'>*</h5><label htmlFor="description" className="form-label">Mô Tả Sản Phẩm:</label>
            </div>
            <textarea
              className="form-control"
              value={mota}
              onChange={(e) => setMota(e.target.value)}
              placeholder="Mô Tả Sản Phẩm"
              required
            />
          </div>
        </div>


        <div className='d-flex justify-center'>
          <button type="submit" className="btn btn-primary w-full">Lưu thay đổi</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
