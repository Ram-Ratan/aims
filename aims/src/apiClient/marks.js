import api from "./api";


export const getExam = async () => {
    let url = `/exam/get-exam-code`
    const response = await api.get(url);
    //console.log('expamds',response);
    return response;
}

export const getExamType = async () => {
  let url = `/exam/get-exam-type`
  const response = await api.get(url);
  return response;
}

export const submitMarks = async (payload) => {
    const url = `/exam/add-exam-entries`
    const response = await api.post(url,payload);
    return response;
}


export const updateMarks = async (payload) => {
  const url = `/exam/update-exam-entries`;
  const response = await api.post(url, payload);
  return response;
};

export const getMarks = async (payload) => {
  const url = `/exam/get-exam-entries-by-exam-student`
  const response = await api.post(url,payload);
  return response;
}

export const getMarksByExamCourse = async (payload) => {
  const { examId, courseId } = payload;
  const url = `/exam/get-exam-entries-by-course-exam`;
  const response = await api.post(url,payload);
  return response;
};

