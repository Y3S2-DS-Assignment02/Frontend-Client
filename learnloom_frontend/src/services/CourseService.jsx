import setupAxios from "./index";
let url = process.env.REACT_APP_COURSES_BASE_API;

//Create the axios instance for API calls
const api = setupAxios(url);


export const getAllCourses = async()=>{
    try{

        const response = await api.get(`${url}/courses`);
        
        return response.data.data;

    }catch(error){
        console.error(error);
        throw error;

    }
}

export const getCourseByID = async (courseId) => {
    try {
      const response = await api.get(`${url}/courses/${courseId}`);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const approveOrRejectCourse = async (courseId, isApprovedvalue, isRejectedvalue) => {
    try {
        console.log("app",isApprovedvalue)
        console.log("reg",isRejectedvalue)
      const response = await api.patch(`${url}/courses/approveOrRejecte/${courseId}`, {
        isApproved: isApprovedvalue,
        isRejected: isRejectedvalue
      });
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  