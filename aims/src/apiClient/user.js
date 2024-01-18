import api from "./api";

export const getUser = async () => {
  const response = await api.get('/user/get-user');
  return response.data;
};
