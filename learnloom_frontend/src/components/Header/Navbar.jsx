import React, { useState } from "react";
import "../../utils/styles/Navbar.css";

import { logout } from "../../services/AuthService";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav>
      <ul>
        <div className="nav-body">
          <div className="nav-row-1">
            <li
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "24px",
                color: "#333",
                listStyleType: "none",
              }}
            >
              <h1 style={{ margin: 0 }}>
                <a
                  href="/home"
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  Learnloom
                </a>
              </h1>
            </li>

            <li>
              <a href="/CoursesPage">Courses</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </div>
          <div className="nav-row-2">
            <li>
              <a href="/">Login</a>
            </li>
            <li>
              <div className="profile-dropdown">
                <button onClick={toggleDropdown}>Account</button>
                {dropdownVisible && (
                  <div className="dropdown-content">
                    <a href="/profile">Profile</a>
                    <a href="/MyCourses">My Courses</a>
                    <button className="logout-button" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </li>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
