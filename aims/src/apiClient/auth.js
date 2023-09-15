import axios from "axios";

export const signUP =async (payload)=>{
    console.log('signup')
    await axios
      .post(
        "https://8e99-220-158-168-162.ngrok-free.app//api/user/signup",
        payload
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}

export const logIn = async (payload) => {
  axios
    .post("localhost:4000/user/login", payload)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};