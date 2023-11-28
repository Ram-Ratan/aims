import React,{useState,useEffect,useMemo} from 'react'
import Select from '../../components/select/Select'
import AttendanceTableHeader from '../attendance/attendanceTable/AttendanceTableHeader';
import { Input } from '../../components/input/Input';
import StudentGrade from './StudentGrade';
import { getCourses,getBranch, getSem } from '../../apiClient/courseRegistration';
import { getExam } from '../../apiClient/marks';
import { getCourseAssignedById, getStudentByCourse } from '../../apiClient/attendance';
import { submitMarks } from '../../apiClient/marks';
import Button from '../../components/button/Button';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { showToastMessage,showErrorToastMessage } from '../utils/utils';


const FacultyGrade = () => {
  const [exam,setExam] = useState([]);
  const [course,setCourse] = useState([]);
  const [selectedCourse,setSelectedCourse] = useState(null);
  const [selectedExam,setSelectedExam] = useState(null);

  const [registeredStudent,setRegisteredStudent] = useState([]);

  const formatData = (data) => {
    return data?.map((student) => {
      return {
        rollNo: student?.student?.rollNo,
        name: student?.student?.fullName,
        marks: 0, // Default value for marks, you can adjust it as needed
        ...student,
      };
    });
  };

  //fetching exam type
  useEffect(()=>{
    getExam()?.then((res)=>{
      setExam(res.data)
      console.log(res);
      console.log('exam data received');
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  // fetching assigned course for faculty
  useEffect(()=>{
      getCourseAssignedById()
      .then((res)=>{
        console.log(res.courseAssigned);
        setCourse(res?.courseAssigned);
      }).catch((err)=>{
        console.log(err);
      })
  },[])

  //fetching all registered users
  useEffect(()=>{
    getStudentByCourse({courseId:selectedCourse?.courseId})
    .then((res)=>{
      setRegisteredStudent(formatData(res))
    }).catch((err)=>{
      //console.log('not received');
      setRegisteredStudent(null);
    })
  },[selectedCourse])

  //select options
  const examOptions = exam?.map((exam) => {
    return {
      label: exam?.code,
      value: exam?.code,
      ...exam
    }
  }) 


  const courseOptions = course?.map((course)=>{
    return {
      label: course?.course.name,
      value: course?.course.courseId,
      ...course
    }
  })


  
  const handleSubmitMarks = async () =>{
    
    console.log('checking student id',registeredStudent);
    const payload = {
      examId: selectedExam.id,
      courseId: selectedCourse?.courseId,
      marks: registeredStudent?.map((student)=>{
        return {
          studentId: student?.studentId,
          marksObtained: student?.marks,
          remarks:'need improvement'
        }
      })
    }
    await submitMarks(payload).then((res)=>{
      showToastMessage("Marks uploaded Successfully!");
    }).catch((err)=>{
      showErrorToastMessage("Marks upload Failed");
    })
  }

  return (
    <div>
      <ToastContainer />
      <div 
        className='mx-32 my-4 flex justify-center items-center text-3xl font-semibold border rounded-md h-20 shadow-md'
      >
        Grade Updation
      </div>
      
        
      <div className="mt-10 mx-32 border rounded-lg bg-gray-50 shadow-lg">

        <div className='flex justify-around pt-3'>
          <div className='w-[140px]'>
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
          
          <div className='w-[140px]'>
            <Select 
              label="Select Course"
              className="flex flex-col"
              options={courseOptions}
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e);
              }}
              isClearable
              onClear={() => {
                selectedCourse(null)
              }}
              required
            />
          </div>
        </div>
        <div className='px-4 py-10'>  
        <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="bg-gray-200 border text-left p-2 w-[70px]">Sr. No.</th>
                <th className="bg-gray-200 border text-left p-2">Name</th>
                <th className="bg-gray-200 border text-left p-2">Roll No.</th>
                <th className="bg-gray-200 border text-left p-2">Marks</th>
              </tr>
            </thead>
            <tbody>
              {registeredStudent?.map((student, index) => (
                <tr key={student.rollNo}>
                  <td className="border p-2">{index + 1}.</td>
                  <td className="border p-2">{student.name}</td>
                  <td className="border p-2">{student.rollNo}</td>
                  <td className="border p-2">
                    <Input
                      type="number"
                      value={student.marks}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value, 10);
                        const updatedData = registeredStudent.map((stu) =>
                          stu.rollNo === student.rollNo ? { ...stu, marks: newValue } : stu
                        );
                        console.log('updateData', updatedData);
                        setRegisteredStudent(updatedData);
                      }}
                      className="w-full px-2 py-2 border border-gray-300 focus:outline-none focus:border-gray-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>  
        <div>
          <Button variant='outlined' onClick={handleSubmitMarks}>Submit Marks</Button>
        </div>
      </div>
      
    </div>
  )
}

export default FacultyGrade