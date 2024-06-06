const changeImgProduct = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    // Log FormData entries for debugging
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/api/upload/product', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Trả về response.data
    } catch (error) {
        console.error('Error uploading image:', error);
        return null; // Trả về null nếu có lỗi
    }
};
