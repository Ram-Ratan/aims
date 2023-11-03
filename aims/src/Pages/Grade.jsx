import React,{useState,useEffect} from 'react'
import Select from '../components/select/Select'
import { getCourses,getBranch, getSem } from '../apiClient/courseRegistration';
import StickyHeadTable from './home/Table';

const Grade = () => {
  const [semester,setSemester] = useState([]);
  const [branch,setBranch] = useState([]);
  const [exam,setExam] = useState([]);
  const [course,setCourse] = useState([]);


  //data fetching through api
  // useEffect(()=>{
  //   setExam().then((res)=>{
  //     setExam(res)
  //     console.log(res);
  //   }).catch((error)=>{
  //     console.log('error in exam api',error);
  //   })
  // },[exam])
  
  useEffect(()=>{
    getBranch().then((res)=>{
      setBranch(res);
    }).catch((error)=>{
      console.log('error while fetching data from branch api',error);
    })
  },[branch])

  useEffect(()=>{
    getCourses().then((res)=>{
      setCourse(res);
    }).catch((err)=>{
      console.log('error while fetching data from course api',err);
    })
  },[course])

  useEffect(()=>{
    getSem().then((res)=>{
      setSemester(res)
    }).catch((err)=>{
      console.log('error while fetching data from semester api');
    })
  },[semester])


  //select options
  const examOptions = exam.map((exam) => {
    return {
      label: exam.code,
      value: exam.code,
      ...exam
    }
  }) 

  const branchOptions = branch.map((branch)=>{
    return {
      label: branch?.name,
      value: branch?.code,
      ...branch
    }
  })

  const semesterOptions = semester.map((sem)=>{
    return {
      label: sem?.name,
      value: sem?.code,
      ...sem
    }
  })

  const courseOptions = course.map((course)=>{
    return {
      label: course?.courseName,
      value: course?.courseCode,
      ...course
    }
  })

  return (
    <div>
      <div 
        className='flex justify-center items-center text-3xl font-semibold w-full h-20 bg-slate-50 shadow-md'
      >
        Grade Updation
      </div>
      <div className='bg-gray-200 h-screen overflow-hidden mt-10 mx-2 border rounded-md py-4 font-medium'>
        <div className='flex justify-evenly'>
          
            <div className='w-[150px]'>
              <label>Select Exam</label>
              <Select 
                required={true} 
                onChange={(e) => setExam(e.target.value)}
                value={exam}
                options={examOptions}
              />  
            </div>
            <div className='w-[150px]'>
              <label>Select Semester</label>
              <Select 
                required={true}
                options={semesterOptions}
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
            </div>
            <div className='w-[150px]'>
              <label>Select Branch</label>
              <Select 
                required={true}
                options={branchOptions}
                value={branch}
                onChange={(e)=>setBranch(e.target.value)}
              />
            </div>
            <div className='w-[150px]'>
              <label>Select Course</label>
              <Select 
                required={true}
                options={courseOptions}
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
            
        </div>
        {/* <div className='p-3 flex justify-end pr-20 bg-slate-300 w-[400px] mt-5 mx-2 border rounded-md'>
          <input
            type='number'
            placeholder='Roll No.'
            className='px-2 py-1.5 border rounded-md border-black w-[120px] mr-1'
          />
          <input 
            type='number'
            className='px-2 py-1.5 border rounded-md border-black w-20'
          />
          <button className='border rounded-md bg-blue-500 w-16 py-1.5 ml-1'>ADD</button>
        </div> */}
        
        <div className='px-10 py-4'>
          <StickyHeadTable />
        </div>

      </div>
    </div>
  )
}

export default Grade