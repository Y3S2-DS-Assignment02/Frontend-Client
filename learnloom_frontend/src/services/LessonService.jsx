
// lessonService.js
import setupAxios from "./index";

const baseUrl = 'http://localhost:4000/api/course/courses';

// Set up axios instance for lesson service
const api = setupAxios(baseUrl);

// Function to fetch course data by id
export async function fetchCourseData(id) {
  try {
    const response = await api.get(`/${id}`);
    const data = await response.data;
    return data.data;
  } catch (error) {
    console.error('Error fetching course lessons:', error);
    throw error;
  }
}
