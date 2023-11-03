import React, { useEffect, useState } from "react";
import Select from "../../components/select/Select";
import {
  getCourses,
  getBranch,
  getSem,
  courseRegistration,
} from "../../apiClient/courseRegistration";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

const CourseRegistration = () => {
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [sem, setSem] = useState([]);
  const [selectedSem, setSelectedSem] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getCourses({ semId: selectedSem?._id })
      .then((res) => {
        setCourses(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedSem]);

  useEffect(() => {
    getBranch()
      .then((res) => {
        setBranches(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
    },[branches])

    useEffect(()=>{
      getSem().then((res)=>{
        setSem(res)
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
    },[sem])

  const courseOptions = courses?.map((course) => {
    return {
      label: course?.courseName,
      value: course?.courseCode,
      ...course,
    };
  });

  const branchOptions = branches.map((branch) => {
    return {
      label: branch?.name,
      value: branch?.code,
      ...branch,
    };
  });

  const semOptions = sem.map((sem) => {
    return {
      label: sem?.name,
      value: sem?.code,
      ...sem,
    };
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    selectedCourse: "CSE",
    selectedSubjects: [], // To store selected subjects
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(selectedCourse, selectedBranch,selectedSem)
    const payload = selectedCourse?.map((course)=>{
      return {
        user: user?._id,
        branch: selectedBranch?._id,
        semester: selectedSem?._id,
        course: course._id
      };
    })
    await courseRegistration(payload).then((res)=>{
      navigate("/personal-details")
    }).catch((err)=>{
      console.log(err);
    })

  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Course Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
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
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
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
          <Select
            label="Branch Name"
            options={branchOptions}
            required={true}
            value={selectedBranch}
            onChange={(e) => {
              setSelectedBranch(e);
            }}
          />
        </div>
        <div className="mb-4">
          <Select
            label="semester"
            options={semOptions}
            required={true}
            value={selectedSem}
            onChange={(e) => {
              setSelectedSem(e);
              setSelectedCourse(null);
            }}
          />
        </div>
        <div className="mb-4">
          <Select
            label="Select courses"
            options={courseOptions}
            required={true}
            isMulti={true}
            value={selectedCourse}
            onChange={(e) => {
              console.log(e);
              setSelectedCourse(e);
            }}
            closeMenuOnSelect={false}
          />
        </div>

        <div className="mt-4">

        <Button variant="outlined" onClick = {handleSubmit}> Register</Button>
        </div>
      </form>
    </div>
  );
};

export default CourseRegistration;
