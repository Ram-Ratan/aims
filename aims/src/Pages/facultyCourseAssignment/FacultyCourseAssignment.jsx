import React, { useEffect, useState } from "react";
import Select from "../../components/select/Select";
import Button from "../../components/button/Button";
import { courseAssignment, getAllFaculty } from "../../apiClient/courseAssignment";
import { getCourses } from "../../apiClient/courseRegistration";
import { showErrorToastMessage, showToastMessage } from "../utils/utils";
import { ToastContainer } from "react-toastify";
import { useGetAllCourses, useGetAllFaculty } from "../../query/facultyCourseAssignment/facultyCourseAssignment";

const FacultyCourseAssignment = () => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const {data:faculty} = useGetAllFaculty();
  const {data:courses} = useGetAllCourses();

  const facultyOptions = faculty?.map((faculty)=>{
    return {
      label: faculty?.fullName,
      value: faculty?.id,
      ...faculty,
    }
  })

  const courseOptions = courses?.map((course) => {
    return {
      label: course?.name,
      value: course?.id,
      ...course,
    }
  })


  const handleAssignClick = async ()=>{
    const payload = {
        faculty: selectedFaculty?.id,
        courses: selectedCourse.map((course)=> course?.id)
    }
    await courseAssignment(payload).then((res)=> {
        showToastMessage("Course Assigned Successfully!");
    }).catch((err)=>{
        showErrorToastMessage("Course Assignment Failed");
        console.log(err);
    })
  }
  
  return (
    <div className="p-4">
      <ToastContainer />

      <div className="mx-32">
        <div className="flex items-center py-2 gap-10 justify-center border rounded-md shadow-md">
          <div className="py-4">
            <p className="font-bold text-3xl">Faculty Course Assignment</p>
          </div>
        </div>
      </div>
      <div className="mx-32 pt-10">
        <div className="flex gap-4 border px-4 rounded-lg bg-gray-50 shadow-md py-10">
          <div className="flex gap-10 items-end">
            <div className="w-[200px]">
              <Select
                label="Select Faculty"
                options={facultyOptions}
                isClearable
                value={selectedFaculty}
                onChange={(value) => setSelectedFaculty(value)}
              />
            </div>
            <div className="w-[200px]">
              <Select
                label="Select Course"
                options={courseOptions}
                isClearable
                isMulti
                closeMenuOnSelect={false}
                value={selectedCourse}
                onChange={(value) => setSelectedCourse(value)}
              />
            </div>
            <Button
              variant="filled"
              className="w-[200px]"
              onClick={() => {
                handleAssignClick();
                setSelectedCourse([]);
                setSelectedFaculty(null);
              }}
            >
              Assign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyCourseAssignment;
