import React, { useState } from 'react';

const YourComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [savedImagePath, setSavedImagePath] = useState('');

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setCoverImagePreview(imageUrl);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);

      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
        // Headers nếu cần
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const responseData = await response.json();
      console.log('Uploaded:', responseData);

      setSavedImagePath(responseData.filePath);
    } catch (error) {
      console.error('Upload failed:', error.message);
      // Xử lý lỗi nếu cần
    }
  };

  return (
    <div>
      <input type="file" onChange={handleCoverImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {coverImagePreview && <img src={coverImagePreview} alt="Cover Preview" />}
      {savedImagePath && <p>Saved Image Path: {savedImagePath}</p>}
    </div>
  );
};

export default YourComponent;
