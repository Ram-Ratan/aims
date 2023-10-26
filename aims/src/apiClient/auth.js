import axios from "axios";

export const signUP =async (payload)=>{
    console.log('signup')
    const response = await axios
      .post(
        "https://7aef-220-158-168-162.ngrok-free.app/api/user/signup",
        payload
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
  const response = axios
    .post("localhost:4000/api/user/login", payload)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    return response;
};