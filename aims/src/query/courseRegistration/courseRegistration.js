import { useQuery } from "react-query";
import { getExam } from "../../apiClient/marks";
import { getSem, getBranch, getCourses, getCourseRegisteredById } from "../../apiClient/courseRegistration";

export const useGetBranch = () => {
    return useQuery("getbranch", async () => {
        try {
            const response = await getBranch();
            console.log('branches',response);
            return response;
        } catch (error) {
            console.log('console error in branch',error);
            return error;
        }
    })
}

export const useGetSemester = () => {
    return useQuery("getsemester", async () => {
        try {
            const res = await getSem();
            console.log('semester',res);
            return res; 
        } catch (error) {
            return error;
        }
    })
}

export const useGetCourseRegisterdById = () => {
    return useQuery("getCourseRegisteredbyId", async () => {
        try {
            const res = await getCourseRegisteredById();
            console.log('registeted course',res?.courseRegistered);
            return res?.courseRegistered;
        } catch (error) {
            return error;
        }
    })
}

export const useGetCourses = ({semesterId,branchId}) => {
    return useQuery("getCourses", async () => {
        try {
            const res = await getCourses({semesterId,branchId});
            console.log('courses response',res);
            return res;
        } catch (error) {
            return error;
        }
    },{
        enabled: (semesterId && branchId)? true: false
    })
}