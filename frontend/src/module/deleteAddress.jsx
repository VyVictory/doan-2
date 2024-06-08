import axios from 'axios';

const DeleteAddress = async ({ idaddress }) => {
    try {
        const response = await axios.delete(
            `http://localhost:5000/api/users/address/${idaddress}`,
            { withCredentials: true }
        ); 
        console.log('Response:', response.data);  
        return response; // Return the response object
    } catch (err) {
        console.error('Error:', err);
        throw err; // Rethrow the error to handle it in the component
    }
};

export { DeleteAddress };
