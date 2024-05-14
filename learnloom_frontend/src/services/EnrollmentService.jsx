import setupAxios from "./index";

const baseURL = process.env.REACT_APP_LEARNER_BASE_API; // Base URL for enrollment API
const api = setupAxios(baseURL);

export async function fetchEnrolledCourses(studentId) {
  try {
    const response = await api.get('/enrollments');
    const enrolledCourses = response.data.filter(enrollment => enrollment.studentID === studentId);
    return enrolledCourses;
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error;
  }
}

export async function deleteEnrolledCourseById(courseId) {
  try {
    const response = await fetch(`${baseURL}/delete/${courseId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete course');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}

// Function to handle enrollment
export async function enrollCourse(userId, [id]) {
  try {
    const response = await api.post('/enroll', {
       studentID: userId,
      courses: [{ courseId: id }],
    });
    console.log(response);
    if (response.status !== 200) {
      throw new Error('Failed to enroll');
      
    }

    return response.data; // Return data if needed
  } catch (error) {
    throw error;
  }
}

// Function to update progress
export async function updateProgress(enrolledCourseId, userId, courseId, progress) {
  try {
    const response = await api.patch(`/update/${enrolledCourseId}`, {
      studentID: userId,
      courses: [
        {
          courseId: courseId,
          progress: progress,
        },
      ],
    });

    if (response.status === 200) {
      console.log("Progress updated successfully.");
    } else {
      throw new Error("Failed to update progress.");
    }
  } catch (error) {
    console.error("Error updating progress:", error);
    throw error;
  }
}
