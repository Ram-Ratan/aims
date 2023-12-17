import { useQuery } from "react-query";
import { getUser } from "../../apiClient/user";

export const useGetUser = ()=>{
    return useQuery('get/user',()=>{
        return getUser();
    });
}