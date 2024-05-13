import React, { useState, useEffect } from 'react';
import { fetchEnrolledCourses } from '../services/EnrollmentService'; 
import { fetchCourseById } from '../services/fetchCourseByIdService'; // Import fetchCourseById function
import '../utils/styles/CoursePage.css';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const [courseDetails, setCourseDetails] = useState([]); // State to store course details
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchEnrolledCourseData = async () => {
      try {
        const enrolledCourses = await fetchEnrolledCourses(userId);
        //console.log('Enrolled courses ids:', enrolledCourses._id);
        
        const courseDetailsPromise = enrolledCourses.map(async enrolledCourse => {
          console.log('Enrolled courses ids:', enrolledCourse._id);
          const courseId = enrolledCourse.courses[0].courseId; // Access courseId from courses array
          const progress = enrolledCourse.courses[0].progress; // Access progress from courses array
          const courseDetail = await fetchCourseById(courseId);
          return { ...courseDetail, progress }; // Include progress in course details
        });

        const details = await Promise.all(courseDetailsPromise);
        console.log('Course details with progress:', details);
        setCourseDetails(details);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    fetchEnrolledCourseData();
  }, [userId]);

  return (
    <div className='coursepage'>
      <h1 className="page-title">My Courses</h1>
      <div className="Mycourse-container">
        {courseDetails.map(course => (
            <div className="course-card-container"> 
          <div className="course-card" key={course._id}>
            <div>
              <h2>{course.title}</h2> {/* Displaying course title */}
              <p>Description: {course.description}</p> {/* Displaying course description */}
              <p>Instructor: {course.instructor}</p> {/* Displaying course instructor */}
              <p>Progress: {course.progress}%</p> {/* Displaying course progress */}
             
              {/* <Link to={`/courses/${course._id}`}>
                <button>View Lessons</button>
              </Link> */}
              <Link to={`/Lessonscheck/${course._id}`}>
                <button> Lessons</button>
              </Link>
          
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;