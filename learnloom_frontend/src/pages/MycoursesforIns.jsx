import React, { useState, useEffect } from "react";
import CourseCard from "../components/Ins-Course/CourseCard";
import { FaPlus } from "react-icons/fa"; // Import the plus icon
import "../components/Ins-Course/courseCard.css";

const MycoursesforIns = () => {
  let URL = process.env.REACT_APP_AUTH_COURSE_API;

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreateLessonModal, setShowCreateLessonModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  //console.log(token)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(`${URL}/courses/instructor/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch courses for user ${userId}`);
        }
        const data = await response.json();
        setCourses(data.data.reverse());
        //console.log(data.data);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [userId, data]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${URL}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          instructor: userId,
          price,
          duration,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create course");
      }

      setMessage(data.message);
      setData(data.data);
      setError("");
      setTitle("");
      setDescription("");
      setPrice("");
      setDuration("");
      setMessage("");
      setShowCreateLessonModal(false);
    } catch (error) {
      console.error("Error creating course:", error.message);
      setError(error.message || "Error creating course");
      setMessage("");
    }
  };

  const setLessonData = (data) => {
    setData(data);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "80%",
            display: "flex",
            justifyContent: "flex-end",
            //backgroundColor: "bisque",
          }}
        >
          <button
            className="add-course-button"
            onClick={() => {
              setShowCreateLessonModal(true);
            }}
          >
            <FaPlus /> Add New Course
          </button>
        </div>
        {courses &&
          courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course._id}
              title={course.title}
              description={course.description}
              price={course.price}
              duration={course.duration}
              setLessonData={setLessonData}
            />
          ))}
      </div>

      {showCreateLessonModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Course</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="duration">Duration:</label>
                <input
                  type="text"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <button type="submit">Create Course</button>
              <button onClick={() => setShowCreateLessonModal(false)}>
                Cancel
              </button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>Error: {error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default MycoursesforIns;
