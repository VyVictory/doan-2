import axios from 'axios';
const DeleteAddress = async ({idaddress}) => {
    try {
        const response = await axios.delete('http://localhost:5000/api/users/address/'+idaddress,{ withCredentials: true }
        );
        // console.log('Response:', response.data);
    } catch (err) {
        console.error('Error:', err);  
    }
};
export { DeleteAddress };
