import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [category, setCategory] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the category to your backend
        axios.post('http://localhost:3000/auth/category/add', { category })
            .then(response => {
                if (response.data.success) {
                    //alert('Category added successfully!');
                    navigate('/dashboard/category'); // Redirect to the category list
                    setCategory(); // Clear the input field after successful submission
                } else {
                    alert(response.data.message);
                }
            })
            .catch(error => {
                console.error('There was an error adding the category!', error);
            });
    }
    return (
        <div className='d-flex justify-content-center align-items-center h-75'>
            <div className='p-3 border rounded w-25'>
                <div className='text-danger'>

                </div>
                <h2>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="category">
                            <strong>Category:</strong>
                        </label>
                        <input
                            className='form-control rounded-0'
                            type="text"
                            id="category"
                            name="category"
                            autoCapitalize='off'
                            placeholder='Enter Category'
                            onChange={(e) => setCategory(e.target.value)}
                            value={category} />
                    </div>
                    <button className='btn btn-success w-100 rounded-0' type="submit">Add Category</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory