import React, { useState, useEffect } from 'react';
import CourseCard from '../components/Course/CourseCard';
import { fetchCourses } from '../services/CourseService';
import '../utils/styles/CoursePage.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const coursesData = await fetchCourses();
        setCourses(coursesData);
      } catch (error) {
        console.log('Error fetching courses:', error);
      }
    };

    fetchCourseData();
  }, []);

  return (
    <div className='coursepage'>
      <h1 className="page-title">Courses</h1>
      <div className="course-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {courses.map(course => (
          <div key={course._id} style={{ flex: '0 0 25%', margin: '5px' }}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
