import axios from "axios";
import * as CONSTANT from "./api.constant";
let config = {
  headers: {
    "ngrok-skip-browser-warning": 69420,
  },
};
export const getStudent = async (payload) => {
  const {userId} = payload
  let url = `${CONSTANT.API_URL}/student/get-student`;
  if(userId) url += `?userId=${userId}`;
  const response = await axios
    .get(url, config);
  return response?.data;
};


export const getFaculty = async (payload) => {
  const {userId} = payload;
  let url = `${CONSTANT.API_URL}/faculty/get-faculty`;
  if(userId) url += `?userId=${userId}`;
  const response = await axios.get(url,config);
  return response?.data;
}