import { useQuery } from "react-query";
import { getUser } from "../../apiClient/user";

export const useGetUser = ({onGetUserSuccess,isAuthenticated})=>{
    
    return useQuery('get/user',()=>{
        return getUser();
    },{
        enabled: isAuthenticated,
        onSuccess: onGetUserSuccess
    });
}