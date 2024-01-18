import api from "./api";

export const signUP =async (payload)=>{
  const url = `/user/signup`;
    const response = await api.post(url,payload);
      return response;
}

export const logIn = async (payload) => {
  const url = `/user/login`;
  const response = api.post(url,payload);
    return response;
};

export const resetPassword = async (payload) => {
  const url = `/user/reset-password`;
  const response = api.post(url,payload);
  return response;
}