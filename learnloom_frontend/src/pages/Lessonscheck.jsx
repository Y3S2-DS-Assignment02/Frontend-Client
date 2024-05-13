import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchEnrolledCourses,
  deleteEnrolledCourseById,
} from "../services/EnrollmentService";
import { fetchCourseById } from "../services/fetchCourseByIdService";
// import "../utils/styles/CoursePage.css";
import QuizComponent from "../components/Course/QuizComponent";

const LessonsCheck = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentResourceIndex, setCurrentResourceIndex] = useState(0);
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourseData = async () => {
      try {
        const courses = await fetchEnrolledCourses(userId);
        setEnrolledCourses(courses);

        const details = await Promise.all(
          courses.map(async (enrolledCourse) => {
            const courseId = enrolledCourse.courses[0].courseId;
            const courseDetail = await fetchCourseById(courseId);
            const progress = enrolledCourse.courses[0].progress;
            return { ...courseDetail, progress };
          })
        );

        const matchingCourse = details.find((course) => course._id === id);
        setCourseDetails(matchingCourse);
        console.log(matchingCourse);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    fetchEnrolledCourseData();
  }, [userId, id]);

  const updateProgress = async (progress) => {
    try {
      const enrolledCourseId = enrolledCourses.find(
        (enrollment) => enrollment.courses[0].courseId === id
      )._id;
      const response = await fetch(
        `http://localhost:3002/api/enroll/update/${enrolledCourseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentID: userId,
            courses: [
              {
                courseId: id,
                progress: progress,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        console.log("Progress updated successfully.");
      } else {
        console.error("Failed to update progress.");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };


  const handleDelete = async () => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete this enrolled course?"
      );
      if (confirmation) {
        const enrolledCourseId = enrolledCourses.find(
          (enrollment) => enrollment.courses[0].courseId === id
        )._id;
        await deleteEnrolledCourseById(enrolledCourseId);
        // After deletion, redirect the user My course page or perform any other action
        navigate(`/MyCourses`);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const goToNextResource = () => {
    if (
      courseDetails &&
      courseDetails.lessons[currentLessonIndex] &&
      currentResourceIndex <
        courseDetails.lessons[currentLessonIndex].resources.length - 1
    ) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setCurrentResourceIndex(0); // Reset resource index for the next lesson
    }
    // Calculate progress
    const totalLessons = courseDetails.lessons.length;
    const totalResources =
      courseDetails.lessons[currentLessonIndex].resources.length;
    const progress = ((currentLessonIndex + 1) / totalLessons) * 100;
    if (currentProgress > courseDetails.progress) {
      updateProgress(currentProgress.toFixed(2));
    }
  };

  const goToPrevResource = () => {
    if (currentResourceIndex > 0) {
      setCurrentResourceIndex(currentResourceIndex - 1);
    } else if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setCurrentResourceIndex(
        courseDetails.lessons[currentLessonIndex - 1].resources.length - 1
      );
    }
  };

  if (!courseDetails) {
    return <div>Loading...</div>;
  }
  if (
    !courseDetails ||
    !courseDetails.lessons ||
    courseDetails.lessons.length === 0
  ) {
    return <div>There are no lessons available for this course.</div>;
  }

  const enrolledCourse = enrolledCourses.find(
    (enrollment) => enrollment.courses[0].courseId === id
  );
  const lesson = courseDetails.lessons[currentLessonIndex];
  const resource = lesson.resources[currentResourceIndex];

  const totalLessons = courseDetails.lessons.length;
  const currentProgress = ((currentLessonIndex + 1) / totalLessons) * 100;
  const totalResources = lesson.resources.length;

  return (
    <div className="coursepage">
      <div className="progress-bar">
        Current Progress: {currentProgress.toFixed(2)}%
        <div
          className="progress"
          style={{ width: `${currentProgress}%` }}
        ></div>
      </div>
      <div className="progress-bar">
        Max Progress:{" "}
        {courseDetails.progress < currentProgress
          ? currentProgress.toFixed(2)
          : courseDetails.progress}
        %
        <div
          className="progress"
          style={{ width: `${currentProgress}%` }}
        ></div>
      </div>
      <button onClick={handleDelete}>Unenroll</button>
      <h1 className="page-title">Course Details</h1>
      <div className="course-container">
        <div className="lesson-card">
          <div key={courseDetails._id}>
            <h2>{courseDetails.title}</h2>
            <p>Description: {courseDetails.description}</p>
            <p>Instructor: {courseDetails.instructor}</p>
            <p>Price: {courseDetails.price}</p>
            <p>Duration: {courseDetails.duration}</p>
            <p>Enrolled Course Record ID: {enrolledCourse._id}</p>
            <h3>Lesson {currentLessonIndex + 1}:</h3>
            <h3>Lesson {currentLessonIndex + 1}:</h3>
            {lesson && (
              <div>
                <h4>{lesson.title}</h4>
                <p>{lesson.description}</p>

                <div className="resource-container">
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
                      </div>
                    ))}
                </div>
                <div className="resource-container">
                  <QuizComponent lesson={lesson} id={id} />
                </div>
              </div>
            )}
            <div>
              <button
                onClick={goToPrevResource}
                disabled={
                  currentLessonIndex === 0 && currentResourceIndex === 0
                }
              >
                Prev Lesson
              </button>
              <button
                onClick={goToNextResource}
                disabled={
                  currentLessonIndex === courseDetails?.lessons?.length - 1
                }
              >
                Next Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsCheck;
