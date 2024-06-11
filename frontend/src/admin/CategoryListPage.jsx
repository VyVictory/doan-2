import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryListPage = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editCategoryName, setEditCategoryName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [editCategoryId, setEditCategoryId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/category/categories',{ withCredentials: true });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const addCategory = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/category',{ name: newCategoryName },{ withCredentials: true });
            setCategories([...categories, response.data]);
            setNewCategoryName('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/category/${id}`,{ withCredentials: true });
            setCategories(categories.filter(category => category._id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const editCategory = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/category/${id}`, { name: editCategoryName },{ withCredentials: true });
            setEditCategoryId(null);
            setEditCategoryName('');
            fetchCategories(); // Fetch categories again to update the list
        } catch (error) {
            console.error('Error editing category:', error);
        }
    };

    // Filter categories based on search term
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="mx-auto max-w-2xl p-6 bg-gray-100 rounded-lg shadow-md d-flex flex-column ">
            <h1 className="text-3xl font-semibold mb-4">Danh Sách Loại</h1>
            {/* Search input */}
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm Loại..."
                className="rounded-lg border border-gray-400 px-4 py-2 mb-4"
            />
            <ul>
                {currentCategories.map(category => (
                    <li key={category._id} className="flex items-center justify-between bg-white rounded-lg p-3 mb-2">
                        {editCategoryId === category._id ? (
                            <input
                                type="text"
                                value={editCategoryName}
                                onChange={(e) => setEditCategoryName(e.target.value)}
                                className="flex-1 rounded-l-lg border border-gray-400 px-4 py-2"
                            />
                        ) : (
                            <span>{category.name}</span>
                        )}
                        <div>
                            {editCategoryId === category._id ? (
                                <button onClick={() => editCategory(category._id)} className="bg-green-500 text-white px-3 py-1 rounded-lg">Save</button>
                            ) : (
                                <button onClick={() => {
                                    setEditCategoryId(category._id);
                                    setEditCategoryName(category.name);
                                }} className="bg-yellow-500 text-white px-3 py-1 rounded-lg">Edit</button>
                            )}
                            <button onClick={() => deleteCategory(category._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg ml-2">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Pagination */}
            <ul className="flex justify-center">
                {Array.from({ length: Math.ceil(filteredCategories.length / itemsPerPage) }, (_, index) => (
                    <li key={index} className="mx-1">
                        <button onClick={() => paginate(index + 1)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">{index + 1}</button>
                    </li>
                ))}
            </ul>
            <div className="mt-4 flex">
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 rounded-l-lg border border-gray-400 px-4 py-2"
                />
                <button onClick={addCategory} className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">Thêm Loại</button>
            </div>
        </div>
    );
};

export default CategoryListPage;
