import { useQuery } from "react-query";
import { getStudentByCourse } from "../../apiClient/attendance";

const useGetStudentByCourse = ()=>{
    return useQuery("get/studentByCourse",(payload)=>{
        return getStudentByCourse(payload);
    })
}