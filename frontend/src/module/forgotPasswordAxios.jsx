


import axios from 'axios';

const ForgotPassword = async (email) => {
  try {
    const response = await axios.get('http://localhost:5000/api/users/auth/forgotpassword?email='+ email,
    { withCredentials: true }
    )
      
    console.log('Response:', response.data);  
    return response; // Trả về đối tượng response
  } catch (err) {
    console.error('Error:', err);
    throw err; // Ném lỗi để xử lý trong component
  }
};

export { ForgotPassword };
