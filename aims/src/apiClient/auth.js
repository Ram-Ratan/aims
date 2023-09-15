import axios from "axios";

export const signUP =async (payload)=>{
    console.log('signup')
    const response = await axios
      .post(
        "https:localhost:4000/api/user/signup",
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