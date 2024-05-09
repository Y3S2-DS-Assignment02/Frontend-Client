import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getCourseByID, approveOrRejectCourse } from '../../services/CourseService';
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

    console.log("couse", courseData)

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
            className="custom-modal"
            overlayClassName="custom-overlay"
            shouldCloseOnOverlayClick={true}
        >
            {courseData && (
                <div className="modal-content">
                    
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
                                                        <div className="resource-container">
                                                            {resource.videoUrl && (
                                                                <video controls className="resource-video">
                                                                    <source src={resource.videoUrl} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            )}
                                                            {resource.imageUrl && (
                                                                <img className="resource-image" src={resource.imageUrl} alt="Resource" />
                                                            )}
                                                        </div>
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
                        <button onClick={handleApprove} className='approve-btn'>Approve</button>
                        <button onClick={handleReject} className='reject-btn'>Reject</button>
                    </div>
                    <button onClick={onRequestClose} className='close-btn'>Close</button>
                </div>
            )}
        </Modal>
    );
}

export default CourseModal;
