import axios from "axios";
import * as CONSTANT from "./api.constant";
// const authToken = JSON.parse(localStorage.getItem("authToken"))
// let config = {
//   headers: {
//     "ngrok-skip-browser-warning": 69420,
//     Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
//   },
// };

export const getUser = async () => {
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
      Authorization: `Bearer ${authToken}`,
    },
  };
  const url = `${CONSTANT.API_URL}/user/get-user`;
  const response = await axios.get(url, config);
  return response.data;
};
