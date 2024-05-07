import React, { useState } from 'react';
import '../../utils/styles/Navbar.css';

const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav>
            <ul>
                <div className='nav-body'>   
                    <div className='nav-row-1'>
                        <li><a href="/courses">Courses</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/">Contact</a></li>
                    </div>
                    <div className='nav-row-2'>
                        <li><a href="/">Login</a></li>
                        <li>
                            <div className="profile-dropdown">
                                <button onClick={toggleDropdown}>Account</button>
                                {dropdownVisible && (
                                    <div className="dropdown-content">
                                        <a href="/profile">Profile</a>
                                        <a href="/profile">My Courses</a>
                                        <a href="/profile">Logout</a>
                                        {/* Additional options */}
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
