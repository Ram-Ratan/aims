import api from "./api";

export const getCourses = async (payload) => {
  const semesterId = payload?.semesterId;
  const branchId = payload?.branchId;

  let url = `/course/get-all-courses`;
  if(semesterId) url += `?semesterId=${semesterId}`;
  if(branchId) semesterId
    ? (url += `&branchId=${branchId}`)
    : (url += `?branchId=${branchId}`);
  const response = await api.get(url);
  return response?.data;
};

export const getBranch = async () => {
  const url = `/branch/get-all-branch`;
  const response = await api.get(url);
  return response?.data;
};

export const getSem = async () => {
  const url = `/semester/get-all-semester`;
  const response = await api.get(url);
  return response?.data;
};

export const courseRegistration = async (payload) => {
  const url = `/course-registration/register`;
  const response = await api.post(url,payload);
  return response?.data;
};

export const getCourseRegisteredById = async (payload) => {
  let url = `/course-registration/course-registered-by-id`;
  const response = await api.get(url);
  return response?.data;
};


