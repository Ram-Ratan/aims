import React, { useEffect, useState } from 'react';
import Select from '../../components/select/Select';
import { getCourses, getBranch, getSem } from '../../apiClient/courseRegistration';

const CourseRegistration = () => {
    const [courses, setCourses] = useState([]);
    const [branches,setBranches] = useState([]);
    const [sem,setSem] = useState([]);
    useEffect(()=>{
      getCourses().then((res)=>{
        setCourses(res);
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    },[])

    useEffect(()=>{
      getBranch().then((res)=>{
        setBranches(res);
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    },[])

    useEffect(()=>{
      getSem().then((res)=>{
        setSem(res)
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    },[])

    const courseOptions = courses.map((course)=>{
    return {
      label: course?.courseName,
      value: course?.courseCode,
      ...course
    }
    })

    const branchOptions = branches.map((branch) => {
      return {
        label: branch?.name,
        value: branch?.code,
        ...branch
      }
    })
  
    const semOptions = sem.map((sem) => {
      return {
        label: sem?.name,
        value: sem?.code,
        ...sem
      }
    })


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    selectedCourse: 'CSE',
    selectedSubjects: [], // To store selected subjects
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubjectsChange = (e) => {
    const options = e.target.options;
    const selectedSubjects = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedSubjects.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      selectedSubjects: selectedSubjects,
    });
  };

  const removeSubject = (subjectToRemove) => {
    const updatedSubjects = formData.selectedSubjects.filter((subject) => subject !== subjectToRemove);
    setFormData({
      ...formData,
      selectedSubjects: updatedSubjects,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setFormData({
      name: '',
      email: '',
      selectedCourse: 'CSE',
      selectedSubjects: [],
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Course Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          {/* <label htmlFor="selectedCourse" className="block text-sm font-medium text-gray-600">
            Branch Name
          </label>
          <select
            id="selectedCourse"
            name="selectedCourse"
            value={formData.selectedCourse}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-400"
          >
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="IT">IT</option>
          </select> */}

          <Select label='Branch Name' options={branchOptions} required={true}/>

        </div>
        <div className='mb-4'>
          <Select label='semester' options={semOptions} required={true}/>
        </div>
        <div className="mb-4">
          {/* <label htmlFor="selectedSubjects" className="block text-sm font-medium text-gray-600">
            Subjects
          </label> */}
          {/* <select
            id="selectedSubjects"
            name="selectedSubjects"
            multiple
            value={formData.selectedSubjects}
            onChange={handleSubjectsChange}
            className="border border-gray-300 rounded-md p-2 w-full h-24 focus:outline-none focus:border-blue-400"
          >
            <option value="Control System">Control System</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Computer Networks">Computer Networks</option>
            <option value="VLSI">VLSI</option>
            <option value="VHDL">VHDL</option>
            <option value="Wireless Communication">Wireless Communication</option>
            <option value="Nano Technology">Nano Technology</option>
          </select> */}
          <Select label="Select courses" options={courseOptions} required={true} isMulti={true}/>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Selected Subjects:</label>
          <ul>
            {formData.selectedSubjects.map((subject) => (
              <li key={subject} className="flex justify-between">
                <span>{subject}</span>
                <button
                  type="button"
                  onClick={() => removeSubject(subject)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default CourseRegistration;
