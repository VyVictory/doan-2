import axios from 'axios';
const DeleteProductById = async ({idproduct}) => {
    try {
        const response = await axios.delete('http://localhost:5000/api/carts/delete/'+idproduct,{ withCredentials: true }
        );
        // console.log('Response:', response.data);
    } catch (err) {
        console.error('Error:', err);  
    }
};
export { DeleteProductById };
