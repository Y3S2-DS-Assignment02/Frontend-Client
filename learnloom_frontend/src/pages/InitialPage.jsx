import React, { useState } from "react";
import Login from "../components/Auth/Login";
import RegistrationForm from "../components/Auth/RegistrationForm";
import '../utils/styles/InitPage.css';

const InitialPage = () => {

    const [showLogin, setShowLogin] = useState(true);
    
    const toggleLogin = () => {
        setShowLogin(true);
    }

    const toggleRegister = () => {
        setShowLogin(false);
    }

    return (
        <div className="init-page">
            <div className="welcome-text">
                <h1>Welcome to our App</h1>
                <p>Sign in or register to get started</p>
            </div>
            <div className="render-form">
                <div>
                    {showLogin ? <Login toggleLogin={toggleLogin} toggleRegister={toggleRegister} /> : <RegistrationForm toggleLogin={toggleLogin} toggleRegister={toggleRegister} />}  
                </div>    
            </div>
        </div>
    );
}

export default InitialPage;