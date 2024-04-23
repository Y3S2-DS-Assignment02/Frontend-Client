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
                <h1>Start</h1>
                <h1>learning</h1>
                <h1 className="welcome-title">with LearnLoom</h1>
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