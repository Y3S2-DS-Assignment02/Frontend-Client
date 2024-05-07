import React, { useState } from 'react';
import '../../utils/styles/RegistrationForm.css';

import { UilEye, UilEyeSlash } from '@iconscout/react-unicons';
import { registerInstructor } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { validateRegistrationForm } from '../../utils/helpers/validators'

const InstructorRegistrationForm = (props) => {
    const { toggleLogin, toggleRegister, toggleInstructor } = props;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullname, setFullname] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errors, setErrors] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
        phoneNumber: ''
    });

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
        setPasswordsMatch(e.target.value === password);
    };

    const handleFullNameChange = (e) => {
        setFullname(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateRegistrationForm(fullname, email, username, password, repeatPassword, phoneNumber);
        setErrors(newErrors);

        // Check if any error exists
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        // Check if passwords match
        if (!passwordsMatch) {
            return;
        }

        const response = registerInstructor(username, email, password, phoneNumber, fullname);
        if (response) {
            navigate('/dashboard');
        } else {
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
                    <button className='form-switch-button' onClick={toggleInstructor}>Instructor</button>
                    <button className="form-switch-button" onClick={toggleRegister}>Learner</button>
                    <button className="form-switch-button" onClick={toggleLogin}>SignIn</button>
                </div>
                <form className='register-form' onSubmit={handleSubmit}>
                    <p>
                        <input type="text" value={fullname} className='text-input' placeholder='Full name' onChange={handleFullNameChange} />
                        {errors.fullname && <span className="error-text">{errors.fullname}</span>}
                    </p>
                    <p>
                        <input type="email" value={email} className='text-input' placeholder='Email' onChange={handleEmailChange} />
                        {errors.email && <span className="error-text">{errors.email}</span>}
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
                        {errors.password && <span className="error-text">{errors.password}</span>}
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
                        {errors.repeatPassword && <span className="error-text">{errors.repeatPassword}</span>}
                    </p>
                    <p>
                        <input type="text" value={username} className='text-input' placeholder='Public Username' onChange={handleUsernameChange} />
                        {errors.username && <span className="error-text">{errors.username}</span>}
                    </p>
                    <p>
                        <input type="text" value={phoneNumber} className='text-input' placeholder='Phone Number' onChange={handlePhoneNumberChange} />
                        {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
                    </p>
                    <button type="submit" className='submit-button'>Start Teaching for Free</button>
                </form>
            </div>
        </div>
    );
};

export default InstructorRegistrationForm;
