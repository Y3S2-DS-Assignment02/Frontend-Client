import React, { useState } from "react";
import '../utils/styles/InitPage.css';

//Components
import Login from "../components/Auth/Login";
import RegistrationForm from "../components/Auth/RegistrationForm";
import InstructorRegistrationForm from "../components/Auth/InstructorRegistrationForm";

const InitialPage = () => {

    const [showLogin, setShowLogin] = useState(true);
    const [showInstructor, setShowInstructor] = useState(false);
    
    const toggleLogin = () => {
        setShowLogin(true);
    }

    const toggleRegister = () => {
        setShowLogin(false);
        setShowInstructor(false);
    }

    const toggleInstructor = () => {
        setShowInstructor(!showInstructor);
        console.log(showInstructor)
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
                    {
                    showLogin ? 
                    <Login toggleLogin={toggleLogin} toggleRegister={toggleRegister} /> 
                    : 
                    showInstructor ? 
                    <InstructorRegistrationForm toggleLogin={toggleLogin} toggleRegister={toggleRegister} toggleInstructor={toggleInstructor} />
                    : 
                    <RegistrationForm toggleLogin={toggleLogin} toggleRegister={toggleRegister} toggleInstructor={toggleInstructor} /> 
                    }
                </div>   
            </div>
            <div>
            </div>
        </div>
    );
}

export default InitialPage;