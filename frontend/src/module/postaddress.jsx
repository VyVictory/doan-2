import axios from 'axios';

const PostAddress = async ({ address, city, postalCode, country }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/address', {
            "street": address,
            "city": city,
            "apartment": postalCode,
            "countries": country,
        },
            { withCredentials: true }
        );
        console.log('Response:', response.data);
    } catch (err) {
        console.error('Error:', err);
    }
};

export { PostAddress };