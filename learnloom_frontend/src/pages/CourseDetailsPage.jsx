import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseData } from '../services/LessonService';
import { fetchEnrolledCourses, enrollCourse } from '../services/EnrollmentService';
import { initiateCheckout } from '../services/Paymentservice';
import '../utils/styles/Coursedetails.css';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await fetchCourseData(id);
        setCourse(courseData);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    const fetchEnrollmentStatus = async () => {
      try {
        const enrolledCourses = await fetchEnrolledCourses(userId);
        const isEnrolledInCurrentCourse = enrolledCourses.some(enrollment => enrollment.courses.some(course => course.courseId === id));
        setIsEnrolled(isEnrolledInCurrentCourse);
      } catch (error) {
        console.error('Error fetching enrollment status:', error);
      }
    };

    fetchCourse();
    fetchEnrollmentStatus();
  }, [id, userId]);

const handleEnroll = async () => {
  try {
    // Initiate payment
    const paymentUrl = await initiateCheckout([{
      courseName: course.title,
      courseId: course._id,
      studentId: userId,
      courseFee: course.price
    }]);
    
    // Redirect to payment URL
    window.location = paymentUrl;
  } catch (error) {
    console.error('Error initiating payment:', error);
    alert('Failed to initiate payment');
  }
};

// Function to handle enrollment after successful payment
const handleSuccessfulPayment = async () => {
  try {
    // Enroll user after successful payment
    await enrollCourse(userId, [id]);
    
    alert('Enrolled successfully!');
    //navigate(`/Lessonscheck/${course._id}`);
  } catch (error) {
    console.error('Error enrolling:', error);
    alert('Failed to enroll');
  }
};

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-details">
      <h1>Course Details</h1>
      <h2>Title: {course.title}</h2>
      <p><strong>Description:</strong>{course.description}</p>
      <div style={{ backgroundColor: '#c7fec2', width: '7%', borderRadius: '10px', marginBottom: '10px', marginLeft: '10px', color:'#0e622e' }}>
    <h3>$: {course.price}</h3>
  </div>
  <div style={{ backgroundColor: 'red', width: '7%', borderRadius: '10px', marginLeft: '10px' }}>
    <h3>hrs: {course.duration}</h3>
  </div>

      <div>
        <h2>Lessons</h2>
        {course.lessons.map((lesson, index) => (
          <div key={index}>
            <h3>{lesson.title}</h3>
            <ul >
              {lesson.resources.map((resource, resIndex) => (
                <ul style={{ textAlign: 'left'}}>
                <li style={{ marginLeft: 0, paddingLeft: 0 }} key={resIndex}>
             
                  {resource.title}
                  
                  
                  </li>
                </ul>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {!isEnrolled && <button onClick={() => { handleEnroll().then(handleSuccessfulPayment); }}>Enroll</button>}
    </div>
  );
};

export default CourseDetailsPage;


