import React,{useEffect,useState} from 'react';
import Modal from 'react-modal';
import { getCourseByID,approveOrRejectCourse  } from '../../services/CourseService';
import '../../utils/styles/CourseModal.css';

const CourseModal = ({ isOpen, onRequestClose, course }) => {
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
          try {
            const fetchedCourse = await getCourseByID(course);
            setCourseData(fetchedCourse);
          } catch (error) {
            console.error('Error fetching course:', error);
          }
        };
    
        if (isOpen && course) {
          fetchCourse();
        }
      }, [isOpen, course]);

      console.log("couse",courseData)

    const handleApprove = async () => {
    try {
      await approveOrRejectCourse(course, true, false); 
      onRequestClose();
    } catch (error) {
      console.error('Error approving course:', error);
    }
  };

  const handleReject = async () => {
    try {
      await approveOrRejectCourse(course, false, true); 
      onRequestClose();
    } catch (error) {
      console.error('Error rejecting course:', error);
    }
  };


      return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          contentLabel="Course Details"
          style={{
            overlay: {
              overflowY: 'auto',
            },
            content: {
              maxHeight: '80%', 
              overflowY: 'scroll', 
            },
          }}
        >
          {courseData && (
            <div>
                <p>{courseData._id}</p>
              <h1>{courseData.title}</h1>
              <p>Description: {courseData.description}</p>
              <p>Instructor: {courseData.instructor}</p>
              <p>Price: {courseData.price}</p>
              <p>Duration: {courseData.duration}</p>
              {courseData.lessons && (
                <div>
                  <p>Lessons:</p>
                  <ul>
                    {courseData.lessons.map((lesson, index) => (
                      <li key={index}>
                        <h3>{lesson.title}</h3>
                        <p>Description: {lesson.description}</p>
                        {lesson.resources && (
                          <ul>
                            {lesson.resources.map((resource, resIndex) => (
                              <li key={resIndex}>
                                <h4>{resource.title}</h4>
                                <p>Lecture Notes: {resource.lecNotes}</p>
                                {resource.videoUrl && (
  <video controls className="resource-video">
    <source src={resource.videoUrl} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
)}
                                {resource.imageUrl && <img className='img' src={resource.imageUrl} alt="Resource" />}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
            <button onClick={handleApprove}>Approve</button>
            <button onClick={handleReject}>Reject</button>
          </div>
              <button onClick={onRequestClose}>Close</button>
            </div>
          )}
        </Modal>
      );
}

export default CourseModal;




