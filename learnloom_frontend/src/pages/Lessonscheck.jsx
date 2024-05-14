import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchEnrolledCourses,
  deleteEnrolledCourseById,
  updateProgress
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
    if (currentLessonIndex < courseDetails.lessons.length - 1) {
      // If there are more lessons, go to the next lesson
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  
    // Calculate progress
    const totalLessons = courseDetails.lessons.length;
    const progress = ((currentLessonIndex + 1) / totalLessons) * 100;
  
    // Find the enrolledCourseId associated with the current courseId
    const enrolledCourse = enrolledCourses.find(
      (enrollment) => enrollment.courses[0].courseId === id
    );
  
    if (enrolledCourse) {
      const enrolledCourseId = enrolledCourse._id;
      // Assuming userId and id are accessible in this component
      const userId = localStorage.getItem("userId");
      const courseId = id;
      // Call updateProgress with the required parameters
      updateProgress(enrolledCourseId, userId, courseId, progress.toFixed(2))
        .then(() => {
          console.log("Progress updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating progress:", error);
        });
    }
  };
  
  const goToPrevResource = () => {
    if (currentLessonIndex > 0) {
      // If there are previous lessons, go to the previous lesson
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };
  

  const handleFinish = async () => {
    try {
      const enrolledCourseId = enrolledCourses.find(
        (enrollment) => enrollment.courses[0].courseId === id
      )._id;
      
      // Update progress to 100 when finishing the course
      await updateProgress(enrolledCourseId, userId, id, 100);
      navigate('/MyCourses');
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  }

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
      <div>
  <div style={{ marginBottom: "10px",width:"25%", border: "1px solid black" ,marginTop: "10px"}}>
    Current Progress: {currentProgress.toFixed(2)}%
    <div
      style={{
        width: `${currentProgress}%`,
        height: "20px",
        backgroundColor: "blue",
        marginTop: "5px",
        border: "1px solid black" 
      }}
    ></div>
  </div>
  <div style={{ marginBottom: "10px", width:"25%", border: "1px solid black"  }}>
    Max Progress:{" "}
    {courseDetails.progress < currentProgress
      ? currentProgress.toFixed(2)
      : courseDetails.progress}
    %
    <div
      style={{
        width: `${courseDetails.progress}%`,
        height: "20px",
        backgroundColor: "green",
        marginTop: "5px",
        border: "1px solid black" 
      }}
    ></div>
  </div>
</div>
      <div style={{position: "relative"}}>
  <button style={{position: "absolute", top: "0", right: "0", backgroundColor:"red", color:"bl"}} onClick={handleDelete}>Unenroll</button>
      </div>
      <h1 className="page-title">Lessons</h1>
      <div className="course-container" >
        <div className="lesson-card" style={{width:"100%"}}>
          <div key={courseDetails._id}>
            <h2>{courseDetails.title}</h2>
           
            <h3>Lesson {currentLessonIndex + 1}:</h3>
         
            {lesson && (
              <div>
                <h4>{lesson.title}</h4>
                <p>{lesson.description}</p>

                <div className="resource-container" style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
               
              }}>
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
              
               {currentLessonIndex === courseDetails.lessons.length - 1 ? (
      <button onClick={handleFinish}>Finish</button>
    ) : (
      <button onClick={goToNextResource} disabled={ currentLessonIndex === courseDetails?.lessons?.length - 1}>
        Next Lesson
      </button>
    )}
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonsCheck;
