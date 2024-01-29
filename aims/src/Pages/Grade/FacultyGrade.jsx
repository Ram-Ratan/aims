import React, { useState, useEffect } from "react";
import Select from "../../components/select/Select";
import { Input } from "../../components/input/Input";
import { getExam, getMarksByExamCourse, updateMarks } from "../../apiClient/marks";
import {
  getCourseAssignedById,
  getStudentByCourse,
} from "../../apiClient/attendance";
import { submitMarks } from "../../apiClient/marks";
import Button from "../../components/button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage, showErrorToastMessage } from "../utils/utils";
import ModalPopup from "../../layouts/modalPopUp/ModalPopUp";
import { useGetExam, useGetCourseById, useGetStudentByCourse } from "../../query/grade/grade";
import { isError } from "react-query";


const FacultyGrade = () => {
  //const [exam, setExam] = useState([]);
  //const [course, setCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isModal, setIsModal] = useState(false);

  const [registeredStudent, setRegisteredStudent] = useState([]);

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
  const {data:exam, isLoading:examLoading, isError: examError} = useGetExam();

  // fetching assigned course for faculty
  const {data:course} = useGetCourseById();

  //fetching all registered users
  const {data:studentsByCourse,isLoading:studentLoading, isError: studentError} = useGetStudentByCourse({courseId: selectedCourse?.courseId});
  
  useEffect(()=>{
    console.log('course data',studentsByCourse);
    if(studentsByCourse){
      setRegisteredStudent(formatData(studentsByCourse));
    }
  },[selectedCourse])

  // if(studentLoading){
  //   return <h2>Student data is loading</h2>
  // }
  // if(studentError){
  //   return <h2>Error while fetching student data</h2>
  // }


  //select options
  const examOptions = exam?.map((exam) => {
    return {
      label: exam?.code,
      value: exam?.code,
      ...exam,
    };
  });

  const courseOptions = course?.map((course) => {
    return {
      label: course?.course.name,
      value: course?.course.courseId,
      ...course,
    };
  });

  const handleSubmitMarks = async () => {
    try {
      const viewPayload = {
        examId: selectedExam.id,
        courseId: selectedCourse?.courseId,
      };
      const res = await getMarksByExamCourse(viewPayload);
      if (res.data.length) {
        setIsModal(true);
      } else {
        await handleNewMarks();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewMarks = async () => {
    const payload = {
      examId: selectedExam.id,
      courseId: selectedCourse?.courseId,
      marks: registeredStudent?.map((student) => {
        return {
          studentId: student?.studentId,
          marksObtained: student?.marks,
          remarks: "need improvement",
        };
      }),
    };
    await submitMarks(payload)
      .then((res) => {
        showToastMessage("Marks uploaded Successfully!");
      })
      .catch((err) => {
        showErrorToastMessage("Marks upload Failed");
      });
  };

  const handleUpdateMarks = async () => {
    const payload = {
      examId: selectedExam.id,
      courseId: selectedCourse?.courseId,
      marks: registeredStudent?.map((student) => {
        return {
          studentId: student?.studentId,
          marksObtained: student?.marks,
          remarks: "need improvement",
        };
      }),
    };
    await updateMarks(payload)
      .then((res) => {
        showToastMessage("Marks updated Successfully!");
      })
      .catch((err) => {
        showErrorToastMessage("Marks Update Failed");
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="mx-32 my-4 flex justify-center items-center text-3xl font-semibold border rounded-md h-20 shadow-md">
        Grade Upload
      </div>

      <div className="mt-10 pb-10 mx-32 border rounded-lg bg-gray-50 shadow-lg">
        <div className="flex gap-4 pt-3 px-4">
          <div className="w-[200px]">
            <Select
              label="Select Exam"
              options={examOptions}
              required={true}
              value={selectedExam}
              onChange={(e) => setSelectedExam(e)}
              isClearable
              onClear={() => {
                selectedExam(null);
              }}
            />
          </div>

          <div className="w-[200px]">
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
                selectedCourse(null);
              }}
              required
            />
          </div>
        </div>
        <div className="px-4 py-10">
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="bg-gray-200 border text-left p-2 w-[70px]">
                  Sr. No.
                </th>
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
                          stu.rollNo === student.rollNo
                            ? { ...stu, marks: newValue }
                            : stu
                        );
                        console.log("updateData", updatedData);
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
          <Button variant="outlined" onClick={handleSubmitMarks}>
            Submit Marks
          </Button>
        </div>
      </div>
      {isModal && (
        <ModalPopup
          title="Attendance of This date is already marked. Do You want to update?"
          body={
            <div className="p-5 pt-0">
              <div className="mt-3 flex justify-center">
                <Button
                  variant="filled"
                  onClick={() => {
                    handleUpdateMarks();
                    setIsModal(false);
                  }}
                >
                  Yes
                </Button>
              </div>
            </div>
          }
          onClose={() => setIsModal(false)}
        />
      )}
    </div>
  );
};

export default FacultyGrade;
