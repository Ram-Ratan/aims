import axios from "axios";
import * as CONSTANT from "./api.constant";
const authToken = JSON.parse(localStorage.getItem("authToken"));
let config = {
  headers: {
    "ngrok-skip-browser-warning": 69420,
    Authorization: `Bearer ${authToken}`,
  },
};

export const getAllFaculty = async () => {
  const url = `${CONSTANT.API_URL}/faculty/get-all-faculty`;
  const response = axios.get(url, config);
  return response;
};

export const courseAssignment = async (payload) => {
  const url = `${CONSTANT.API_URL}/course-assigned/course-assignment`;
  const response = axios.post(url,payload, config);
  return response;
};
