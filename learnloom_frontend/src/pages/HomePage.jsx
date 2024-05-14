import React from "react";
import { useNavigate } from "react-router-dom";
import "../utils/styles/Home.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    // <div>
    //     <h1>Welcome to Learnloom</h1>
    //     <p>Learn, grow, and succeed with our online courses.</p>
    //     <button onClick={()=>{navigate('/inscourse')}}>My courses</button>
    // </div>
    <>
      <div className="home-page">
        <header>
          <h1>Welcome to Learnloom</h1>
          <p>Empower Your Learning Journey</p>
        </header>
        <section className="features">
          <div className="feature">
            <h2>Learn Anywhere, Anytime</h2>
            <p>Access our courses from any device, at your convenience.</p>
          </div>
          <div className="feature">
            <h2>Expert Instructors</h2>
            <p>Learn from industry experts with real-world experience.</p>
          </div>
          <div className="feature">
            <h2>Interactive Learning</h2>
            <p>Engage with interactive content and hands-on exercises.</p>
          </div>
        </section>
        <section className="cta">
          <h2>Ready to Start Learning?</h2>
          <button>Explore Courses</button>
          <button onClick={()=>{navigate('/inscourse')}}>My courses</button>
        </section>
      </div>

      <footer>
        <p>&copy; 2024 Learnloom. All rights reserved.</p>
      </footer>
    </>
  );
};

export default HomePage;
