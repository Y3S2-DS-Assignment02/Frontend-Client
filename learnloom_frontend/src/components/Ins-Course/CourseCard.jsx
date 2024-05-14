import React, { useState, useEffect } from "react";
import "./courseCard.css";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CourseCard({
  id,
  title,
  description,
  price,
  duration,
  setLessonData,
}) {
  const navigate = useNavigate();
  const [showCreateLessonModal, setShowCreateLessonModal] = useState(false);
  const [ctitle, setCTitle] = useState("");
  const [cdescription, setCDescription] = useState("");
  const [cprice, setCPrice] = useState("");
  const [cduration, setCDuration] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const deleteCourseById = async (url, type) => {
    try {
      // Make a DELETE request to your backend endpoint
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if the deletion was successful
      if (response.status === 200) {
        //console.log("Course deleted successfully");
        setLessonData(response);
        alert(type + "deleted successfully ");
        // Optionally, show a success message or handle it appropriately
      } else {
        console.error("Failed to delete course:", response.data.message);
        alert("Failed to delete " + type);
        // Optionally, show an error message or handle it appropriately
      }
    } catch (error) {
      console.error("Error deleting course:", error.message);
      alert("Failed to delete " + type);
      // Optionally, show an error message or handle it appropriately
    }
  };

  const updateCourse = () => {
    setCTitle(title);
    setCDescription(description);
    setCPrice(price);
    setCDuration(duration);
    setShowCreateLessonModal(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/api/course/courses/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: ctitle,
            description: cdescription,
            price: cprice,
            duration: cduration,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create course");
      }

      setMessage(data.message);
      setLessonData(data.data);
      setError("");
      setCTitle("");
      setCDescription("");
      setCPrice("");
      setCDuration("");
      setMessage("");
      setShowCreateLessonModal(false);
    } catch (error) {
      console.error("Error creating course:", error.message);
      setError(error.message || "Error creating course");
      setMessage("");
    }
  };

  return (
    <>
      <div className="course-cardd">
        <div className="card-title-box">
          <div>
            <h2 className="course-title">{title}</h2>
            <p className="course-description">{description}</p>
          </div>
          <div className="course-actions">
            <button
              onClick={() => {
                navigate(`/inslesson/${id}`);
              }}
            >
              <FaEye />
            </button>
            <button
              onClick={() => {
                updateCourse();
              }}
            >
              <FaEdit />{" "}
            </button>
            <button
              onClick={() => {
                deleteCourseById(
                  `http://localhost:4000/api/course/courses/${id}`,
                  "Course"
                );
              }}
            >
              <FaTrash />{" "}
            </button>
          </div>
        </div>
        <div className="course-detailss">
          <p className="course-price">Price: ${price}</p>
          <p className="course-duration">Duration: {duration} days</p>
        </div>
      </div>

      {showCreateLessonModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={ctitle}
                  onChange={(e) => setCTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={cdescription}
                  onChange={(e) => setCDescription(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  value={cprice}
                  onChange={(e) => setCPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="duration">Duration:</label>
                <input
                  type="text"
                  id="duration"
                  value={cduration}
                  onChange={(e) => setCDuration(e.target.value)}
                />
              </div>
              <button type="submit">Update Course</button>
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
}

export default CourseCard;
