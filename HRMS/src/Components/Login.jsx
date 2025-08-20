import React,{useState} from 'react'
import './style.css'
import axios from 'axios'


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        tick: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/auth/adminlogin',values)
            .then(result => console.log(result))
            .catch(err => console.error(err))


    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 border rounded w-25 loginForm'>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input
                            className='form-control rounded-0'
                            type="email"
                            id="email"
                            name="email"
                            autoCapitalize='off'
                            placeholder='Enter Email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password:</label>
                        <input
                            className='form-control rounded-0'
                            type="password"
                            id="password"
                            name="password"
                            autoCapitalize='off'
                            placeholder='Enter Password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            />
                    </div>

                    <button className='btn btn-success w-100 rounded-0' type="submit">Login</button>
                    <div className='mb-1'>
                        <input
                            type="checkbox"
                            name="tick"
                            id="tick"
                            className='me-2' />
                        <label htmlFor="tick">You are Agree with terms & conditions</label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login