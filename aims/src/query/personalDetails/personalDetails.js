import { useQuery } from "react-query";
import { getStudent } from "../../apiClient/personalDetails";

export const useGetPersonalDetails = (role)=>{
    return useQuery(["get/personalDetails",role],()=>{
        switch (role) {
            case "STUDENT":
                return getStudent();
            default:
                break;
        }
    })
}