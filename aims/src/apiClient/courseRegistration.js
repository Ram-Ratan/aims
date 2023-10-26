import axios from "axios";

export const getCourses =async (payload)=>{
    const response = await axios
      .get(
        "https://7aef-220-158-168-162.ngrok-free.app/api/course/get-courses-by-sem?semId=65391093c231e3a08249f46b"
      );
      return response?.data;   
}


export const getBranch = async () => {
    const response = await axios.get("https://7aef-220-158-168-162.ngrok-free.app/api/utils/get-all-branchs");
    // console.log(response);
    return response?.data;
}

export const getSem = async () => {
    const response = await axios.get("https://7aef-220-158-168-162.ngrok-free.app/api/utils/get-all-semesters");
    console.log(response?.data);
    return response?.data;
}