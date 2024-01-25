import React,{useState, useEffect} from 'react'
import Select from '../../components/select/Select'
import { getExam, getMarks } from '../../apiClient/marks';
import { useGetExam, useGetMarks } from '../../query/grade/grade';
import { isError } from 'react-query';

const StudentGrade = () => {
    
    const [selectedExam,setSelectedExam] = useState(null);
    
    const {data:exam, isLoading:examLoading, isError: examError} = useGetExam();
    const {data:marks,isLoading: marksLoading, isError: marksError} = useGetMarks({examId:selectedExam?.id});
    console.log('exam type',exam);
    if(examLoading){
        return <h1>Exam Loading</h1>
    }
    if(examError){
        return <h1>Exam Error</h1>
    }


    console.log('marks data',marks);
    if(marksLoading){
        return <h1>Marks Loading...</h1>
    }
    if(marksError){
        return <h1>Marks Error</h1>
    }

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
                <div className='w-[200px] px-4 py-3'>
                    <Select 
                        label='Select Exam'
                        options={examOptions}
                        required={true}
                        value={selectedExam}
                        onChange={(e) => setSelectedExam(e)}
                        isClearable
                        onClear={() => {
                            setSelectedExam(null)
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
                                        <td className="border p-2">{selectedExam?.code === ("CT1") || selectedExam?.code === ("CT2") ? 20 : 100}</td>
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