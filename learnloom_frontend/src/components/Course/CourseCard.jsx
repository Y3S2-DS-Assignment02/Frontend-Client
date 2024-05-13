

import React from 'react';
import { Link } from 'react-router-dom';
import '../../utils/styles/CourseCard.css'

const CourseCard = ({ course }) => {
  return (
    <div className="course-card-container"> 
      <div className="course-card">
        <div className="inner">
          <span className="pricing">${course.price} <small></small></span>
          <h2 className="title">{course.title}</h2>
          
          <p className="info">Duration: {course.duration} hrs</p>
          <p className="info">{course.description}</p>
          <Link to={`/coursedetails/${course._id}`} style={{ textDecoration: 'none' }}>
            <button className="button">details</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default CourseCard;



