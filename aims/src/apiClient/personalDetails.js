import api from "./api";

export const getStudent = async (payload) => {
  let url = `/student/get-student`;
  const response = await api
    .get(url);
  return response?.data;
};


export const getFaculty = async (payload) => {
  const {userId} = payload;
  let url = `/faculty/get-faculty`;
  if(userId) url += `?userId=${userId}`;
  const response = await api.get(url);
  return response?.data;
}