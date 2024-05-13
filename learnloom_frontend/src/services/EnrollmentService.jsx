import setupAxios from "./index";

const baseURL = 'http://localhost:3002/api/enroll'; // Base URL for enrollment API
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
