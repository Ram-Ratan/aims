import axios from "axios";
import * as CONSTANT from "./api.constant";

export const getCourses = async (payload) => {
  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
    },
  };
  const url = `${CONSTANT.API_URL}/api/course/get-courses-by-sem?semId=${payload?.semId}`;
  const response = await axios.get(url, config);
  return response?.data;
};

export const getBranch = async () => {
  const url = `${CONSTANT.API_URL}/api/utils/get-all-branchs`;
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
  const url = `${CONSTANT.API_URL}/api/utils/get-all-semesters`;
  const response = await axios.get(url, config);
  console.log(response?.data);
  return response?.data;
};
