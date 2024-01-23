import { useQuery } from "react-query";
import { getExam, getMarks } from "../../apiClient/marks";

export const useGetExam = () => {
    return useQuery("getexam",async ()=> {
        return await getExam();
    })
}

export const useGetMarks = ({examId}) => {
    console.log('marking ',examId);
    return useQuery(["getmarks",examId],async ()=>{
        const res = await getMarks({examId}); 
        console.log('response',res);
        return res?.data; 
    })
}