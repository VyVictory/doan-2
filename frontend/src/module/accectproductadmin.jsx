import axios from 'axios';

const accectproductadmin = async (id, Approve, ApproveStatus) => {
    try {
        const formData = new FormData();
        // Add data to FormData
        formData.append('Approve', Approve);
        formData.append('ApproveStatus', ApproveStatus);
        const response = await axios.put(`http://localhost:5000/api/products/approve/${id}`, formData, { withCredentials: true });
        console.log(response);
        return response; // Return the response
    } catch (err) {
        console.error(err);
        throw err; // Throw the error to handle it outside this function if needed
    }
};

export default accectproductadmin;
