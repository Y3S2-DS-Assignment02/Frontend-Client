import React from 'react';

const HomePage = () => {
    console.log(localStorage.getItem("userId"));
    return (
        <div>
            <h1>Welcome to Learnloom</h1>
            <p>Learn, grow, and succeed with our online courses.</p>
        </div>
    );
};

export default HomePage;