import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Category = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from the backend if needed
        axios.get('http://localhost:3000/auth/category')
            .then(response => {
                console.log(response.data);
                if (response.data.Status) {
                    setCategories(response.data.categories);
                } else {
                    console.error('Error fetching categories:', response.data.message);
                }
            })
            .catch(error => console.error('There was an error fetching the categories!', error));

    }, []);


    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Category List</h3>
            </div>
            <Link to="/dashboard/category/add" className='btn btn-primary mb-3'>
                <i className="bi bi-plus-circle"></i> Add Category
            </Link>
            <div className='mt-3'>
                <table className='table table-bordered table-striped'>
                    <thead className='table'>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody className='table-light'>
                        {categories.map((category, index) => (
                            <tr key={index}>
                                <td>{category.name}</td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan="1" className='text-center'>No categories found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Category