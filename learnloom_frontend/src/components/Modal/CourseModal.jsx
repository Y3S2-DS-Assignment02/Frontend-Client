import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  getCourseByID,
  approveOrRejectCourse,
} from "../../services/CourseService";
import "../../utils/styles/CourseModal.css";

const CourseModal = ({ isOpen, onRequestClose, course }) => {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const fetchedCourse = await getCourseByID(course);
        setCourseData(fetchedCourse);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    if (isOpen && course) {
      fetchCourse();
    }
  }, [isOpen, course]);

  console.log("couse", courseData);

  const handleApprove = async () => {
    try {
      await approveOrRejectCourse(course, true, false);
      onRequestClose();
    } catch (error) {
      console.error("Error approving course:", error);
    }
  };

  const handleReject = async () => {
    try {
      await approveOrRejectCourse(course, false, true);
      onRequestClose();
    } catch (error) {
      console.error("Error rejecting course:", error);
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
              {/* <ul>
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
                            </ul> */}

              {courseData &&
                courseData.lessons.map((lesson) => (
                  <div
                    key={lesson._id}
                    style={{
                      width: "100%",
                      border: "1px solid gray",
                      marginBottom: "10px",
                      padding: "5px",
                      borderRadius: "10px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <h2 style={{ paddingLeft: "20px", width: "100%" }}>
                        {lesson.title}
                      </h2>
                    </div>
                    <p style={{ paddingLeft: "20px" }}>{lesson.description}</p>
                    {/* Buttons to edit or delete the lesson */}

                    {/* List of resources */}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {lesson.resources &&
                        lesson.resources.map((resource) => (
                          <div
                            key={resource._id}
                            style={{
                              width: "80%",
                              border: "1px solid gray",
                              marginBottom: "10px",
                              padding: "5px",
                              borderRadius: "10px",
                            }}
                          >
                            {resource.title && (
                              <div style={{}}>
                                <h3 style={{ paddingLeft: "10px" }}>
                                  {resource.title}
                                </h3>
                              </div>
                            )}
                            {resource.lecNotes && (
                              <div style={{}}>
                                <p style={{ paddingLeft: "10px" }}>
                                  {resource.lecNotes}
                                </p>
                              </div>
                            )}
                            {resource.videoUrl && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <video
                                  style={{
                                    maxWidth: "50%",
                                    maxHeight: "500px",
                                    borderRadius: "10px",
                                  }}
                                  src={resource.videoUrl}
                                  controls
                                />
                              </div>
                            )}
                            {resource.imageUrl && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  style={{
                                    maxWidth: "50%",
                                    maxHeight: "500px",
                                    borderRadius: "10px",
                                  }}
                                  src={resource.imageUrl}
                                  alt="Resource"
                                />
                              </div>
                            )}
                            {/* Buttons to edit or delete the resource */}
                          </div>
                        ))}
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <h3 style={{ paddingLeft: "20px", width: "100%" }}>
                          {lesson.title} Quiz Area
                        </h3>
                      </div>

                      {/* List of quizzes */}
                      {lesson.quizzes &&
                        lesson.quizzes.map((quiz) => (
                          <div
                            key={quiz._id}
                            style={{
                              width: "90%",
                              border: "1px solid green",
                              marginBottom: "10px",
                              padding: "5px",
                              borderRadius: "10px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <h3
                                style={{ paddingLeft: "10px", width: "100%" }}
                              >
                                {quiz.title}
                              </h3>
                            </div>

                            {/* List of questions */}
                            {quiz.questions &&
                              quiz.questions.map((question) => (
                                <div
                                  key={question._id}
                                  style={{
                                    width: "90%",
                                    border: "1px solid gray",
                                    marginBottom: "10px",
                                    padding: "5px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  {/* Display the question and options */}
                                  <p style={{ paddingLeft: "20px" }}>
                                    {question.question}
                                  </p>
                                  <ul
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-evenly",
                                    }}
                                  >
                                    {question.options.map((option, index) => (
                                      <li key={index}>{option}</li>
                                    ))}
                                  </ul>
                                  {/* Buttons to edit or delete the question */}
                                </div>
                              ))}
                          </div>
                        ))}

                      {/* <QuizComponent lesson={lesson} id={id} /> */}
                    </div>
                  </div>
                ))}
            </div>
          )}
          <div>
            <button onClick={handleApprove} className="approve-btn">
              Approve
            </button>
            <button onClick={handleReject} className="reject-btn">
              Reject
            </button>
          </div>
          <button onClick={onRequestClose} className="close-btn">
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};

export default CourseModal;
