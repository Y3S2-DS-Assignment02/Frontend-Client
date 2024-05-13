// courseService.js
import setupAxios from "./index";

const baseUrl = 'http://localhost:4000/api/course/courses';

// Set up axios instance for course service
const api = setupAxios(baseUrl);

// Function to fetch course data by id
export async function fetchCourseById(courseId) {
  try {
    const response = await api.get(`/${courseId}`);
    const responseData = await response.data;
    return responseData.data; // Return the course data
  } catch (error) {
    console.error('Error fetching course data:', error);
    throw error;
  }
}
