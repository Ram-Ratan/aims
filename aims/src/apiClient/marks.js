import axios from "axios";
import * as CONSTANT from "./api.constant";


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
        },
    };
    const url = `${CONSTANT.API_URL}/exam/add-exam-entries`
    const response = await axios.post(url,payload,config);
    console.log('happy diwali',response);
    //console.log(response);
    return response;
}

export const getMarks = async (payload) => {{
  const {examId,studentId} = payload;
  let config = {
    headers: {
      "ngrok-skip-browser-warning": 69420,
    },
  };
  const url = `${CONSTANT.API_URL}/exam/get-exam-entries-by-exam-student/?examId=${examId}&studentId=${studentId}`
  const response = await axios.get(url,config);
  console.log('checking response happy diwali',response);
  return response;
}}