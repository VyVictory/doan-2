import axios from 'axios';

const PostCar = async ({idproduct,numberproduct}) => {
    try {
        const response = await axios.post('http://localhost:5000/api/carts/add',{
            "productId":idproduct,
            "quantity":numberproduct,
          }, { withCredentials: true }
        );
        console.log('Response:', response.data);
    } catch (err) {
        console.error('Error:', err);  
    }
};

export { PostCar };
