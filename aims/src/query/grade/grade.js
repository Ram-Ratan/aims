import { useQuery } from "react-query";
import { getExam, getMarks } from "../../apiClient/marks";
import { getStudentByCourse, getCourseAssignedById } from "../../apiClient/attendance";

export const useGetExam = () => {
    return useQuery("getexam", async () => {
        const response = await getExam();
        return response?.data;
    })
}

export const useGetMarks = ({examId}) => {
    console.log('marks id ',examId);
    return useQuery(["getmarks",examId],async ()=>{
        const res = await getMarks({examId}); 
        console.log('response',res);
        return res?.data; 
    },{
        enabled: examId?true:false
    })
}

export const useGetCourseById = () => {
    return useQuery("getcoursebyid", async ()=>{
        const response = await getCourseAssignedById();
        return response?.courseAssigned;
    })
}

export const useGetStudentByCourse = ({courseId}) => {
    console.log('courseId',courseId);
    return useQuery(["getstudentbycourse",courseId], async () => {
        try {
            const response = await getStudentByCourse({courseId});
            console.log('student by course',response);
            return response;
        } catch (error) {
            return error;
        }
    },{
        enabled: courseId ? true:false
    })
}
