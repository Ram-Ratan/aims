import React,{useState} from 'react'
import { getCourseRegisteredById } from '../../apiClient/courseRegistration'
import Select from '../../components/select/Select'


const StudentGrade = () => {
    const [exam,setExam] = useState(null);

    const examOptions = exam?.map((exam) => {
        return {
          label: exam.code,
          value: exam.code,
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
                        value={exam}
                        onChange={(e) => setExam(e.target.value)}
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
                            <tr>
                                <td className='border p-2'>VLSI Design</td>
                                <td className='border p-2'>65</td>
                                <td className='border p-2'>100</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StudentGrade