import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseData } from "../services/LessonService";
import "../utils/styles/Lessons.css";
import QuizComponent from "../components/Course/QuizComponent";

const Lessons = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentResourceIndex, setCurrentResourceIndex] = useState(0);

  // Load current lesson and resource indices from localStorage on component mount
  useEffect(() => {
    const storedLessonIndex = localStorage.getItem("currentLessonIndex");
    const storedResourceIndex = localStorage.getItem("currentResourceIndex");
    if (storedLessonIndex && storedResourceIndex) {
      setCurrentLessonIndex(parseInt(storedLessonIndex, 10));
      setCurrentResourceIndex(parseInt(storedResourceIndex, 10));
    }
  }, []);

  // Save current lesson and resource indices to localStorage on change
  useEffect(() => {
    localStorage.setItem("currentLessonIndex", currentLessonIndex);
    localStorage.setItem("currentResourceIndex", currentResourceIndex);
  }, [currentLessonIndex, currentResourceIndex]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await fetchCourseData(id);
        setCourse(courseData);
      } catch (error) {
        console.log("Error fetching course lessons:", error);
      }
    };

    fetchCourse();
  }, [id]);



  const goToNextResource = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setCurrentResourceIndex(0); // Reset resource index for the next lesson
    }
  };

  const goToPrevResource = () => {
    if (currentResourceIndex > 0) {
      setCurrentResourceIndex(currentResourceIndex - 1);
    } else if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      // Set the resource index to the last resource of the previous lesson
      setCurrentResourceIndex(
        course.lessons[currentLessonIndex - 1].resources.length - 1
      );
    }
  };

  // Calculate progress

  if (!course) {
    return <div>Loading...</div>;
  }

  if (!course || !course.lessons || course.lessons.length === 0) {
    return <div>There are no lessons available for this course.</div>;
  }
  const lesson = course.lessons[currentLessonIndex];

  if (!lesson || !lesson.resources || lesson.resources.length === 0) {
    return <div>There are no resources available for this lesson.</div>;
  }
  const resource = lesson.resources[currentResourceIndex];

  const handleAnswer = (lessonIndex, quizIndex, questionIndex, selectedOption) => {
    const updatedCourse = { ...course };
    updatedCourse.lessons[lessonIndex].quizzes[quizIndex].questions[questionIndex].userAnswer = selectedOption;
    setCourse(updatedCourse);
  };

  // Calculate progress
  const totalLessons = course.lessons.length;
  const currentProgress = ((currentLessonIndex + 1) / totalLessons) * 100;
  const totalResources = lesson.resources.length;

  return (
    <div className="lesson-container">
      <h2 className="lesson-title">{course.title} Lessons</h2>
      <div className="progress-bar">
        Progress: {currentProgress.toFixed(2)}%
        <div
          className="progress"
          style={{ width: `${currentProgress}%` }}
        ></div>
      </div>
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
                      <h3 style={{ paddingLeft: "10px" }}>{resource.title}</h3>
                    </div>
                  )}
                  {resource.lecNotes && (
                    <div style={{}}>
                      <p style={{ paddingLeft: "10px" }}>{resource.lecNotes}</p>
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
        <button onClick={goToPrevResource} disabled={currentLessonIndex === 0 && currentResourceIndex === 0}>
          Prev Resource
        </button>
        <button onClick={goToNextResource} disabled={currentLessonIndex === course?.lessons?.length - 1}>
          Next Lesson
        </button>
      </div>
    </div>
  );
};

export default Lessons;
