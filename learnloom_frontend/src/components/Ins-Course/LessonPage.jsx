import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./lessonPage.css";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
import QuizComponent from "./QuizComponent";
import { useNavigate } from "react-router-dom";

const LessonPage = () => {
  let URL = process.env.REACT_APP_AUTH_COURSE_API;
  let URL2 = process.env.REACT_APP_AUTH_ENROLL_API;

  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);
  const [enrolls, setEnrolls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessontitle, setLessonTitle] = useState("");
  const [lessondescription, setLessonDescription] = useState("");
  const [quiztitle, setQuizTitle] = useState("");
  const [resid, setResid] = useState("");
  const [lessonid, setLessonid] = useState("");
  const [quizid, setQuizid] = useState("");
  const [questionid, setQuestionid] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [lessonData, setLessonData] = useState("");
  const [restitle, setresTitle] = useState("");
  const [reslecNotes, setresLecNotes] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [showCreateLessonModal, setShowCreateLessonModal] = useState(false);
  const [showCreateResourceModal, setShowCreateResourceModal] = useState(false);
  const [showCreateQuizModal, setShowCreateQuizModal] = useState(false);
  const [showCreateQuestionModal, setShowCreateQuestionModal] = useState(false);

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${URL}/courses/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch course for user ${id}`);
        }
        const data = await response.json();
        setCourses(data.data);
        //console.log(data.data);
      } catch (error) {
        console.error("Error fetching course:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    async function fetchEnrolles() {
      try {
        const response = await fetch(`${URL2}/enrollments/course/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch enrolls for course ${id}`);
        }
        const data = await response.json();
        setEnrolls(data.length);
        //console.log(data);
      } catch (error) {
        console.error("Error fetching enrolles:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
    fetchEnrolles();
  }, [id, lessonData]);

  const handleSubmitlesson = async (event) => {
    event.preventDefault();
    let response = null;
    let type = "";
    try {
      if (isUpdate) {
        type = "Update";
        response = await fetch(`${URL}/lesson/${id}/${lessonid}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: lessontitle,
            description: lessondescription,
          }),
        });
      } else {
        type = "Create";
        response = await fetch(`${URL}/lesson`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: id,
            title: lessontitle,
            description: lessondescription,
          }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create course");
      }

      setMessage(data.message);
      setLessonData(data.data);
      setError("");
      setLessonTitle("");
      setLessonDescription("");
      setMessage("");
      setShowCreateLessonModal(false);
      setIsUpdate(false);
      setLessonid("");
      alert(`Lesson ${type}ed successfully`);
    } catch (error) {
      console.error("Error creating course:", error.message);
      setError(error.message || "Error creating course");
      setMessage("");
    }
  };

  const handleSubmitQuiz = async (event) => {
    event.preventDefault();
    let response = null;
    let type = "";

    try {
      if (isUpdate) {
        type = "Update";
        response = await fetch(`${URL}/quiz/${id}/${lessonid}/${quizid}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: quiztitle,
          }),
        });
      } else {
        type = "Create";
        response = await fetch(`${URL}/quiz`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: id,
            lessonId: lessonid,
            title: quiztitle,
          }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create quiz");
      }

      setMessage(data.message);
      setLessonData(data.data);
      setError("");
      setQuizTitle("");
      setMessage("");
      setIsUpdate(false);
      setLessonid("");
      setQuizid("");
      setShowCreateQuizModal(false);
      alert(`Quiz ${type}ed successfully`);
    } catch (error) {
      console.error("Error creating course:", error.message);
      setError(error.message || "Error creating course");
      setMessage("");
    }
  };

  const handleSubmitRes = async (event) => {
    event.preventDefault();
    let response = null;
    let type = "";
    let formData = new FormData();

    formData.append("courseId", id);
    formData.append("lessonId", lessonid);
    if (restitle) {
      formData.append("title", restitle);
    }
    if (reslecNotes) {
      formData.append("lecNotes", reslecNotes);
    }

    if (imageFile) {
      formData.append("imagefile", imageFile);
    }
    if (videoFile) {
      formData.append("videofile", videoFile);
    }

    try {
      if (isUpdate) {
        type = "Update";
        response = await fetch(`${URL}/resource/${id}/${lessonid}/${resid}`, {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        type = "Create";
        response = await fetch(`${URL}/resource`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create resourse");
      }

      setMessage(data.message);
      setLessonData(data.data);
      setError("");
      setresTitle("");
      setresLecNotes("");
      setImageFile(null);
      setVideoFile(null);
      setMessage("");
      setSelectedType("");
      setIsUpdate(false);
      setLessonid("");
      setResid("");
      setShowCreateResourceModal(false);

      alert(`Resourse ${type}ed successfully`);
    } catch (error) {
      console.error("Error creating resourse:", error.message);
      setError(error.message || "Error creating resourse");
      setMessage("");
    }
  };

  const handleCreateQuestion = async (event) => {
    event.preventDefault();
    let response = null;
    let type = "";

    try {
      if (isUpdate) {
        type = "Update";
        response = await fetch(
          `${URL}/quizQuestion/${id}/${lessonid}/${quizid}/${questionid}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              question: question,
              options: options,
              answer: answer,
            }),
          }
        );
      } else {
        type = "Create";
        response = await fetch(`${URL}/quizQuestion`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: id,
            lessonId: lessonid,
            quizId: quizid,
            question: question,
            options: options,
            answer: answer,
          }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create question");
      }

      setMessage(data.message);
      setLessonData(data.data);
      setQuestion("");
      setOptions(["", "", "", ""]);
      setAnswer("");
      setMessage("");
      setIsUpdate(false);
      setLessonid("");
      setQuizid("");
      setQuestionid("");
      setShowCreateQuestionModal(false);
      alert(`Question ${type}ed successfully`);
    } catch (error) {
      console.error("Error creating question:", error.message);
      setError(error.message || "Error creating question");
      setMessage("");
    }
  };

  const deleteCourseById = async (url, type) => {
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        //console.log("Course deleted successfully");
        setLessonData(response);
        alert(type + "deleted successfully ");
      } else {
        console.error("Failed to delete course:", response.data.message);
        alert("Failed to delete " + type);
      }
    } catch (error) {
      console.error("Error deleting course:", error.message);
      alert("Failed to delete " + type);
    }
  };

  const addQuiz = (lessonid) => {
    setLessonid(lessonid);
    setShowCreateQuizModal(true);
  };

  const addRes = (lessonid) => {
    setLessonid(lessonid);
    setShowCreateResourceModal(true);
  };

  const addQuestion = (lessonid, qid) => {
    setLessonid(lessonid);
    setQuizid(qid);
    setShowCreateQuestionModal(true);
  };

  const updateLesson = (lessonid, title, description) => {
    setIsUpdate(true);
    setLessonid(lessonid);
    setLessonTitle(title);
    setLessonDescription(description);
    setShowCreateLessonModal(true);
  };

  const updateRes = (lessonid, resourceId, title, lecnote) => {
    setIsUpdate(true);
    setLessonid(lessonid);
    setResid(resourceId);
    setresTitle(title);
    setresLecNotes(lecnote);
    setShowCreateResourceModal(true);
  };

  const updateQuiz = (lessonid, quizId, title) => {
    setIsUpdate(true);

    setLessonid(lessonid);
    setQuizid(quizId);

    setQuizTitle(title);

    setShowCreateQuizModal(true);
  };

  const updateQuestion = (
    lessonid,
    quizId,
    questionId,
    question,
    options,
    answer
  ) => {
    setIsUpdate(true);

    setLessonid(lessonid);
    setQuizid(quizId);
    setQuestionid(questionId);

    setQuestion(question);
    setOptions(options);
    setAnswer(answer);

    setShowCreateQuestionModal(true);
  };

  return (
    <div className="lesson-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ paddingLeft: "20px", width: "75%" }}>
          <button
            onClick={() => {
              navigate("/inscourse");
            }}
          >
            Back
          </button>
        </div>
        <div
          style={{
            width: "25%",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "10px",
          }}
        >
          {enrolls && <h3>Enrolled Student :  {enrolls} </h3>}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ paddingLeft: "20px", width: "80%" }}>
          {courses && (
            <>
              <h1>{courses.title}</h1>
              <p>{courses.description}</p>
            </>
          )}
        </div>

        {/* Button to add a new lesson */}
        <div
          style={{ width: "20%", display: "flex", justifyContent: "flex-end" }}
        >
          <button onClick={() => setShowCreateLessonModal(true)}>
            Add Lesson
          </button>
        </div>
      </div>
      {/* List of lessons */}
      {courses &&
        courses.lessons.map((lesson) => (
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
              <h2 style={{ paddingLeft: "20px", width: "75%" }}>
                {lesson.title}
              </h2>

              <div
                style={{
                  width: "25%",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <button onClick={() => addRes(lesson._id)}>Add Resource</button>
                <button onClick={() => addQuiz(lesson._id)}>
                  Add quiz
                </button>
                <div className="buttonbox">
                  <button
                    onClick={() => {
                      updateLesson(
                        lesson._id,
                        lesson.title,
                        lesson.description
                      );
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      deleteCourseById(
                        `${URL}/lesson/${id}/${lesson._id}`,
                        "Lesson"
                      );
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
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
                    <div className="buttonbox">
                      <button
                        onClick={() => {
                          updateRes(
                            lesson._id,
                            resource._id,
                            resource.title,
                            resource.lecNotes
                          );
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          deleteCourseById(
                            `${URL}/resource/${id}/${lesson._id}/${resource._id}`,
                            "Resource"
                          );
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
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
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <h3 style={{ paddingLeft: "20px", width: "90%" }}>
                  {lesson.title} Quiz Area
                </h3>

                <div
                  style={{
                    width: "10%",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <button onClick={() => addQuiz(lesson._id)}>Add quiz</button>
                </div>
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
                      <h3 style={{ paddingLeft: "10px", width: "85%" }}>
                        {quiz.title}
                      </h3>

                      <div
                        style={{
                          width: "15%",
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <button
                          onClick={() => addQuestion(lesson._id, quiz._id)}
                        >
                          Add question
                        </button>

                        <div className="buttonbox">
                          <button
                            onClick={() => {
                              updateQuiz(lesson._id, quiz._id, quiz.title);
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => {
                              deleteCourseById(
                                `${URL}/quiz/${id}/${lesson._id}/${quiz._id}`,
                                "Quiz"
                              );
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
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
                          <div className="buttonbox">
                            <button
                              onClick={() => {
                                updateQuestion(
                                  lesson._id,
                                  quiz._id,
                                  question._id,
                                  question.question,
                                  question.options,
                                  question.answer
                                );
                              }}
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => {
                                deleteCourseById(
                                  `${URL}/quizQuestion/${id}/${lesson._id}/${quiz._id}/${question._id}`,
                                  "Question"
                                );
                              }}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}

              {/* <QuizComponent lesson={lesson} id={id} /> */}
            </div>
          </div>
        ))}

      {/* Modals for creating new items */}
      {showCreateLessonModal && (
        <div className="modal">
          <div className="modal-content">
            {isUpdate ? <h2>Update Lesson</h2> : <h2>Create New Lesson</h2>}

            <form onSubmit={handleSubmitlesson}>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={lessontitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={lessondescription}
                  onChange={(e) => setLessonDescription(e.target.value)}
                />
              </div>
              {isUpdate ? (
                <button type="submit">Update Lesson</button>
              ) : (
                <button type="submit">Create Lesson</button>
              )}

              <button
                onClick={() => {
                  setShowCreateLessonModal(false);
                  setIsUpdate(false);
                }}
              >
                Cancel
              </button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>Error: {error}</p>}
          </div>
        </div>
      )}

      {showCreateResourceModal && (
        <div className="modal">
          <div className="modal-content">
            {isUpdate ? <h2>Update Resource</h2> : <h2>Create New Resource</h2>}
            {/* Dropdown menu to select resource type */}
            <select onChange={(e) => setSelectedType(e.target.value)}>
              <option value="">Select Resource Type</option>
              <option value="title">Title</option>
              <option value="lecNotes">Lecture Notes</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>

            {/* Input fields based on the selected resource type */}
            {selectedType === "title" && (
              <input
                type="text"
                placeholder="Enter Title"
                value={restitle}
                onChange={(e) => setresTitle(e.target.value)}
              />
            )}
            {selectedType === "lecNotes" && (
              <textarea
                placeholder="Enter Lecture Notes"
                value={reslecNotes}
                onChange={(e) => setresLecNotes(e.target.value)}
              />
            )}
            {selectedType === "image" && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            )}
            {selectedType === "video" && (
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
            )}

            {/* Button to create the resource */}

            {isUpdate ? (
              <button onClick={handleSubmitRes}>Update Resource</button>
            ) : (
              <button onClick={handleSubmitRes}>Create Resource</button>
            )}
            <button
              onClick={() => {
                setShowCreateResourceModal(false);
                setIsUpdate(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showCreateQuizModal && (
        <div className="modal">
          <div className="modal-content">
            {isUpdate ? <h2>Update Quiz</h2> : <h2>Create New Quiz</h2>}
            {/* (event) => handleSubmitQuiz(event, userResponses)} */}

            <form onSubmit={handleSubmitQuiz}>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={quiztitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                />
              </div>

              <button type="submit">
                {" "}
                {isUpdate ? "Upadte Quiz" : "Create Quiz"}
              </button>
              <button
                onClick={() => {
                  setShowCreateQuizModal(false);
                  setIsUpdate(false);
                }}
              >
                Cancel
              </button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>Error: {error}</p>}
          </div>
        </div>
      )}

      {showCreateQuestionModal && (
        <div className="modal">
          <div className="modal-content">
            {isUpdate ? <h2>Update Question</h2> : <h2>Create New Question</h2>}
            {/* Form to create a new question */}
            <input
              type="text"
              placeholder="Enter Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(e.target.value, index)}
              />
            ))}
            <select onChange={(e) => setAnswer(e.target.value)}>
              <option value="">Select Answer</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button onClick={handleCreateQuestion}>
              {isUpdate ? "Upadte Question" : "Create Question"}
            </button>
            <button
              onClick={() => {
                setShowCreateQuestionModal(false);
                setIsUpdate(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonPage;
