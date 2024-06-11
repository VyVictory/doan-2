import axios from 'axios';

const changeAvatar = async (avatarFile) => {
  const formData = new FormData();
  formData.append('image', avatarFile);

  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:5000/api/upload/avatar', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.image; // Return the image URL from the response
  } catch (error) {
    throw error; // Throw the error for handling in the calling component
  }
};

export default changeAvatar;
