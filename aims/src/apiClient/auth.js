import axios from "axios";
import * as CONSTANT from "./api.constant";
let config = {
  headers: {
    "ngrok-skip-browser-warning": 69420,
  },
};
export const signUP =async (payload)=>{
  const url = `${CONSTANT.API_URL}/api/user/signup`;
    const response = await axios
      .post(
        url,
        payload,config
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      return response;
}

export const logIn = async (payload) => {
  const url = `${CONSTANT.API_URL}/api/user/login`;
  const response = axios
    .post(url, payload,config)
    .then((response) => {
      localStorage.setItem("user",JSON.stringify(response?.data));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    return response;
};