import React from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Category List</h3>
            </div>
            <Link to="/dashboard/category/add" className='btn btn-primary mb-3'>
                <i className="bi bi-plus-circle"></i> Add Category
            </Link>
        </div>
    )
}

export default Category