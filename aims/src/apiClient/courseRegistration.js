import axios from "axios";
import * as CONSTANT from "./api.constant";

export const getCourses = async (payload) => {
  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
    },
  };
  const {semesterId, branchId} = payload
  let url = `${CONSTANT.API_URL}/course/get-all-courses`;
  if(semesterId) url += `?semesterId=${semesterId}`;
  if(branchId) semesterId
    ? (url += `&branchId=${branchId}`)
    : (url += `?branchId=${branchId}`);
  const response = await axios.get(url, config);
  return response?.data;
};

export const getBranch = async () => {
  const url = `${CONSTANT.API_URL}/branch/get-all-branch`;
  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
    },
  };
  const response = await axios.get(url, config);
  // console.log(response);
  return response?.data;
};

export const getSem = async () => {
  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
    },
  };
  const url = `${CONSTANT.API_URL}/semester/get-all-semester`;
  const response = await axios.get(url, config);
  //console.log(response?.data);
  return response?.data;
};

export const courseRegistration = async (payload) => {
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
        Authorization: `Bearer ${authToken}`,
    },
  };
  const url = `${CONSTANT.API_URL}/course-registration/register`;
  const response = await axios.post(url,payload, config);
  return response?.data;
};

export const getCourseRegisteredById = async (payload) => {
  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
    },
  };
  const {userId} = payload;
  let url = `${CONSTANT.API_URL}/course-registration/course-registered-by-id`;
  if(userId) url += `?id=${userId}`;
  const response = await axios.get(url, config);
  //console.log(response?.data);
  return response?.data;
};


