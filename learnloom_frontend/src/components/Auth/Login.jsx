import React, { useState } from 'react';
import { login } from '../../services/AuthService';
import '../../utils/styles/Login.css';
import { UilEye } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const { toggleLogin, toggleRegister } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
        if (response) {
            navigate('/dashboard');
        } else {
            alert('Invalid credentials');
        }
        } catch (error) {
           alert('Something went wrong'); 
        } 
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="login-form-wrap">
                <div className='form-change-buttons'>
                    <button className="form-switch-button" onClick={toggleRegister}>Register</button>
                    <button className="form-switch-button" onClick={toggleLogin}>SignIn</button>
                </div>
                <form className="login-form">
                    <p>
                        <input type="text" className="text-input" name="username" placeholder="Username" onChange={handleEmailChange} required />
                    </p>
                    <p>
                        <div className="password-input-container">
                            <input type={showPassword ? "text" : "password"} className="text-input" name="password" placeholder="Password" onChange={handlePasswordChange} required />
                            <span className="password-toggle-icon" onClick={togglePasswordVisibility}><UilEye size="24" color="black" /></span>
                        </div>
                    </p>
                    <p>
                        <button type="submit" className='submit-button' onClick={handleSubmit}>Sign In</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
