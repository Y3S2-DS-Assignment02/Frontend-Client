import React, { useState, useEffect } from 'react';
import { getAllCourses } from '../services/CourseService';
import CourseModal from '../components/Modal/CourseModal'; 

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); 

  useEffect(() => {
    // Fetch courses data when the component mounts
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        if (Array.isArray(data)) { 
          setCourses(data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  
  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId); 
    setModalIsOpen(true); 
  };

  return (
    <div>
      <h2>Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Instructor</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? ( 
            courses.map(course => (
              <tr key={course._id} onClick={() => handleCourseClick(course._id)} style={{ cursor: 'pointer' }}>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>{course.instructor}</td>
                <td>${course.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
     
      <CourseModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        course={selectedCourseId}
      />
    </div>
  );
}

export default CoursePage;
