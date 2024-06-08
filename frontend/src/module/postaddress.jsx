import axios from 'axios';

const PostAddress = async ({ address, city, postidalCode, country }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/address', {
            "address": address,
            "city": city,
            "postidalCode": postidalCode,
            "country": country,
        },
            { withCredentials: true }
        );
        console.log({
            "address": address,
            "city": city,
            "postidalCode": postidalCode,
            "country": country,
        })
        console.log('Response:', response.data);
    } catch (err) {
        console.error('Error:', err);
    }
};
export { PostAddress };
