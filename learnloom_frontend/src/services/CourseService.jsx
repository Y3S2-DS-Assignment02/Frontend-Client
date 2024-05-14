// courseService.js
import setupAxios from "./index";
const url = process.env.REACT_APP_COURSEVIEW_BASE_API;
const api = setupAxios(url);
export async function fetchCourses() {
    try {
      const response = await api.get(url);
      const data = await response.data;
      //console.log(response);
      return data.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }
  