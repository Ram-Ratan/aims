import api from "./api";

export const getAllFaculty = async () => {
  const url = `/faculty/get-all-faculty`;
  const response = api.get(url);
  return response;
};

export const courseAssignment = async (payload) => {
  const url = `/course-assigned/course-assignment`;
  const response = api.post(url,payload);
  return response;
};
