import React, { useState } from 'react';
import '../../utils/styles/RegistrationForm.css';
import { UilEye, UilEyeSlash  } from '@iconscout/react-unicons';
import { registerLearner } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = (props) => {
    const { toggleLogin, toggleRegister } = props;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullname, setFullname] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
    };

    const handleFullNameChange = (e) => {
        setFullname(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            alert('Passwords do not match');
            return;
        }
        const response = registerLearner(username, email, password, phoneNumber, fullname);
        if(response) {
            navigate('/dashboard');
        }
        else {
            alert('Something went wrong');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    return (
        <div>
            <div className='register-form-wrap'>
                <div>
                    <button className="form-switch-button" onClick={toggleRegister}>Register</button>
                    <button className="form-switch-button" onClick={toggleLogin}>SignIn</button>
                </div>
                <form className='register-form' onSubmit={handleSubmit}>
                    <p>
                        <input type="text" value={fullname} className='text-input' placeholder='Full name' onChange={handleFullNameChange} />
                    </p>
                    <p>
                        <input type="email" value={email} className='text-input' placeholder='Email' onChange={handleEmailChange} />
                    </p>
                    <p>
                        <div className="password-input-container">
                            <input type={showPassword ? "text" : "password"} value={password} className='text-input' placeholder='Password' onChange={handlePasswordChange} />
                            { showPassword ? (
                                <UilEyeSlash size="24" color="black" className='password-toggle-icon' onClick={togglePasswordVisibility} />
                            ) : (
                                <UilEye size="24" color="black" className='password-toggle-icon' onClick={togglePasswordVisibility} />
                            )}                           
                        </div>
                    </p>
                    <p>
                        <div className="password-input-container">
                            <input type={showRepeatPassword ? "text" : "password"} value={repeatPassword} className='text-input' placeholder='Re-enter Password' onChange={handleRepeatPasswordChange} />
                            { showRepeatPassword ? (
                                <UilEyeSlash size="24" color="black" className='password-toggle-icon' onClick={toggleRepeatPasswordVisibility} />
                            ) : (
                                <UilEye size="24" color="black" className='password-toggle-icon' onClick={toggleRepeatPasswordVisibility} />
                            )}
                        </div>
                    </p>
                    <p>
                        <input type="text" value={username} className='text-input' placeholder='Public Username' onChange={handleUsernameChange} />
                    </p>
                    <p>
                        <input type="text" value={phoneNumber} className='text-input' placeholder='Phone Number' onChange={handlePhoneNumberChange} />
                    </p>
                    <button type="submit" className='submit-button'>Create an account for free</button>
                </form>
            </div>
        </div>     
    );
};

export default RegistrationForm;
