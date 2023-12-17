import { useMutation } from "react-query"
import { logIn, resetPassword, signUP } from "../../apiClient/auth"

export const useSignUp = ()=>{
    return useMutation((payload)=> signUP(payload))
}

export const useLogIn = ({onError,onSuccess}) => {
  return useMutation((payload) => logIn(payload),{
    onError:onError,
    onSuccess:onSuccess
  });
};

export const useResetPassword = ({ onError, onSuccess }) => {
  return useMutation((payload) => resetPassword(payload), {
    onError: onError,
    onSuccess: onSuccess,
  });
};