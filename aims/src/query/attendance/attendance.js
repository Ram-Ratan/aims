import { useQuery } from "react-query";
import { getStudentByCourse } from "../../apiClient/attendance";

export const useGetStudentByCourse = ({courseId,onSuccess, onError})=>{
    return useQuery(["get/studentByCourse",courseId],()=>{
        return getStudentByCourse({courseId});
    },{
        onSuccess,
        onError
    })
}