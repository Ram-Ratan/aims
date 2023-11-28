import axios from "axios";
import * as CONSTANT from "./api.constant";
const authToken = JSON.parse(localStorage.getItem("authToken"));

let config = {
  headers: {
    "ngrok-skip-browser-warning": 69420,
    Authorization: `Bearer ${authToken}`,
  },
};
export const getStudentByCourse = async (payload) => {
  const { courseId } = payload;
  let url = `${CONSTANT.API_URL}/course-registration/get-student-by-course?courseId=${courseId}`;
  const response = await axios.get(url, config);
  return response?.data;
};

export const markAttendance = async (payload) => {
  let url = `${CONSTANT.API_URL}/attendance/mark-attendance`;
  console.log(payload);
  const response = await axios.post(url,payload,config);
  return response?.data;
};

export const updateAttendance = async (payload) => {
  let url = `${CONSTANT.API_URL}/attendance/update-attendance`;
  const response = await axios.post(url, payload, config);
  return response?.data;
};


export const attendanceByCourseAndDate = async (payload) => {
  let url = `${CONSTANT.API_URL}/attendance/attendance-by-course-date-id`;
  const response = await axios.post(url,payload, config);
  return response?.data;
};


export const viewAttendanceByCourseAndDate = async (payload) => {
  let url = `${CONSTANT.API_URL}/attendance/attendance-by-course-and-date`;
  const response = await axios.post(url, payload, config);
  return response?.data;
};

export const getCourseAssignedById = async (payload) => {
  let url = `${CONSTANT.API_URL}/course-assigned/course-assigned-by-id`;
  const response = await axios.get(url, config);
  return response?.data;
};
