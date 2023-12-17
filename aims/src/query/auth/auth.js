import { useMutation } from "react-query"
import { logIn, signUP } from "../../apiClient/auth"

export const useSignUp = ()=>{
    return useMutation((payload)=> signUP(payload))
}

export const useLogIn = ({onError,onSuccess}) => {
  return useMutation((payload) => logIn(payload),{
    onError:onError,
    onSuccess:onSuccess
  });
};