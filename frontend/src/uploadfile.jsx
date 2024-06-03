const uploadFile = async (file, setSavedImagePath) => {
    try {
      // Tạo FormData để gửi file
      const formData = new FormData();
      formData.append('file', file, file.name);
  
      // Gửi request lên server, ví dụ sử dụng fetch
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
        // Cần thêm headers nếu server yêu cầu, ví dụ:
        // headers: {
        //   'Authorization': 'Bearer your_access_token',
        // }
  
        // Cần chỉ định headers cho form data nếu server yêu cầu
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // }
  
        // Hoặc có thể chỉ định content-type cho formData
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax
      });
  
      // Kiểm tra response
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      // Nếu mọi thứ thành công, có thể xử lý response
      const responseData = await response.json();
      console.log('Uploaded:', responseData);
  
      // Đặt lại savedImagePath với tên mới
      setSavedImagePath(responseData.filePath); // Đây là đường dẫn mà server trả về sau khi upload thành công
    } catch (error) {
      console.error('Upload failed:', error.message);
      // Xử lý lỗi nếu cần
    }
  };
  