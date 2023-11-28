import axios from "axios";
import * as CONSTANT from "./api.constant";
const authToken = JSON.parse(localStorage.getItem("authToken"));



export const getExam = async () => {
    let config = {
      headers: {
        "ngrok-skip-browser-warning": 69420,
      },
    };
    let url = `${CONSTANT.API_URL}/exam/get-exam`
    const response = await axios.get(url,config);
    console.log(response);
    return response;
}

export const submitMarks = async (payload) => {
    let config = {
      headers: {
        "ngrok-skip-browser-warning": 69420,
        Authorization: `Bearer ${authToken}`,
      },
    };
    const url = `${CONSTANT.API_URL}/exam/add-exam-entries`
    const response = await axios.post(url,payload,config);
    console.log('happy diwali',response);
    //console.log(response);
    return response;
}


export const updateMarks = async (payload) => {
  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
      Authorization: `Bearer ${authToken}`,
    },
  };
  const url = `${CONSTANT.API_URL}/exam/update-exam-entries`;
  const response = await axios.post(url, payload, config);
  return response;
};

export const getMarks = async (payload) => {
  const {examId} = payload;
  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
      Authorization: `Bearer ${authToken}`,
    },
  };
  const url = `${CONSTANT.API_URL}/exam/get-exam-entries-by-exam-student/?examId=${examId}`
  const response = await axios.get(url,config);
  return response;
}

export const getMarksByExamCourse = async (payload) => {
  const { examId, courseId } = payload;
  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
      Authorization: `Bearer ${authToken}`,
    },
  };
  const url = `${CONSTANT.API_URL}/exam/get-exam-entries-by-course-exam/?examId=${examId}&courseId=${courseId}`;
  const response = await axios.get(url, config);
  return response;
};