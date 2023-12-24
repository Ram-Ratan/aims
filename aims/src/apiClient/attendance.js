import axios from "axios";
import * as CONSTANT from "./api.constant";


export const getStudentByCourse = async (payload) => {
const authToken = JSON.parse(localStorage.getItem("authToken"));

  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
      Authorization: `Bearer ${authToken}`,
    },
  };
  const { courseId } = payload;
  let url = `${CONSTANT.API_URL}/course-registration/get-student-by-course?courseId=${courseId}`;
  const response = await axios.get(url, config);
  return response?.data;
};

export const markAttendance = async (payload) => {
  const authToken = JSON.parse(localStorage.getItem("authToken"));

  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
      Authorization: `Bearer ${authToken}`,
    },
  };
  let url = `${CONSTANT.API_URL}/attendance/mark-attendance`;
  console.log(payload);
  const response = await axios.post(url,payload,config);
  return response?.data;
};

export const updateAttendance = async (payload) => {
  const authToken = JSON.parse(localStorage.getItem("authToken"));

  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
      Authorization: `Bearer ${authToken}`,
    },
  };
  let url = `${CONSTANT.API_URL}/attendance/update-attendance`;
  const response = await axios.post(url, payload, config);
  return response?.data;
};


export const attendanceByCourseAndDate = async (payload) => {
  const authToken = JSON.parse(localStorage.getItem("authToken"));

  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
      Authorization: `Bearer ${authToken}`,
    },
  };
  let url = `${CONSTANT.API_URL}/attendance/attendance-by-course-date-id`;
  const response = await axios.post(url,payload, config);
  return response?.data;
};


export const viewAttendanceByCourseAndDate = async (payload) => {
  const authToken = JSON.parse(localStorage.getItem("authToken"));

  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
      Authorization: `Bearer ${authToken}`,
    },
  };
  let url = `${CONSTANT.API_URL}/attendance/attendance-by-course-and-date`;
  const response = await axios.post(url, payload, config);
  return response?.data;
};

export const getCourseAssignedById = async (payload) => {
  const authToken = JSON.parse(localStorage.getItem("authToken"));

  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
      Authorization: `Bearer ${authToken}`,
    },
  };
  let url = `${CONSTANT.API_URL}/course-assigned/course-assigned-by-id`;
  const response = await axios.get(url, config);
  return response?.data;
};
