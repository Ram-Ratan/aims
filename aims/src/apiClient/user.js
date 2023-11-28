import axios from "axios";
import * as CONSTANT from "./api.constant";
const authToken = JSON.parse(localStorage.getItem("authToken"))
let config = {
  headers: {
    "ngrok-skip-browser-warning": 69420,
    Authorization: `Bearer ${authToken}`,
  },
};

export const getUser = async () => {
  const url = `${CONSTANT.API_URL}/user/get-user`;
  const response = axios.get(url, config);
  return response;
};
