import { useQuery } from "react-query";
import { getExam, getMarks, getExamType } from "../../apiClient/marks";
import { getStudentByCourse, getCourseAssignedById } from "../../apiClient/attendance";

export const useGetExam = () => {
    return useQuery("getexam", async () => {
        const response = await getExam();
        return response?.data;
    })
}

export const useGetExamType = () => {
    return useQuery("getExamType", async () => {
        const response = await getExamType();
        console.log('exam type response',response);
        return response?.data;
    })
}

export const useGetMarks = ({examCode, examType}) => {
    console.log('exam id ',examCode, examType);
    return useQuery(["getmarks",examCode],async ()=>{
        const res = await getMarks({examCode,examType}); 
        console.log('response',res);
        return res?.data; 
    },{
        enabled: (examCode && examType) ? true : false
    })
}

export const useGetCourseById = () => {
    return useQuery("getcoursebyid", async ()=>{
        const response = await getCourseAssignedById();
        return response?.courseAssigned;
    })
}

export const useGetStudentByCourse = ({courseId}) => {
    //console.log('courseId',courseId);
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
