import React, { useEffect, useState } from 'react'
import axios from 'axios';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salery: '',
        address: '',
        category_id: '',
        profile: ''
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/auth/employee/add', employee)
            .then(response =>
                console.log(response.data)
            )
            .catch(error =>
                console.error('There was an error adding the employee!')
            );
    }

    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 border rounded w-50'>
                <h2 className='text-center'>Add Employee</h2>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor="name" className='form-label'>
                            <strong>Name:</strong>
                        </label>
                        <input
                            className='form-control rounded-0'
                            type="text"
                            id="name"
                            name="name"
                            autoCapitalize='off'
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                            value={employee.name}
                            placeholder='Enter name' />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="email">
                            <strong>Email:</strong>
                        </label>
                        <input
                            className='form-control rounded-0'
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                            value={employee.email}
                            autoCapitalize='off'
                            placeholder='Enter email' />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="password">
                            <strong>Password:</strong>
                        </label>
                        <input
                            className='form-control rounded-0'
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
                            value={employee.password}
                            autoCapitalize='off'
                            placeholder='Enter password' />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="salery">
                            <strong>Salery:</strong>
                        </label>
                        <input
                            className='form-control rounded-0'
                            type="number"
                            id="salery"
                            name="salery"
                            onChange={(e) => setEmployee({ ...employee, salery: e.target.value })}
                            value={employee.salery}
                            autoCapitalize='off'
                            placeholder='Enter salery' />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="address">
                            <strong>Address:</strong>
                        </label>
                        <input
                            className='form-control rounded-0'
                            type="text"
                            id="address"
                            name="address"
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                            value={employee.address}
                            autoCapitalize='off'
                            placeholder='Enter address' />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="category_id">
                            <strong>Category:</strong>
                        </label>
                        <select name="category_id" id="category_id" className='form-select rounded-0'
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='col-12'>
                        <label htmlFor="profile">
                            <strong>profile:</strong>
                        </label>
                        <input
                            className='form-control rounded-0'
                            type="file"
                            id="profile"
                            onChange={(e) => setEmployee({ ...employee, profile: e.target.files[0] })}
                            name="profile" />
                    </div>
                    <button className='btn btn-success w-100 rounded-0' type="submit">Add Employee</button>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee