import React,{useState, useEffect} from 'react'
import { getCourseRegisteredById } from '../../apiClient/courseRegistration'
import Select from '../../components/select/Select'
import { getExam, getMarks } from '../../apiClient/marks';
import { useAsyncError } from 'react-router-dom';


const StudentGrade = () => {
    const [exam,setExam] = useState(null);
    const [selectedExam,setSelectedExam] = useState(null);
    const [marks,setMarks] = useState();


    useEffect(()=>{
        getExam()?.then((res)=>{
            console.log('exam type',res.data);
            setExam(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        const userId = JSON.parse(localStorage.getItem("user"))?.id;
        console.log('exam checking',selectedExam);
        getMarks({examId:selectedExam?.id, studentId:userId})
        .then((res)=>{
            console.log('marks api data checking',res.data);
            setMarks(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[selectedExam])

    const examOptions = exam?.map((exam) => {
        return {
          label: exam?.code,
          value: exam?.code,
          ...exam
        }
    }) 

    return (
        <div>
            
            <div 
                className='mx-32 my-4 flex justify-center items-center text-3xl font-semibold border rounded-md h-20 shadow-md'>
                Grade Card
            </div>
            <div className="mt-10 mx-32 border rounded-lg bg-gray-50 shadow-lg">
                <div className='w-[170px] px-4 py-3'>
                    <Select 
                        label='Select Exam'
                        options={examOptions}
                        required={true}
                        value={selectedExam}
                        onChange={(e) => setSelectedExam(e)}
                        isClearable
                        onClear={() => {
                            selectedExam(null)
                        }}
                    />
                </div>
                <div className='px-4 py-10'>
                    <table className="table-fixed w-full">
                        <thead>
                            <tr>
                                <th className="bg-gray-200 border text-left p-2">Course Name</th>
                                <th className="bg-gray-200 border text-left p-2">Obtained Marks</th>
                                <th className="bg-gray-200 border text-left p-2">Total Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                marks?.map((data)=>(
                                    <tr key={data?.courseId}>
                                        <td className="border p-2">{data?.course?.name}</td> 
                                        <td className="border p-2">{data?.marksObtained}</td>
                                        <td className="border p-2">{selectedExam?.code == ("CT1" || "CT2") ? 20 : 100}</td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StudentGrade