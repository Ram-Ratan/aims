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
              value={exam}
              onChange={(e) => setExam(e.target.value)}

            />
          </div>
          <div className='w-[140px]'>
            <Select 
              label='Select Branch'
              options={branchOptions}
              required={true}
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
          <div className='w-[140px]'>
            <Select 
              label='Select Semester'
              options={semesterOptions}
              required={true}
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            />
          </div>
          <div className='w-[140px]'>
            <Select 
              label='Select Course'
              options={courseOptions}
              required={true}
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>
        </div>
        <div className='px-4 py-10'>  
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="bg-gray-200 border text-left p-2">Name</th>
                <th className="bg-gray-200 border text-left p-2">Roll No.</th>
                <th className="bg-gray-200 border text-left p-2">Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Prithvi Singh Bhati</td>
                <td className="border p-2">20232</td>
                <td className="border p-2">89</td>
              </tr>
              <tr>
                <td className="border p-2">Ram Ratan</td>
                <td className="border p-2">20235</td>
                <td className="border p-2">100</td>
              </tr>
            </tbody>
          </table>
        </div>  
      </div>
          
      
    
      
    </div>
  )
}

export default Grade