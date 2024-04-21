import React, { useState } from 'react';
import { login } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import '../../utils/styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    const handleNavigate = () => {
        navigate('/create-account');
    }

    return (
        <div>
            <div className="login-form-wrap">
                <h2>Login</h2>
                <form className="login-form">
                    <p>
                    <input type="text" className="username" name="username" placeholder="Username" onChange={handleEmailChange} required />
                    </p>
                    <p>
                    <input type="email" className="email" name="email" placeholder="Email Address" onChange={handlePasswordChange} required />
                    </p>
                    <p>
                    <button type="submit" className='submit-button' onClick={handleSubmit}>Login</button>
                    </p>
                </form>
                <div id="create-account-wrap">
                    <p>Not a member? <button onClick={handleNavigate}>Create Account</button></p>
                </div>
            </div>
        </div>
    );
};

export default Login;