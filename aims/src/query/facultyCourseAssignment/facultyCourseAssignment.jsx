import { useQuery } from "react-query";
import { getAllFaculty } from "../../apiClient/courseAssignment";
import { getCourses } from "../../apiClient/courseRegistration";

export const useGetAllFaculty = () => {
    return useQuery("getAllFaculty", async () => {
        try {
            const res = await getAllFaculty();
            //console.log('faculty data',res?.data);
            return res?.data;
        } catch (error) {
            return error;
        }
    })
}

export const useGetAllCourses = () => {
    return useQuery("getAllCourses", async () => {
        try {
            const res = await getCourses();
            //console.log('faculty courses',res);
            return res;
        } catch (error) {
            return error;   
        }
    })
}